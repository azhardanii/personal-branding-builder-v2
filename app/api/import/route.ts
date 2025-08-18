import { NextResponse } from "next/server";

type ParsedResult = {
  identity: { nama: string; suka: string; dikuasai: string; kenapaDibutuhkan: string; peluangPenghasilan: string };
  swot: { niche: string; kategori: string; microNiche: string; kekuatan: string; kelemahan: string; peluang: string; tantangan: string };
  pillar: { premis: string; toneOfVoice: string; targetAudiens: string };
  bio: string;
  pillarsList: string[];
};
type ContentIdea = {
  id: number;
  title: string;
  deadline: string;
  status: string;
  script: string;
  platform: string;
  pillar: string;
  format: string;
};

function extractJsonFromGviz(text: string) {
  const m = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/m);
  if (m && m[1]) return JSON.parse(m[1]);
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first >= 0 && last > first) return JSON.parse(text.substring(first, last + 1));
  throw new Error("Tidak menemukan JSON GViz di response");
}

function parseIndonesianDate(str: string): string {
  if (!str) return "";

  // Menghapus hari dan koma di awal, misal "Senin, "
  const parts = str.replace(/^[A-Za-z]+,\s*/, "").trim().split(" ");

  if (parts.length < 3) return "";

  const day = parts[0].padStart(2, "0");
  const monthName = parts[1]; // ✅ DIUBAH: Hapus .toLowerCase()
  const year = parts[2];

  // Pastikan key di sini cocok dengan monthName (huruf besar di awal)
  const bulanMap: Record<string, string> = {
    "Januari": "01",
    "Februari": "02",
    "Maret": "03",
    "April": "04",
    "Mei": "05",
    "Juni": "06",
    "Juli": "07",
    "Agustus": "08",
    "September": "09",
    "Oktober": "10",
    "November": "11",
    "Desember": "12",
  };

  const month = bulanMap[monthName];
  if (!month) return ""; // Jika bulan tidak ditemukan, kembalikan string kosong

  return `${year}-${month}-${day}`;
}

