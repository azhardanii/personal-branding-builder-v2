"use client";
import React, { useEffect, useState, memo } from "react";
import { LogOut, Download, Trash2, RefreshCcw, Edit3, Key, ExternalLink, FileSpreadsheet, Upload, FileText } from "lucide-react";

// ▼▼▼ TYPES & CONSTANTS (Tidak berubah) ▼▼▼
type Identity = { nama: string; suka: string; dikuasai: string; kenapaDibutuhkan: string; peluangPenghasilan: string; };
type SWOT = { niche: string; kategori: string; microNiche: string; kekuatan: string; kelemahan: string; peluang: string; tantangan: string; };
type Pillar = { premis: string; toneOfVoice: string; targetAudiens: string; };
type ContentIdea = { id: number; title: string; deadline: string; status: string; script: string; platform: string; pillar: string; format: string;};
const STORAGE_KEY = "pb_access_key";
const VALID_KEY = "demo_key";
const btnPrimary = 'px-3 py-2 bg-slate-900 text-white rounded flex items-center gap-2 text-sm transition transform hover:scale-[1.03] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150';
const btnNeutral = 'px-3 py-2 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150';
// ▲▲▲ END OF TYPES & CONSTANTS ▲▲▲

// ▼▼▼ REUSABLE COMPONENTS ▼▼▼
const Input = memo(({ label, value, onChange, placeholder, rows = 1 }: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; }) => {
  return (
    <label className="block text-sm">
      {label && <div className="text-xs text-gray-500 mb-1">{label}</div>}
      {rows > 1 ? (
        <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
      )}
    </label>
  );
});

const LoginScreen = ({ onLogin, accessKey, setAccessKey, onUseDemoKey }: {
  onLogin: (e: React.FormEvent) => void;
  accessKey: string;
  setAccessKey: (key: string) => void;
  onUseDemoKey: () => void;
}) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4"> <Key className="w-5 h-5 text-gray-600" /> <h1 className="text-lg font-semibold">Personal Branding Builder v2</h1> </div>
      <p className="text-sm text-gray-500 mb-4">Masukkan access key untuk membuka tool.</p>
      <form onSubmit={onLogin} className="space-y-3">
        <input value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="Access key" className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow duration-150" />
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded transition transform hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150">Login</button>
          <button type="button" onClick={onUseDemoKey} className="px-4 py-2 border rounded transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"> Isi contoh </button>
        </div>
      </form>
    </div>
  </div>
);

// ▼▼▼ Modal Setup Spreadsheet ▼▼▼
const SpreadsheetSetupModal = ({ isOpen, onClose, onSave, currentId }: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string) => void;
  currentId: string;
}) => {
  const [localId, setLocalId] = useState(currentId);
  const SPREADSHEET_TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/15QZy8PMyegW78GG_Tx0hhvrosTiEn1_Nyx4jkpKAxoE/copy";

  useEffect(() => {
    setLocalId(currentId);
  }, [currentId, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!localId || !localId.trim()) {
      alert("Masukkan Spreadsheet ID atau URL terlebih dahulu.");
      return;
    }
    onSave(localId.trim());
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex items-start justify-between mb-4">
            <div>
                <h2 className="text-lg font-semibold">Setup Spreadsheet PBB</h2>
                <p className="text-xs text-gray-500">
                  Hubungkan Spreadsheet PBB untuk menyimpan data Kamu.
                </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md space-y-3">
            <p className="text-xs text-gray-600">
                <span className="font-semibold">Langkah 1:</span> Klik link di bawah untuk membuat salinan Template Spreadsheet PBB di Google Drive Kamu (Skip langkah ini kalau sudah memiliki file Spreadsheet PBB)
            </p>
            <a 
                href={SPREADSHEET_TEMPLATE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
            > 
                <ExternalLink className="w-4 h-4" /> Salin Template Spreadsheet PBB
            </a>
            <p className="text-xs text-gray-600 pt-2">
                <span className="font-semibold">Langkah 2:</span> Salin Link Spreadsheet PBB Kamu dan tempel di bawah ini.
            </p>
            <input 
                value={localId} 
                onChange={(e) => setLocalId(e.target.value)} 
                placeholder="Tempel Link Spreadsheet PBB di sini..." 
                className="border px-3 py-2 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
            />
        </div>

        <div className="mt-6 flex justify-start gap-3">
            <button onClick={handleSave} className={btnPrimary}>Simpan ID</button>
            <button onClick={onClose} className={btnNeutral}>Batal</button>
        </div>
      </div>
    </div>
  );
};
// ▲▲▲ END ▲▲▲

// ▼▼▼ Komponen Menu Navigasi ▼▼▼
type TabMenuProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
const TabMenu = ({ activeTab, setActiveTab }: TabMenuProps) => {
  const menuItems = ['Start from 0', 'Finder Identity', 'Personal Detector', 'Smart Pillar', 'Bio Generator', 'Content Factory'];

  return (
    <div className="border-b mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <nav className="flex -mb-px" aria-label="Tabs">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`
              whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm
              transition-colors duration-150 focus:outline-none
              ${
                activeTab === item
                  ? 'border-slate-800 text-slate-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {item}
          </button>
        ))}
      </nav>
</div>
  );
};
// ▲▲▲ END ▲▲▲

