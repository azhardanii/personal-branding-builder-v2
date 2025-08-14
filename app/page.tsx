"use client"
import React, { useEffect, useState } from "react";
import { LogOut, Download, Save, RefreshCcw, Edit3, Key, ExternalLink, FileSpreadsheet, Upload } from "lucide-react";

// PersonalBrandingBuilder (fixed)
// - FIX: Switched to a third CORS proxy (thingproxy) as a final attempt to resolve 403 errors.

// ... (sisa type, const, dan component Input tetap sama)
type Identity = {
  nama: string;
  suka: string;
  dikuasai: string;
  kenapaDibutuhkan: string;
  peluangPenghasilan: string;
};

type SWOT = {
  niche: string;
  kategori: string;
  microNiche: string;
  kekuatan: string;
  kelemahan: string;
  peluang: string;
  tantangan: string;
};

type Pillar = {
  premis: string;
  toneOfVoice: string;
  targetAudiens: string;
};

const STORAGE_KEY = "pb_access_key";
const VALID_KEY = "demo_key";

const SAMPLE_IDENTITY: Identity = {
  nama: "Uqi",
  suka: "tools digital, efisiensi",
  dikuasai: "membuat landing page & spreadsheet template",
  kenapaDibutuhkan: "banyak creator butuh template siap pakai",
  peluangPenghasilan: "jualan template, coaching",
};

const SAMPLE_SWOT: SWOT = {
  niche: "Digital Tools for Creators",
  kategori: "Productivity",
  microNiche: "Templates & Automation",
  kekuatan: "praktis, efisien",
  kelemahan: "tim kecil",
  peluang: "permintaan templates",
  tantangan: "visibility",
};

const SAMPLE_PILLAR: Pillar = {
  premis: "Saya membantu creator bikin template yang anti-ribet",
  toneOfVoice: "santai, jujur, to the point",
  targetAudiens: "Creator pemula & solopreneur",
};

const Input = React.memo(({
  label,
  value,
  onChange,
  placeholder,
  rows = 1,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) => {
  return (
    <label className="block text-sm">
      {label && <div className="text-xs text-gray-500 mb-1">{label}</div>}
      {rows > 1 ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
        />
      )}
    </label>
  );
});