function parseContentFactorySheet(rows2d: string[][]): ContentIdea[] {
  const contentIdeas: ContentIdea[] = [];
  const startRow = 0;

  const COL_MAP = {
    title: 1,
    deadline: 2,
    status: 3,
    platform: 4,
    format: 5,
    pillar: 6,
    script: 8,
  };

  for (let i = startRow; i < rows2d.length; i++) {
    const row = rows2d[i];
    const title = row?.[COL_MAP.title]?.trim();
  
    if (!title) { break }
    
    const idea: ContentIdea = {
      id: Date.now() + Math.random(),
      title,
      deadline: parseIndonesianDate(row?.[COL_MAP.deadline]?.trim()) || "",
      status: row?.[COL_MAP.status]?.trim() || "",
      platform: row?.[COL_MAP.platform]?.trim() || "",
      format: row?.[COL_MAP.format]?.trim() || "",
      pillar: row?.[COL_MAP.pillar]?.trim() || "",
      script: row?.[COL_MAP.script]?.trim() || "",
    };
  
    contentIdeas.push(idea);
  }  

  return contentIdeas;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const spreadsheetId = (body?.spreadsheetId || "").trim();
    const sheetName = (body?.sheetName || "").trim();

    if (!spreadsheetId) {
      return NextResponse.json({ error: "Spreadsheet ID diperlukan" }, { status: 400 });
    }

    const targetUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/gviz/tq?sheet=${encodeURIComponent(
      sheetName
    )}&tqx=out:json`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(targetUrl, { signal: controller.signal, next: { revalidate: 0 } });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: `Gagal fetch sheet. Status ${res.status}` }, { status: 502 });
    }

    const text = await res.text();
    let json: any;
    try {
      json = extractJsonFromGviz(text);
    } catch (err: any) {
      console.error("GVIZ parse error", err);
      return NextResponse.json({ error: "Gagal parsing google gviz response" }, { status: 500 });
    }

    const rows2d: string[][] = (json.table.rows || []).map((r: any) =>
      (r.c || []).map((c: any) => {
        if (!c) return "";
        return c.f ? String(c.f) : (typeof c.v !== "undefined" ? String(c.v) : "");
      })
    );

    if (sheetName === "Content Factory") {
      const contentIdeas = parseContentFactorySheet(rows2d);
      return NextResponse.json({ data: { contentIdeas } }, { status: 200 });
      } else if (sheetName === "Personal Branding Builder") {
        function findLabelCell(labelPattern: RegExp) {
          for (let r = 0; r < rows2d.length; r++) {
            const row = rows2d[r] || [];
            for (let c = 0; c < row.length; c++) {
              const cell = (row[c] || "").toString().replace(/\s+/g, " ").trim();
              if (!cell) continue;
              if (labelPattern.test(cell)) return { r, c, text: cell };
            }
          }
          return null;
        }

        function findValueForLabel(labelPattern: RegExp, mode: "right" | "below" = "below") {
          const pos = findLabelCell(labelPattern);
          if (!pos) return "";
          if (mode === "right") {
            const val = rows2d[pos.r]?.[pos.c + 1];
            return val && String(val).trim() ? String(val).trim() : "";
          } else {
            const val = rows2d[pos.r + 1]?.[pos.c];
            return val && String(val).trim() ? String(val).trim() : "";
          }
        }

        function findPillarsGrid() {
          const header = findLabelCell(/LIST\s*CONTENT\s*PILLAR/i);
          if (!header) {
              console.warn("Header 'LIST CONTENT PILLAR' tidak ditemukan.");
              return [];
          }
      
          const startRow = header.r + 1;
          const maxRowsToCheck = 5;
          const relevantCols = new Set<number>();
      
          for (let r = startRow; r < startRow + maxRowsToCheck; r++) {
              if (!rows2d[r]) continue;
              for (let c = header.c; c < rows2d[r].length; c++) {
                  const cellValue = rows2d[r][c];
                  if (cellValue && String(cellValue).trim()) {
                      relevantCols.add(c);
                  }
              }
          }
      
          const sortedCols = Array.from(relevantCols).sort((a, b) => a - b);
          const pillars: string[] = [];
          for (let r = startRow; r < startRow + maxRowsToCheck; r++) {
            if (!rows2d[r]) continue;
            for (const c of sortedCols) {
              const cellValue = rows2d[r][c];
              const trimmedValue = String(cellValue || '').trim();
              if (trimmedValue && trimmedValue.toLowerCase() !== 'null') {
                  pillars.push(trimmedValue);
              }
            }
          }
      
          return pillars;
        }  

        const result: ParsedResult = {
          identity: {
            nama: findValueForLabel(/NAMA\s*KAMU/i, "right"),
            suka: findValueForLabel(/YANG\s*KAMU\s*SUKAI|YANG\s*KAMU\s*SUKA/i, "below"),
            dikuasai: findValueForLabel(/YANG\s*KAMU\s*BISA/i, "below"),
            kenapaDibutuhkan: findValueForLabel(/KENAPA\s*DIBUTUHKAN/i, "below"),
            peluangPenghasilan: findValueForLabel(/PELUANG\s*PENGHASILAN/i, "below"),
          },
          swot: {
            niche: findValueForLabel(/NAMA_?NICHE/i, "below"),
            kategori: findValueForLabel(/CATEGORY/i, "below"),
            microNiche: findValueForLabel(/MICRO_?NICHE/i, "below"),
            kekuatan: findValueForLabel(/KEKUATANMU|KEKUATAN/i, "below"),
            kelemahan: findValueForLabel(/KELEMAHANMU|KELEMAHAN/i, "below"),
            peluang: findValueForLabel(/PELUANGMU/i, "below"),
            tantangan: findValueForLabel(/TANTANGANMU|TANTANGAN/i, "below"),
          },
          pillar: {
            premis: findValueForLabel(/PREMIS_?PILIHANMU/i, "below"),
            toneOfVoice: findValueForLabel(/TONE\s*OF\s*VOICE/i, "below"),
            targetAudiens: findValueForLabel(/TARGET\s*AUDIENS|TARGET\s*AUDIENCE/i, "below"),
          },
          bio: findValueForLabel(/BIO\s*PILIHANMU/i, "right"),
          pillarsList: findPillarsGrid(),
        };

        return NextResponse.json({ data: result }, { status: 200 });
      } else {
      return NextResponse.json({ error: `Sheet name "${sheetName}" tidak ditemukan.` }, { status: 400 }); 
    } 
  } catch (err: any) {
    console.error("Unhandled error in /api/import:", err);
    if (err?.name === "AbortError") {
      return NextResponse.json({ error: "Request ke Google Sheets timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