// ▼▼▼ FEATURE COMPONENTS ▼▼▼
const IdentitySection = memo(({ identity, setIdentity, onGenerate, onSave, isSaving }: {
  identity: Identity; setIdentity: (i: Identity) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean;
}) => (
  <div>
    <h2 className="text-sm font-medium mb-2">FINDER IDENTITY</h2>
    <div className="space-y-2">
      <Input label="Nama" value={identity.nama} onChange={(v) => setIdentity({ ...identity, nama: v })} placeholder="Nama kamu" />
      <Input label="Hal yang disukai" value={identity.suka} onChange={(v) => setIdentity({ ...identity, suka: v })} placeholder="Contoh: tools digital" rows={2} />
      <Input label="Hal yang dikuasai" value={identity.dikuasai} onChange={(v) => setIdentity({ ...identity, dikuasai: v })} placeholder="Contoh: landing page, spreadsheet" rows={2} />
      <Input label="Kenapa dibutuhkan" value={identity.kenapaDibutuhkan} onChange={(v) => setIdentity({ ...identity, kenapaDibutuhkan: v })} placeholder="Masalah yang kamu selesaikan" rows={2} />
      <Input label="Peluang penghasilan" value={identity.peluangPenghasilan} onChange={(v) => setIdentity({ ...identity, peluangPenghasilan: v })} placeholder="Contoh: jualan template" rows={2} />
      <div className="flex gap-2 mt-4">
        <button onClick={onGenerate} className={btnPrimary}> <Edit3 className="w-4 h-4" /> Generate </button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}>{isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </div>
  </div>
));

const SwotSection = memo(({ swot, setSwot, onGenerate, onSave, isSaving }: {
  swot: SWOT; setSwot: (s: SWOT) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean;
}) => (
  <div>
    <h2 className="text-sm font-medium mb-2">PERSONAL DETECTOR</h2>
    <div className="space-y-2">
      <Input label="Niche" value={swot.niche} onChange={(v) => setSwot({ ...swot, niche: v })} placeholder="Contoh: Digital Tools for Creators" />
      <Input label="Kategori" value={swot.kategori} onChange={(v) => setSwot({ ...swot, kategori: v })} />
      <Input label="Micro-niche" value={swot.microNiche} onChange={(v) => setSwot({ ...swot, microNiche: v })} />
      <Input label="Kekuatan" value={swot.kekuatan} onChange={(v) => setSwot({ ...swot, kekuatan: v })} />
      <Input label="Kelemahan" value={swot.kelemahan} onChange={(v) => setSwot({ ...swot, kelemahan: v })} />
      <Input label="Peluang" value={swot.peluang} onChange={(v) => setSwot({ ...swot, peluang: v })} />
      <Input label="Tantangan" value={swot.tantangan} onChange={(v) => setSwot({ ...swot, tantangan: v })} />
      <div className="flex gap-2 mt-4">
        <button onClick={onGenerate} className={btnPrimary}><Edit3 className="w-4 h-4" /> Generate</button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}>{isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </div>
  </div>
));

const PillarSection = memo(({ pillar, setPillar, onGenerate, onSave, isSaving }: {
  pillar: Pillar; setPillar: (p: Pillar) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean;
}) => (
  <>
    <h2 className="text-sm font-medium mb-2">SMART PILLAR</h2>
    <div className="space-y-2">
      <Input label="Premis" value={pillar.premis} onChange={(v) => setPillar({ ...pillar, premis: v })} rows={2} />
      <label className="text-xs text-gray-500 mb-2">Tone of Voice</label>
      <div className="relative mb-4">
        <select
          className="w-full border px-3 pr-8 py-2 rounded text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
          value={pillar.toneOfVoice}
          onChange={(e) =>
            setPillar({ ...pillar, toneOfVoice: e.target.value })
          }
        >
          <option value="">-- Pilih Tone of Voice --</option>
          <option value="Professional & Formal">Professional & Formal</option>
          <option value="Edukatif & Informatif">Edukatif & Informatif</option>
          <option value="Casual & Friendly">Casual & Friendly</option>
          <option value="Inspirational & Motivational">Inspirational & Motivational</option>
          <option value="Fun & Energetic">Fun & Energetic</option>
          <option value="Luxury & Exclusive">Luxury & Exclusive</option>
          <option value="Bold & Controversial">Bold & Controversial</option>
          <option value="Visionary & Encouraging">Visionary & Encouraging</option>
        </select>
        <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <Input label="Target audiens" value={pillar.targetAudiens} onChange={(v) => setPillar({ ...pillar, targetAudiens: v })} />
      <div className="flex gap-2 mt-4">
        <button onClick={onGenerate} className={btnPrimary}><Edit3 className="w-4 h-4" /> Generate </button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}>{isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </div>
  </>
));