export default function PersonalBrandingBuilder() {
  // ... (semua state hooks tetap sama)
  const [accessKeyInput, setAccessKeyInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedKey, setSavedKey] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");

  const emptyIdentity: Identity = { nama: "", suka: "", dikuasai: "", kenapaDibutuhkan: "", peluangPenghasilan: "" };
  const emptySwot: SWOT = { niche: "", kategori: "", microNiche: "", kekuatan: "", kelemahan: "", peluang: "", tantangan: "" };
  const emptyPillar: Pillar = { premis: "", toneOfVoice: "", targetAudiens: "" };

  const [identity, setIdentity] = useState<Identity>(emptyIdentity);
  const [swot, setSwot] = useState<SWOT>(emptySwot);
  const [pillar, setPillar] = useState<Pillar>(emptyPillar);
  const [uiVisible, setUiVisible] = useState(false);

  // ... (useEffect, handleLogin, handleLogout, dll tetap sama)
  useEffect(() => {
    const key = localStorage.getItem(STORAGE_KEY);
    if (key === VALID_KEY) {
      setSavedKey(key);
      setIsLoggedIn(true);
    }
    setTimeout(() => setUiVisible(true), 50);
  }, []);

  function handleLogin(e?: React.FormEvent) {
    e?.preventDefault?.();
    const key = accessKeyInput.trim();
    if (!key) return alert("Masukkan access key valid");
    if (key !== VALID_KEY) return alert("Access key salah");
    localStorage.setItem(STORAGE_KEY, key);
    setSavedKey(key);
    setIsLoggedIn(true);
    setAccessKeyInput("");
    setIdentity(emptyIdentity);
    setSwot(emptySwot);
    setPillar(emptyPillar);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setSavedKey("");
    setIsLoggedIn(false);
    setIdentity(emptyIdentity);
    setSwot(emptySwot);
    setPillar(emptyPillar);
  }

  async function exportToSpreadsheet() {
    if (!spreadsheetId) return alert("Masukkan Spreadsheet ID terlebih dahulu");
    alert("Fitur export ke spreadsheet memerlukan setup Google Apps Script API yang lebih kompleks dan tidak termasuk dalam contoh ini.");
  }


  async function importFromSpreadsheet() {
    if (!spreadsheetId) return alert("Masukkan Spreadsheet ID atau URL lengkap");
    
    let extractedId = spreadsheetId;
    try {
      if (spreadsheetId.includes("spreadsheets/d/")) {
        extractedId = spreadsheetId.split("spreadsheets/d/")[1].split("/")[0];
      }
    } catch (e) {
      console.error("Could not extract ID from URL, using raw input.", e);
    }
  
    const GVIZ_JSON_PREFIX = "google.visualization.Query.setResponse";
    const sheetName = "Personal Branding Builder";
    const targetUrl = `https://docs.google.com/spreadsheets/d/${extractedId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=out:json`;
  
    // Proxy fallback list
    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
      `https://thingproxy.freeboard.io/fetch/${targetUrl}`
    ];
  
    let dataText = null;
    for (let proxyUrl of proxies) {
      try {
        console.log(`Trying proxy: ${proxyUrl}`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
  
        const res = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeout);
  
        if (!res.ok) {
          console.warn(`Proxy failed with status ${res.status}`);
          continue;
        }
  
        const text = await res.text();
        if (!text.startsWith(GVIZ_JSON_PREFIX)) {
          console.warn("Invalid data format from proxy, trying next...");
          continue;
        }
  
        dataText = text;
        break; // success
      } catch (err) {
        console.warn(`Proxy error: ${err}`);
        continue;
      }
    }
  
    if (!dataText) {
      return alert("Gagal mengambil data dari semua proxy. Pastikan ID benar & Sheet sudah di-Publish to web.");
    }
  
    try {
      const json = JSON.parse(dataText.substring(GVIZ_JSON_PREFIX.length + 1, dataText.length - 2));
      const rows = json.table.rows.map((r: any) => r.c?.map((c: any) => c?.v || ""));
  
      function getCell(cell: string) {
        const colLetter = cell.match(/[A-Z]+/)![0];
        const rowNumber = parseInt(cell.match(/[0-9]+/)![0], 10);
        const colIndex = colLetter.charCodeAt(0) - 65;
        const rowIndex = rowNumber - 1;
        return rows[rowIndex]?.[colIndex] || "";
      }
  
      setIdentity({
        nama: getCell("C2"),
        suka: getCell("B7"),
        dikuasai: getCell("C7"),
        kenapaDibutuhkan: getCell("D7"),
        peluangPenghasilan: getCell("E7"),
      });
  
      setSwot({
        niche: getCell("B28"),
        kategori: getCell("D28"),
        microNiche: getCell("E28"),
        kekuatan: getCell("G7"),
        kelemahan: getCell("H7"),
        peluang: getCell("I7"),
        tantangan: getCell("J7"),
      });
  
      setPillar({
        premis: getCell("G28"),
        toneOfVoice: getCell("L7"),
        targetAudiens: getCell("N7"),
      });
  
      alert("Import data selesai!");
    } catch (err: any) {
      console.error(err);
      alert(`Gagal parsing data: ${err.message}`);
    }
  }

  // ... (sisa fungsi buildPrompt, openChat, download, dll tetap sama)
  function buildPromptForNiche(data: Identity) { return `Buatkan saya 5 niche terbaik beserta 1-sentence deskripsi dan 3 ide konten untuk tiap niche berdasarkan data identitas berikut:\nNama: ${data.nama}\nHal yang disukai: ${data.suka}\nHal yang dikuasai: ${data.dikuasai}\nKenapa dibutuhkan: ${data.kenapaDibutuhkan}\nPeluang penghasilan: ${data.peluangPenghasilan}\nFormat jawaban: JSON array dengan field {niche, deskripsi, ide_konten}`; }
  function buildPromptForPremis(data: SWOT) { return `Buatkan premis (1-2 paragraf) yang kuat untuk personal brand berdasarkan analisis SWOT berikut dan cocok untuk platform social media:\nNiche: ${data.niche}\nKategori: ${data.kategori}\nMicro-niche: ${data.microNiche}\nKekuatan: ${data.kekuatan}\nKelemahan: ${data.kelemahan}\nPeluang: ${data.peluang}\nTantangan: ${data.tantangan}\nInstruksi: Tonjolkan unique selling point, singkat, dan actionable.`; }
  function buildPromptForPillars(data: Pillar) { return `Buatkan list 4-6 pillar konten (judul + 1 kalimat deskripsi + 3 contoh ide posting) berdasarkan:\nPremis: ${data.premis}\nTone of voice: ${data.toneOfVoice}\nTarget audiens: ${data.targetAudiens}\nBerikan output dalam format JSON array dengan field {pillar, deskripsi, ide}`; }
  function openChatWithPrompt(prompt: string) { const url = 'https://chat.openai.com/?prompt=' + encodeURIComponent(prompt); window.open(url, '_blank'); }
  function downloadJSON() { const payload = { identity, swot, pillar }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const href = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = href; a.download = `personal-branding-${identity.nama || 'export'}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(href); }
  async function downloadPDF() { try { const jsPDFModule = await import('jspdf'); const { jsPDF } = jsPDFModule; const doc = new jsPDF({ unit: 'pt' }); let y = 40; doc.setFontSize(16); doc.text('Personal Branding - Export', 40, y); y += 30; doc.setFontSize(12); function writeSection(title: any, obj: any) { doc.setFontSize(13); doc.text(title, 40, y); y += 18; doc.setFontSize(10); const text = JSON.stringify(obj, null, 2); const split = doc.splitTextToSize(text, 520); doc.text(split, 40, y); y += split.length * 12 + 12; if (y > 750) { doc.addPage(); y = 40; } } writeSection('IDENTITY', identity); writeSection('SWOT', swot); writeSection('PILLAR', pillar); doc.save(`personal-branding-${identity.nama || 'export'}.pdf`); } catch (err) { alert('Gagal export PDF — pastikan library jspdf tersedia.'); } }
  function resetToSample() { setIdentity(SAMPLE_IDENTITY); setSwot(SAMPLE_SWOT); setPillar(SAMPLE_PILLAR); }

  // ... (sisa component return (JSX) tetap sama)
  const btnPrimary = 'px-3 py-2 bg-slate-900 text-white rounded flex items-center gap-2 text-sm transition transform hover:scale-[1.03] hover:shadow-md';
  const btnNeutral = 'px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm';

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 bg-gray-50 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4"> <Key className="w-5 h-5 text-gray-600" /> <h1 className="text-lg font-semibold">Personal Branding Builder</h1> </div>
          <p className="text-sm text-gray-500 mb-4">Masukkan access key untuk membuka tool.</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input value={accessKeyInput} onChange={(e) => setAccessKeyInput(e.target.value)} placeholder="Access key" className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow duration-150" />
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded transition transform hover:scale-[1.02] hover:shadow-md">Login</button>
              <button type="button" onClick={() => setAccessKeyInput(VALID_KEY)} className="px-4 py-2 border rounded transition transform hover:scale-[1.02] hover:shadow-sm"> Isi contoh </button>
            </div>
            <div className="text-xs text-gray-400">Hint: demo key = <span className="font-medium">{VALID_KEY}</span></div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-6 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto bg-white shadow rounded p-6">
        <header className="flex items-center justify-between mb-6">
          <div> <h1 className="text-xl font-semibold">Personal Branding Builder</h1> <p className="text-sm text-gray-500">Minimal, responsive, dan siap dipakai untuk generate prompt & export.</p> </div>
          <div className="flex items-center gap-3"> <div className="text-sm text-gray-600">Access: <span className="font-medium">{savedKey}</span></div> <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm"> <LogOut className="w-4 h-4" /> Logout </button> </div>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <section className="col-span-2 p-4 border rounded space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <input value={spreadsheetId} onChange={(e) => setSpreadsheetId(e.target.value)} placeholder="Google Spreadsheet ID atau URL" className="border px-3 py-2 rounded text-sm flex-grow" />
              <a href="https://docs.google.com/spreadsheets/d/15QZy8PMyegW78GG_Tx0hhvrosTiEn1_Nyx4jkpKAxoE/copy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 underline"> <ExternalLink className="w-4 h-4" /> Copy Template </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-medium mb-2">IDENTITY</h2>
                <div className="space-y-2">
                  <Input label="Nama" value={identity.nama} onChange={(v) => setIdentity({ ...identity, nama: v })} placeholder="Nama kamu" />
                  <Input label="Hal yang disukai" value={identity.suka} onChange={(v) => setIdentity({ ...identity, suka: v })} placeholder="Contoh: tools digital" />
                  <Input label="Hal yang dikuasai" value={identity.dikuasai} onChange={(v) => setIdentity({ ...identity, dikuasai: v })} placeholder="Contoh: landing page, spreadsheet" />
                  <Input label="Kenapa dibutuhkan" value={identity.kenapaDibutuhkan} onChange={(v) => setIdentity({ ...identity, kenapaDibutuhkan: v })} placeholder="Masalah yang kamu selesaikan" rows={2} />
                  <Input label="Peluang penghasilan" value={identity.peluangPenghasilan} onChange={(v) => setIdentity({ ...identity, peluangPenghasilan: v })} placeholder="Contoh: jualan template" />
                  <div className="flex gap-2 mt-2"> <button onClick={() => openChatWithPrompt(buildPromptForNiche(identity))} className={btnPrimary}> <Edit3 className="w-4 h-4" /> Generate Niche </button> <button type="button" onClick={() => setIdentity(SAMPLE_IDENTITY)} className={btnNeutral}>Contoh</button> </div>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium mb-2">SWOT</h2>
                <div className="space-y-2">
                  <Input label="Niche" value={swot.niche} onChange={(v) => setSwot({ ...swot, niche: v })} placeholder="Contoh: Digital Tools for Creators" />
                  <Input label="Kategori" value={swot.kategori} onChange={(v) => setSwot({ ...swot, kategori: v })} />
                  <Input label="Micro-niche" value={swot.microNiche} onChange={(v) => setSwot({ ...swot, microNiche: v })} />
                  <Input label="Kekuatan" value={swot.kekuatan} onChange={(v) => setSwot({ ...swot, kekuatan: v })} />
                  <Input label="Kelemahan" value={swot.kelemahan} onChange={(v) => setSwot({ ...swot, kelemahan: v })} />
                  <Input label="Peluang" value={swot.peluang} onChange={(v) => setSwot({ ...swot, peluang: v })} />
                  <Input label="Tantangan" value={swot.tantangan} onChange={(v) => setSwot({ ...swot, tantangan: v })} />
                  <div className="flex gap-2 mt-2"> <button onClick={() => openChatWithPrompt(buildPromptForPremis(swot))} className={btnPrimary}><Edit3 className="w-4 h-4" /> Generate Premis</button> <button type="button" onClick={() => setSwot(SAMPLE_SWOT)} className={btnNeutral}>Contoh</button> </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-sm font-medium mb-2">PILLAR</h2>
              <div className="space-y-2">
                <Input label="Premis" value={pillar.premis} onChange={(v) => setPillar({ ...pillar, premis: v })} rows={2} />
                <Input label="Tone of voice" value={pillar.toneOfVoice} onChange={(v) => setPillar({ ...pillar, toneOfVoice: v })} />
                <Input label="Target audiens" value={pillar.targetAudiens} onChange={(v) => setPillar({ ...pillar, targetAudiens: v })} />
                <div className="flex gap-2 mt-2"> <button onClick={() => openChatWithPrompt(buildPromptForPillars(pillar))} className={btnPrimary}><Edit3 className="w-4 h-4" /> Generate Pillar</button> <button type="button" onClick={() => setPillar(SAMPLE_PILLAR)} className={btnNeutral}>Contoh</button> </div>
              </div>
            </div>
          </section>
          <aside className="p-4 border rounded space-y-4 flex flex-col">
            <div> <h3 className="text-sm font-medium">Actions</h3> <p className="text-xs text-gray-500">Simpan, export, atau import data.</p> </div>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm" onClick={downloadJSON}><Save className="w-4 h-4" /> Simpan Data (.json)</button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm" onClick={downloadPDF}><Download className="w-4 h-4" /> Export PDF</button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm" onClick={resetToSample}><RefreshCcw className="w-4 h-4" /> Isi Contoh Data</button>
              <button onClick={exportToSpreadsheet} className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm"> <FileSpreadsheet className="w-4 h-4" /> Export ke Spreadsheet </button>
              <button onClick={importFromSpreadsheet} className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm"> <Upload className="w-4 h-4" /> Import dari Spreadsheet </button>
            </div>
            <div className="pt-2 mt-auto"> <h4 className="text-xs font-medium">Catatan</h4> <p className="text-xs text-gray-500">Tombol "Generate" akan membuka tab baru ChatGPT. Import dari Spreadsheet memerlukan ID yang benar dan Sheet yang sudah di-publish ke web.</p> </div>
          </aside>
        </main>
        <footer className="mt-6 text-center text-xs text-gray-400"> Made with care • Simple & minimal UI • Responsive </footer>
      </div>
    </div>
  );
}