const PillarListManager = memo(({ identity, pillarsList, setPillarsList, onSave, isSaving }: {
  identity: Identity;
  pillarsList: string[];
  setPillarsList: React.Dispatch<React.SetStateAction<string[]>>;
  onSave: () => void; isSaving: boolean;
}) => {
  const [tagInputValue, setTagInputValue] = useState("");

  function addPillarTagFromInput() {
    const v = (tagInputValue || "").trim();
    if (!v) return;

    const next = [...(pillarsList || [])];
    const idx = next.findIndex((x) => !x || x.trim() === "");

    if (idx !== -1) {
      next[idx] = v;
    } else if (next.length < 6) {
      next.push(v);
    } else {
      alert("Maksimal 6 pillar");
      setTagInputValue("");
      return;
    }
    
    setPillarsList(next);
    setTagInputValue("");
  }

  function removePillarAt(index: number) {
    const next = [...pillarsList];
    next[index] = "";
    setPillarsList(next);
  }

  function updatePillarAt(index: number, value: string) {
    const next = [...pillarsList];
    next[index] = value;
    setPillarsList(next);
  }

  return (
    <>
      <label className="text-sm font-medium">{`List Pillar ${identity.nama} (max.6)`}</label>
      <div className="mt-2 flex gap-2">
        <input 
          value={tagInputValue} 
          onChange={(e) => setTagInputValue(e.target.value)} 
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPillarTagFromInput(); } }} 
          placeholder="Tulis dan tekan Enter untuk tambah" 
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
        />
        <button onClick={addPillarTagFromInput} className={btnPrimary}>Tambah</button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}>{isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {pillarsList.map((p, i) => (
          <div key={"grid" + i} className="border rounded p-2 text-sm min-h-fit flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150">
            <input 
              value={p} 
              onChange={(e) => updatePillarAt(i, e.target.value)} 
              className="bg-transparent text-sm outline-none w-full" 
              placeholder="-- kosong --" 
            />
            <button onClick={() => removePillarAt(i)} className="text-xs px-1 cursor-pointer">✕</button>
          </div>
        ))}
      </div>
    </>
  );
});

const BioGeneratorSection = memo(({ bio, setBio, onGenerate, onSave, isSaving }: { bio: string; setBio: (b: string) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean; }) => (
  <>
    <h2 className="text-sm font-medium mb-0">BIO GENERATOR</h2>
    <p className="text-xs text-gray-500 mb-4">
      Hasil generate akan didasarkan pada data Identity, SWOT, dan Pillar yang telah diisi.
    </p>
    <div className="flex flex-col gap-2 w-full">
      <div className="flex mb-2 gap-2">
        <button onClick={onGenerate} className={`w-fit ${btnPrimary}`}>
          <Edit3 className="w-4 h-4" /> Generate
        </button>
        <button type="button" onClick={onSave} disabled={isSaving} className={`w-fit ${btnNeutral}`}>{isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
      <div className="w-full">
        <Input value={bio} onChange={setBio} rows={4} placeholder="Tulis bio sosmed di sini..." />
      </div>
    </div>
  </>
));

const IdeaGenerator = memo(({ pillarsList, onGenerateIdeas }: {
  pillarsList: string[];
  onGenerateIdeas: (pillar: string, count: number) => void;
}) => {
  const [selectedPillar, setSelectedPillar] = useState("");
  const [numIdeas, setNumIdeas] = useState(5);

  const filteredPillars = pillarsList.filter((p) => p && p.trim() !== "");

  useEffect(() => {
    // Reset pilihan jika pillar yang dipilih tidak lagi valid
    if (selectedPillar && !filteredPillars.includes(selectedPillar)) {
      setSelectedPillar("");
    }
  }, [pillarsList, selectedPillar, filteredPillars]);

  return (
    <div className="mt-6 border-t pt-4">
      <label className="text-sm font-medium">CONTENT FACTORY</label>
      <div className="relative mt-2">
        <select 
          value={selectedPillar} 
          onChange={(e) => setSelectedPillar(e.target.value)} 
          className="w-full border px-3 pr-8 py-2 rounded text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
          disabled={filteredPillars.length === 0}
        >
          <option value="">-- Pilih Pilar --</option>
          {filteredPillars.map((p, i) => (
            <option key={`pillar-opt-${i}`} value={p}>{p}</option>
          ))}
        </select>
        <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="mt-3 flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">Jumlah ide</label>
          <input 
            type="number" 
            min={1} max={50} 
            value={numIdeas} 
            onChange={(e) => setNumIdeas(Number(e.target.value))} 
            className="w-11 md:w-16 border px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
          />
        </div>
        <button 
          onClick={() => { if (!selectedPillar) return alert("Pilih pilar dulu"); onGenerateIdeas(selectedPillar, numIdeas); }} 
          className={`${btnPrimary}`}
          disabled={!selectedPillar}
        >
          <Edit3 className="w-4 h-4" /> Generate
        </button>
      </div>
    </div>
  );
});

const ContentIdeasList = memo(({ identity, contentIdeas, pillarsList, setContentIdeas, onGenerateScript, onSave, isSaving }: {
  identity: Identity;
  contentIdeas: ContentIdea[];
  setContentIdeas: React.Dispatch<React.SetStateAction<ContentIdea[]>>;
  onGenerateScript: (idea: ContentIdea) => void;
  pillarsList: string[];
  onSave: () => void; isSaving: boolean;
}) => {
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);

  const addIdea = () => {
    if (!newIdeaTitle.trim()) return;
    const newIdea: ContentIdea = {
      id: Date.now() + Math.random(),
      title: newIdeaTitle.trim(),
      deadline: "",
      status: "Idea",
      script: "",
      platform: "",
      pillar: "",
      format: ""
    };
    setContentIdeas((prev) => [...prev, newIdea]);
    setNewIdeaTitle("");
  };

  const updateIdea = (updatedIdea: ContentIdea) => {
    setContentIdeas(prev => 
      prev.map(idea => (idea.id === updatedIdea.id ? updatedIdea : idea))
    );
  };  
  
  const deleteIdea = (id: number) => {
    setContentIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  const handleOpenModal = (idea: ContentIdea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIdea(null);
  };

  return (
    <div className="mt-6 border-t pt-4">
      <label className="font-medium text-sm mb-3">{`List Konten ${identity.nama}`}</label>
      <div className="flex gap-2 mt-2 mb-4">
        <input type="text" placeholder="Judul ide konten" value={newIdeaTitle} onChange={(e) => setNewIdeaTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIdea(); }}} className="flex-1 border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
        <button onClick={addIdea} className={`${btnPrimary}`}>Tambah</button>
        <button type="button" onClick={onSave} disabled={isSaving} className={`w-fit ${btnNeutral}`}>{isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="hidden md:table-header-group bg-gray-100">
            <tr>
              <th className="border p-2">Judul Ide</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Status</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {contentIdeas.length === 0 ? (
              <tr className="block md:table-row"><td colSpan={4} className="block md:table-cell text-center text-gray-500 py-4">Belum ada ide konten</td></tr>
            ) : contentIdeas
            .slice()
            .sort((a, b) => {
              // 1. Prioritas: deadline kosong → taruh di atas
              if (a.deadline && !b.deadline) return 1;
              if (!a.deadline && b.deadline) return -1;
          
              // 2. Kalau sama-sama kosong deadline
              if (!a.deadline && !b.deadline) {
                // Urutkan Uploaded ke bawah
                if (a.status === "Uploaded" && b.status !== "Uploaded") return 1;
                if (a.status !== "Uploaded" && b.status === "Uploaded") return -1;
                return 0;
              }
          
              // Convert deadline ke Date object
              const dateA = new Date(a.deadline);
              const dateB = new Date(b.deadline);
          
              // 3. Kalau ada deadline, Uploaded tetap di bawah
              if (a.status === "Uploaded" && b.status !== "Uploaded") return 1;
              if (a.status !== "Uploaded" && b.status === "Uploaded") return -1;
          
              // 4. Kalau dua-duanya belum Uploaded → urut ascending
              if (a.status !== "Uploaded" && b.status !== "Uploaded") {
                return dateA.getTime() - dateB.getTime();
              }
          
              // 5. Kalau dua-duanya Uploaded → urut descending
              if (a.status === "Uploaded" && b.status === "Uploaded") {
                return dateB.getTime() - dateA.getTime();
              }
          
              return 0;
            })
            .map((idea) => (
              <tr
                key={idea.id}
                className="block md:table-row mb-4 md:mb-0 border md:border-none rounded-lg md:rounded-none"
              >
                <td
                  data-label="Judul:"
                  className="p-2 block md:table-cell border-b md:border relative"
                >
                  <span className="md:hidden font-bold mr-2">Judul:</span>
                  {idea.title}
                </td>
          
                <td
                  data-label="Deadline:"
                  className="p-2 block md:table-cell border-b md:border text-right md:text-center relative"
                >
                  <span className="md:hidden font-bold float-left mt-1">Deadline:</span>
                  {idea.deadline
                    ? new Date(idea.deadline).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </td>
          
                <td
                  data-label="Status:"
                  className="p-2 block md:table-cell border-b md:border text-right md:text-center relative"
                >
                  <span className="md:hidden font-bold float-left mt-1">Status:</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize ${
                      idea.status === "Uploaded"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {idea.status}
                  </span>
                </td>
          
                <td
                  data-label="Aksi:"
                  className="p-2 border-0 md:border block md:table-cell text-right md:text-center relative"
                >
                  <span className="md:hidden font-bold float-left mt-1">Aksi:</span>
                  <div className="flex justify-end md:justify-center items-center gap-1">
                    <button
                      onClick={() => handleOpenModal(idea)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"
                      title="Lihat Detail & Script"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"
                      title="Hapus Konten"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedIdea && (
        <ContentDetailModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ideaData={selectedIdea}
          onUpdate={updateIdea}
          onGenerateScript={onGenerateScript}
          pillarsList={pillarsList}
        />
      )}
    </div>
  );
});
const ContentDetailModal = memo(({ isOpen, onClose, ideaData, onUpdate, onGenerateScript, pillarsList }: {
  isOpen: boolean;
  onClose: () => void;
  ideaData: ContentIdea;
  onUpdate: (updatedIdea: ContentIdea) => void;
  onGenerateScript: (idea: ContentIdea) => void;
  pillarsList: string[];
}) => {
  const [formData, setFormData] = useState<ContentIdea>(ideaData);

  useEffect(() => {
    setFormData(ideaData);
  }, [ideaData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    onUpdate(formData);
    onClose();
  };

  const platforms = ["Instagram", "Tiktok", "Facebook", "Youtube", "X / Threads", "Linkedin"];
  const statuses: ContentIdea['status'][] = ["Idea", "Scripting", "Shooting", "Editing", "Uploaded"];
  const formats: ContentIdea['format'][] = ["Video Pendek", "Video Panjang", "Carousel", "Feed Story", "Text Thread"];
  const filteredPillars = pillarsList.filter((p) => p && p.trim() !== "");

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4">
        <header className="px-4 pb-2 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Detail Ide Konten</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl focus:outline-none">&times;</button>
        </header>
        
        <main className="p-4 space-y-4 overflow-y-auto">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Judul Konten</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Status</label>
              <div className="relative">
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150">
                  {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Pilar Konten</label>
              <div className="relative">
                <select 
                  name="pillar" 
                  value={formData.pillar || ""} 
                  onChange={handleChange} 
                  className="w-full border rounded px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
                  disabled={filteredPillars.length === 0}
                >
                  <option value="">-- Pilih Pilar --</option>
                  {filteredPillars.map((p, i) => (
                    <option key={`modal-pillar-opt-${i}`} value={p}>{p}</option>
                  ))}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tanggal Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Platform</label>
              <div className="relative">
                <select name="platform" value={formData.platform} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150">
                  <option value="">-- Pilih Platform --</option>
                  {platforms.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Format Konten</label>
              <div className="relative">
                <select 
                  name="format" 
                  value={formData.format || ""} 
                  onChange={handleChange} 
                  className="w-full border rounded px-3 py-2 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
                >
                  <option value="">-- Pilih Format --</option>
                  {formats.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-center w-full">
              <button onClick={() => onGenerateScript(formData)} className={`w-full mt-2 mb-6 justify-center ${btnPrimary}`}>
                <Edit3 className="w-4 h-4" /> Generate Prompt Script
              </button>
            </div>
            <textarea name="script" value={formData.script} onChange={handleChange} rows={8} placeholder="Tulis script konten di sini..." className="w-full border rounded px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150" />
          </div>
        </main>
        
        <footer className="py-4 px-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-2">
            <button onClick={handleSaveChanges} className={btnPrimary}>Simpan Perubahan</button>
            <button onClick={onClose} className="px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150">Batal</button>
          </div>
        </footer>
      </div>
    </div>
  );
});

// ▼▼▼ MAIN COMPONENT ▼▼▼
export default function PersonalBrandingBuilder() {
  // --- STATE HOOKS ---
  const [accessKeyInput, setAccessKeyInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [savedKey, setSavedKey] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const emptyIdentity: Identity = { nama: "", suka: "", dikuasai: "", kenapaDibutuhkan: "", peluangPenghasilan: "" };
  const emptySwot: SWOT = { niche: "", kategori: "", microNiche: "", kekuatan: "", kelemahan: "", peluang: "", tantangan: "" };
  const emptyPillar: Pillar = { premis: "", toneOfVoice: "", targetAudiens: "" };
  const [identity, setIdentity] = useState<Identity>(emptyIdentity);
  const [swot, setSwot] = useState<SWOT>(emptySwot);
  const [pillar, setPillar] = useState<Pillar>(emptyPillar);
  const [pillarsList, setPillarsList] = useState<string[]>(["", "", "", "", "", ""]);
  const [bioResult, setBioResult] = useState("");
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [activeTab, setActiveTab] = useState("Start from 0");
  const [isSpreadsheetModalOpen, setIsSpreadsheetModalOpen] = useState(false);

  // --- LOCAL STORAGE & AUTH EFFECT ---
  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    const savedId = localStorage.getItem("pb_spreadsheet_id");
    
    if (savedKey === VALID_KEY) {
      setIsLoggedIn(true);
    }
    if (savedId) {
      setSpreadsheetId(savedId);
    }
  }, []);

  // ▼▼▼ Effect untuk memunculkan modal setelah login ▼▼▼
  useEffect(() => {
    if (isLoggedIn && !spreadsheetId) {
      setIsSpreadsheetModalOpen(true);
    }
  }, [isLoggedIn, spreadsheetId]);
  // ▲▲▲ END ▲▲▲

  // --- DATA & AUTH FUNCTIONS ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKeyInput === VALID_KEY) {
      localStorage.setItem(STORAGE_KEY, accessKeyInput);
      setIsLoggedIn(true);
    } else {
      alert("Access key salah.");
    }
  };

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setSavedKey("");
    setIsLoggedIn(false);
    resetAll();
  }

  const handleSaveSpreadsheetId = (id: string) => {
    let extractedId = id;
    try {
      if (id.includes("spreadsheets/d/")) {
        extractedId = id.split("spreadsheets/d/")[1].split("/")[0];
      }
    } catch (e) { /* Gagal ekstrak, gunakan input mentah */ }

    setSpreadsheetId(extractedId);
    localStorage.setItem("pb_spreadsheet_id", extractedId);
    setIsSpreadsheetModalOpen(false);
    alert("✅ Spreadsheet ID berhasil disimpan!");
  };

  function resetAll() {
    setIdentity(emptyIdentity);
    setSwot(emptySwot);
    setPillar(emptyPillar);
    setPillarsList([]);
    setContentIdeas([]);
    setBioResult("");
    setContentIdeas([]);
  }

  // --- PROMPT & GENERATION FUNCTIONS ---
  const buildPromptForNiche = (data: Identity) => `Buatkan saya 5 niche terbaik beserta 1-sentence deskripsi dan 3 ide konten untuk tiap niche berdasarkan data identitas berikut:\nNama: ${data.nama}\nHal yang disukai: ${data.suka}\nHal yang dikuasai: ${data.dikuasai}\nKenapa dibutuhkan: ${data.kenapaDibutuhkan}\nPeluang penghasilan: ${data.peluangPenghasilan}\nFormat jawaban: JSON array dengan field {niche, deskripsi, ide_konten}`;
  const buildPromptForPremis = (data: SWOT) => `Buatkan premis (1-2 paragraf) yang kuat untuk personal brand berdasarkan analisis SWOT berikut dan cocok untuk platform social media:\nNiche: ${data.niche}\nKategori: ${data.kategori}\nMicro-niche: ${data.microNiche}\nKekuatan: ${data.kekuatan}\nKelemahan: ${data.kelemahan}\nPeluang: ${data.peluang}\nTantangan: ${data.tantangan}\nInstruksi: Tonjolkan unique selling point, singkat, dan actionable.`;
  const buildPromptForPillars = (data: Pillar) => `Buatkan list 4-6 pillar konten (judul + 1 kalimat deskripsi + 3 contoh ide posting) berdasarkan:\nPremis: ${data.premis}\nTone of voice: ${data.toneOfVoice}\nTarget audiens: ${data.targetAudiens}\nBerikan output dalam format JSON array dengan field {pillar, deskripsi, ide}`;
  const buildPromptForBio = (identityData: Identity, swotData: SWOT, pillarData: Pillar) => `Berperanlah sebagai seorang top kreator di sosial media, tolong buatkan bio di profile sosmed berdasarkan data personal brand berikut.\n\n**Data Personal Brand:**\n- Nama: ${identityData.nama}\n- Niche: ${swotData.niche}\n- Premis Utama: ${pillarData.premis}\n- Target Audiens: ${pillarData.targetAudiens}\n- USP (dari Kekuatan): ${swotData.kekuatan}\n- Tone of Voice: ${pillarData.toneOfVoice}\n\n**Instruksi Format:**\nBuat bio yang ringkas agar mudah dimengerti orang awam. Di tiap pilihan bionya sertakan pertimbangan untuk lebih meyakinkan. Buat "10 pilihan", tiap pilihan memiliki 3 baris. baris 1 merepresentasikan "siapa diri kamu?", baris 2 "solusi apa yang ditawarkan untuk audiens", baris 3 "cta link di bio" dan berikan emoticon yang relate agar ngga monoton ditiap barisnya. tampilkan dalam bentuk tabel`;
  const buildPromptForContentIdeas = (pillarName: string, jumlah: number) => `Buatkan ${jumlah} ide konten kreatif untuk pilar konten: "${pillarName}".\nBerikan format output dalam format tabel dengan field {judul ide, deskripsi}.\nFokus pada ide yang unik, relevan, dan engaging untuk audiens saya.`;
  const buildPromptForScript = (identity: Identity, idea: ContentIdea) => `Buatkan script konten untuk ${identity.nama} dengan detail sebagai berikut:\n\n- **Judul/Topik Utama:** "${idea.title}"\n- **Target Platform:** ${idea.platform.toUpperCase()}\n- **Tujuan Konten:** (Contoh: Edukasi, Hiburan, Penjualan)\n- **Hook (3 detik pertama):** Buatkan hook yang sangat menarik perhatian.\n- **Isi Konten:** Jabarkan poin-poin utama secara jelas dan ringkas.\n- **Call to Action (CTA):** Ajak audiens untuk (Contoh: follow, comment, klik link di bio).\n- **Tone of Voice:** Santai dan to the point.\n\nFormat output sebagai teks script lengkap yang siap dibacakan atau dijadikan poin-poin video.`;
  const openChatWithPrompt = (prompt: string) => { const url = 'https://chat.openai.com/?prompt=' + encodeURIComponent(prompt); window.open(url, '_blank'); };

  // --- IMPORT/EXPORT FUNCTIONS ---
  async function importFromSheet(importType: 'branding' | 'content') {
    // 1. Validasi Awal
    if (!spreadsheetId) {
      return alert("Masukkan Spreadsheet ID atau URL lengkap terlebih dahulu.");
    }

    // 2. Ekstraksi ID
    let extractedId = spreadsheetId;
    try {
      if (spreadsheetId.includes("spreadsheets/d/")) {
        extractedId = spreadsheetId.split("spreadsheets/d/")[1].split("/")[0];
      }
      extractedId = extractedId.trim();
    } catch (e) {
      console.warn("Gagal mengekstrak ID, menggunakan input mentah.", e);
    }

    // 3. Menentukan Payload Request & Pesan Sukses
    let sheetName: string;
    let successMessage: string;

    if (importType === "branding") {
      sheetName = "Personal Branding Builder";
      successMessage = "✅ Data Personal Branding berhasil diimpor!";
    } else {
      sheetName = "Content Factory";
      successMessage = "✅ Data Content Factory berhasil diimpor!";
    }

    // 4. Fetch API
    setIsImporting(true);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadsheetId: extractedId, sheetName })
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || "Unknown API error");
      if (!payload.data) throw new Error("Response API tidak berisi data yang diharapkan");

      // 5. Update State Berdasarkan Tipe Import
      if (importType === "branding") {
        const parsed = payload.data;

        setIdentity({
          nama: parsed.identity?.nama || "",
          suka: parsed.identity?.suka || "",
          dikuasai: parsed.identity?.dikuasai || "",
          kenapaDibutuhkan: parsed.identity?.kenapaDibutuhkan || "",
          peluangPenghasilan: parsed.identity?.peluangPenghasilan || "",
        });

        setSwot({
          niche: parsed.swot?.niche || "",
          kategori: parsed.swot?.kategori || "",
          microNiche: parsed.swot?.microNiche || "",
          kekuatan: parsed.swot?.kekuatan || "",
          kelemahan: parsed.swot?.kelemahan || "",
          peluang: parsed.swot?.peluang || "",
          tantangan: parsed.swot?.tantangan || "",
        });

        setPillar({
          premis: parsed.pillar?.premis || "",
          toneOfVoice: parsed.pillar?.toneOfVoice || "",
          targetAudiens: parsed.pillar?.targetAudiens || "",
        });

        setBioResult(parsed.bio);

        if (parsed.pillarsList && Array.isArray(parsed.pillarsList)) {
          const normalized = (parsed.pillarsList as string[]).slice(0, 6);
          while (normalized.length < 6) normalized.push("");
          setPillarsList(normalized);
        }
      }

      if (importType === "content") {
        if (Array.isArray(payload.data.contentIdeas)) {
          setContentIdeas(payload.data.contentIdeas);
        } else {
          throw new Error("Response API tidak berisi data ide konten yang diharapkan");
        }
      }

      alert(successMessage);
    } catch (err: any) {
      console.error("Import error:", err);
      alert(`❌ Gagal import data (${importType}).\n\nError: ${err?.message || err}`);
    } finally {
      setIsImporting(false);
    }
  }

  async function exportToSheet(exportType: 'branding' | 'content') {
    // 1. Validasi Awal
    if (!spreadsheetId) {
      return alert("Masukkan Spreadsheet ID atau URL lengkap terlebih dahulu.");
    }

    if (exportType === 'content' && contentIdeas.length === 0) {
      return alert("Tidak ada ide konten untuk diekspor.");
    }

    // 2. Ekstraksi ID
    let extractedId = spreadsheetId;
    try {
      if (spreadsheetId.includes("spreadsheets/d/")) {
        extractedId = spreadsheetId.split("spreadsheets/d/")[1].split("/")[0];
      }
      extractedId = extractedId.trim();
    } catch (e) {
      console.warn("Gagal mengekstrak ID, menggunakan input mentah.", e);
    }

    // 3. Menentukan Payload & Pesan Sukses
    let payload;
    let successMessage;

    if (exportType === "branding") {
      payload = {
        extractedId,
        sheetName: "Personal Branding Builder",
        identity,
        swot,
        pillar,
        pillarsList,
        bioResult,
      };
      successMessage = "✅ Data Personal Branding berhasil disimpan!";
    } else {
      payload = {
        extractedId,
        sheetName: "Content Factory",
        contentIdeas,
      };
      successMessage = `✅ ${contentIdeas.length} ide konten berhasil diekspor!`;
    }

    // 4. Fetch API
    setIsExporting(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        alert(successMessage);
      } else {
        throw new Error(result.error || "Pastikan URL Spreadsheet Kamu sudah benar!");
      }
    } catch (err: any) {
      console.error("Export error:", err);
      alert(`❌ Gagal export data (${exportType}).\n\nError: ${err?.message || err}`);
    } finally {
      setIsExporting(false);
    }
  }

  async function downloadPDF() {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt' });
      let y = 40;
      doc.setFontSize(16);
      doc.text('Personal Branding - Export', 40, y);
      y += 30;
      doc.setFontSize(12);

      function writeSection(title: string, obj: object) {
        doc.setFontSize(13);
        doc.text(title, 40, y);
        y += 18;
        doc.setFontSize(10);
        const text = JSON.stringify(obj, null, 2);
        const split = doc.splitTextToSize(text, 520);
        doc.text(split, 40, y);
        y += split.length * 12 + 12;
        if (y > 750) { doc.addPage(); y = 40; }
      }

      writeSection('IDENTITY', identity);
      writeSection('SWOT', swot);
      writeSection('PILLAR', pillar);
      doc.save(`personal-branding-${identity.nama || 'export'}.pdf`);
    } catch (err) {
      alert('Gagal export PDF — pastikan library jspdf tersedia.');
    }
  }

  // --- RENDER LOGIC ---
  if (!isLoggedIn) {
    return (
      <LoginScreen onLogin={handleLogin} accessKey={accessKeyInput} setAccessKey={setAccessKeyInput} onUseDemoKey={() => setAccessKeyInput(VALID_KEY)} />
    );
  }

  return (
    <>
      <SpreadsheetSetupModal 
        isOpen={isSpreadsheetModalOpen}
        onClose={() => setIsSpreadsheetModalOpen(false)}
        onSave={handleSaveSpreadsheetId}
        currentId={spreadsheetId}
      />
      <div className="min-h-screen bg-gray-50 p-0 md:p-6">
        <div className="max-w-5xl mx-auto bg-white shadow rounded p-6">
          <header className="flex items-center justify-between mb-6">
            <div className="w-fit">
              <h1 className="text-xl font-semibold">Personal Branding Builder v2</h1>
              <p className="text-sm text-gray-500">Minimal, responsive, dan siap dipakai untuk generate prompt & export.</p>
            </div>
            <div className="flex flex-wrap justify-end items-center gap-2 w-fit">
              <button onClick={() => setIsSpreadsheetModalOpen(true)} className="flex items-center gap-1 px-2 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"> <FileSpreadsheet className="w-4 h-4" /> Sheet ID </button>
              <button className="flex items-center justify-center gap-1 px-2 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150" onClick={downloadPDF}><Download className="w-4 h-4" /> Download PDF</button>
              <button className="flex items-center justify-center gap-1 px-2 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150" onClick={resetAll}><RefreshCcw className="w-4 h-4" /> Reset Data</button>
              <button onClick={handleLogout} className="flex items-center gap-1 px-2 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"> <LogOut className="w-4 h-4" /> Logout </button>
              <button onClick={() => importFromSheet('branding')} disabled={isImporting} className={`flex items-center justify-center gap-1 px-2 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}> <Upload className="w-4 h-4" /> {isImporting ? 'Importing...' : 'Import Data Personal Branding'} </button>
              <button onClick={() => importFromSheet('content')} disabled={isImporting} className={`flex items-center justify-center gap-1 px-2 py-1 border rounded text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}> <Upload className="w-4 h-4" /> {isImporting ? 'Importing...' : 'Import Data Content'} </button>
            </div>
          </header>

          <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="grid grid-cols-1 lg:grid-cols-2">
            <section className="col-span-2 p-5 border rounded space-y-4">
              {activeTab === 'Start from 0' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <IdentitySection identity={identity} setIdentity={setIdentity} onGenerate={() => openChatWithPrompt(buildPromptForNiche(identity))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                    <SwotSection swot={swot} setSwot={setSwot} onGenerate={() => openChatWithPrompt(buildPromptForPremis(swot))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  </div>
                  <div className="h-[1px] w-full bg-slate-900 mt-6 mb-4" />
                  <PillarSection pillar={pillar} setPillar={setPillar} onGenerate={() => openChatWithPrompt(buildPromptForPillars(pillar))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <PillarListManager identity={identity} pillarsList={pillarsList} setPillarsList={setPillarsList} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <div className="h-[1px] w-full bg-slate-900 mt-3 mb-5" />
                  <BioGeneratorSection bio={bioResult} setBio={setBioResult} onGenerate={() => openChatWithPrompt(buildPromptForBio(identity, swot, pillar))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <IdeaGenerator pillarsList={pillarsList} onGenerateIdeas={(pillar, count) => openChatWithPrompt(buildPromptForContentIdeas(pillar, count))} />
                  <ContentIdeasList identity={identity} pillarsList={pillarsList} contentIdeas={contentIdeas} setContentIdeas={setContentIdeas} onGenerateScript={(idea) => openChatWithPrompt(buildPromptForScript(identity, idea))} onSave={() => exportToSheet('content')} isSaving={isExporting} />
                </>
              )}
              {activeTab === 'Finder Identity' && (
                <>
                  <IdentitySection identity={identity} setIdentity={setIdentity} onGenerate={() => openChatWithPrompt(buildPromptForNiche(identity))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <div className="space-y-2">
                    <Input label="Niche" value={swot.niche} onChange={(v) => setSwot({ ...swot, niche: v })} placeholder="Contoh: Digital Tools for Creators" />
                    <Input label="Kategori" value={swot.kategori} onChange={(v) => setSwot({ ...swot, kategori: v })} />
                    <Input label="Micro-niche" value={swot.microNiche} onChange={(v) => setSwot({ ...swot, microNiche: v })} />
                  </div>
                </>
              )}
              {activeTab === 'Personal Detector' && (
                <div className="space-y-2">
                  <SwotSection swot={swot} setSwot={setSwot} onGenerate={() => openChatWithPrompt(buildPromptForPremis(swot))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <Input label="Premis" value={pillar.premis} onChange={(v) => setPillar({ ...pillar, premis: v })} rows={2} />
                </div>
              )}
              {activeTab === 'Smart Pillar' && (
                <>
                  <PillarSection pillar={pillar} setPillar={setPillar} onGenerate={() => openChatWithPrompt(buildPromptForPillars(pillar))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <PillarListManager identity={identity} pillarsList={pillarsList} setPillarsList={setPillarsList} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                </>
              )}
              {activeTab === 'Bio Generator' && (
                <BioGeneratorSection bio={bioResult} setBio={setBioResult} onGenerate={() => openChatWithPrompt(buildPromptForBio(identity, swot, pillar))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
              )}
              {activeTab === 'Content Factory' && (
                <>
                  <PillarListManager identity={identity} pillarsList={pillarsList} setPillarsList={setPillarsList} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <IdeaGenerator pillarsList={pillarsList} onGenerateIdeas={(pillar, count) => openChatWithPrompt(buildPromptForContentIdeas(pillar, count))} />
                  <ContentIdeasList identity={identity} pillarsList={pillarsList} contentIdeas={contentIdeas} setContentIdeas={setContentIdeas} onGenerateScript={(idea) => openChatWithPrompt(buildPromptForScript(identity, idea))} onSave={() => exportToSheet('content')} isSaving={isExporting} />
                </>
              )}
            </section>
          </main>
          <footer className="mt-6 text-center text-xs text-gray-400"> Made with care • Simple & minimal UI • Responsive </footer>
        </div>
      </div>
    </>
  );
}