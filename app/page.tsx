"use client";
import React, { useEffect, useState, useRef, memo } from "react";
import Image from "next/image";
import { LogOut, Download, Trash2, RefreshCcw, FileSpreadsheet, LucideBookOpenText, Info, PlusCircle, ChevronLeft, ChevronRight, Upload, SaveIcon, Bot, FileText } from "lucide-react";
import LazyYoutube from "@/components/LazyYoutube";

// ▼▼▼ TYPES & CONSTANTS (Tidak berubah) ▼▼▼
type Identity = { nama: string; suka: string; dikuasai: string; kenapaDibutuhkan: string; peluangPenghasilan: string; };
type SWOT = { niche: string; kategori: string; microNiche: string; akunSosmed: string; kelebihan: string; kelemahan: string; peluang: string; tantangan: string; };
type Pillar = { premis: string; toneOfVoice: string; targetAudiens: string; };
type ContentIdea = { id: number; title: string; deadline: string; status: string; script: string; platform: string; pillar: string; format: string;};
const STORAGE_KEY = "pb_access_key";
const VALID_KEY = "demo_key";
const btnPrimary = 'px-3 py-2 bg-[#005bff] font-bold text-white rounded-lg flex items-center gap-1 text-sm transition transform hover:scale-[1.03] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 cursor-pointer';
const btnNeutral = 'px-3 py-2 bg-white font-bold text-black rounded-lg flex items-center gap-1 text-sm transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 cursor-pointer';
// ▲▲▲ END OF TYPES & CONSTANTS ▲▲▲

// ▼▼▼ REUSABLE COMPONENTS ▼▼▼
const Input = memo(({ label, value, onChange, placeholder, rows = 1 }: { label?: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; }) => {
  return (
    <label className="block text-sm">
      {label && <div className="text-xs text-white mb-1">{label}</div>}
      {rows > 1 ? (
        <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border rounded px-3 py-2 text-sm resize-none bg-white focus:outline-none focus:ring-2 dark:text-black focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 dark:text-black focus:ring-slate-300 transition-shadow duration-150" />
      )}
    </label>
  );
});

const LoginScreen = ({ onLogin, accessKey, setAccessKey }: {
  onLogin: (e: React.FormEvent) => void;
  accessKey: string;
  setAccessKey: (key: string) => void;
  onUseDemoKey: () => void;
}) => (
  <div className="relative flex items-center justify-center p-6 bg-gradient-to-b from-[#000000] via-[#000000] to-[#00498b] min-h-screen">
    <Image src="/kadev-logomark.webp" alt="Logo" width={100} height={50} className="absolute top-10 mx-auto" />
    <div className="w-full max-w-xl px-6 flex justify-center items-center flex-col">
      <Image src="/logo-pbbv2.webp" alt="Logo Personal Branding Builder v2" width={480} height={240} className="mb-6" priority />
      <div className="flex items-center mb-5 text-white text-3xl md:text-4xl font-bold" style={{textShadow: "0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.5)"}}>ACCESS KEY</div>
      <form onSubmit={onLogin} className="w-full space-y-3">
        <div className="w-full">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" zoomAndPan="magnify" viewBox="0 0 22.5 28.5" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="a747d21c9a"><path d="M 3 9 L 14 9 L 14 26 L 3 26 Z M 3 9 " clip-rule="nonzero"/></clipPath><clipPath id="bf7c8b2ec1"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="e13639702a"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="c2f24ca340"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="0e0e9c8ea5"><path d="M 4 22 L 10 22 L 10 27.945312 L 4 27.945312 Z M 4 22 " clip-rule="nonzero"/></clipPath><clipPath id="2df283ed8c"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="cef54e0750"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="812c27ac77"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="de09ee95b9"><path d="M 6 18 L 12 18 L 12 24 L 6 24 Z M 6 18 " clip-rule="nonzero"/></clipPath><clipPath id="db4dfe6231"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="09edbcc98e"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="dd7026bb5e"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="99ba2a4d5b"><path d="M 9 2 L 20 2 L 20 13 L 9 13 Z M 9 2 " clip-rule="nonzero"/></clipPath><clipPath id="a80c4e848e"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="9d3d4da78b"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath><clipPath id="437b0b0983"><path d="M 0.00390625 22.699219 L 12.28125 0.144531 L 21.304688 5.054688 L 9.023438 27.609375 Z M 0.00390625 22.699219 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#a747d21c9a)"><g clip-path="url(#bf7c8b2ec1)"><g clip-path="url(#e13639702a)"><g clip-path="url(#c2f24ca340)"><path fill="#000000" d="M 3.382812 24.496094 L 11.304688 9.945312 L 13.882812 11.347656 L 5.960938 25.898438 Z M 3.382812 24.496094 " fill-opacity="1" fill-rule="evenodd"/></g></g></g></g><g clip-path="url(#0e0e9c8ea5)"><g clip-path="url(#2df283ed8c)"><g clip-path="url(#cef54e0750)"><g clip-path="url(#812c27ac77)"><path fill="#000000" d="M 4.671875 25.195312 L 6.113281 22.550781 L 9.710938 24.511719 L 8.269531 27.15625 Z M 4.671875 25.195312 " fill-opacity="1" fill-rule="evenodd"/></g></g></g></g><g clip-path="url(#de09ee95b9)"><g clip-path="url(#db4dfe6231)"><g clip-path="url(#09edbcc98e)"><g clip-path="url(#dd7026bb5e)"><path fill="#000000" d="M 6.832031 21.230469 L 8.273438 18.582031 L 11.871094 20.542969 L 10.429688 23.1875 Z M 6.832031 21.230469 " fill-opacity="1" fill-rule="evenodd"/></g></g></g></g><g clip-path="url(#99ba2a4d5b)"><g clip-path="url(#a80c4e848e)"><g clip-path="url(#9d3d4da78b)"><g clip-path="url(#437b0b0983)"><path fill="#000000" d="M 12.3125 6.203125 C 11.714844 7.300781 12.097656 8.660156 13.164062 9.242188 C 14.230469 9.820312 15.582031 9.40625 16.175781 8.308594 C 16.773438 7.210938 16.390625 5.851562 15.324219 5.273438 C 14.257812 4.691406 12.90625 5.109375 12.3125 6.203125 Z M 11.722656 11.886719 C 9.230469 10.53125 8.339844 7.355469 9.734375 4.800781 C 11.125 2.242188 14.273438 1.269531 16.765625 2.625 C 19.253906 3.980469 20.148438 7.15625 18.753906 9.710938 C 17.363281 12.269531 14.214844 13.242188 11.722656 11.886719 Z M 11.722656 11.886719 " fill-opacity="1" fill-rule="evenodd"/></g></g></g></g></svg>
            <input
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Ketik access key di sini!"
              className="w-full border bg-white pl-10 dark:text-black p-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow duration-150"
            />
          </div>
          <div className="flex justify-between items-center text-sm my-3 md:my-5 px-3 md:px-5">
            <label className="flex items-center gap-1 md:gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3 md:h-4 w-3 md:w-4 text-slate-900 border-gray-300 dark:text-black rounded focus:ring-slate-500"
              />
              <span className="text-white text-xs md:text-sm">Remember me</span>
            </label>
            <a href="#" className="text-white text-xs md:text-[15px] hover:text-slate-400 italic transition-colors duration-150">
              Lupa access key?
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-3 bg-[#005bff] text-white rounded-full transition transform hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150">Log in</button>
        </div>
      </form>
      <div className="flex gap-0 mt-4 flex-col items-center justify-center text-white text-xs md:text-sm">
        <p>Ga dapet Access Key?</p>
        <a href="#" className="text-yellow-300 hover:text-yellow-500 underline text-xs md:text-sm underline-offset-2">Hubungi Admin di sini</a>
      </div>
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
  const SPREADSHEET_TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/1ydFWlx5Vb2lWfUzQRfEHDNIzmBWC_n8DE9fD3-u-WaA/copy";

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
      <div className="bg-gradient-to-b from-[#000000] via-[#000000] to-[#00498b] rounded-lg shadow-xl w-full max-w-lg px-6 py-4 max-h-[90vh] overflow-y-auto">
        <div className="relative flex items-center justify-center mb-2">
          <Image src="/logo-pbbv2.webp" alt="Logo Personal Branding Builder v2" width={120} height={60} className="mb-1 mx-auto" priority />
          <button onClick={onClose} className="absolute top-0 right-0 text-white hover:text-gray-300 text-2xl leading-none cursor-pointer">
            &times;
          </button>
        </div>
        <div className="flex justify-center mb-5 text-white text-3xl md:text-4xl font-bold border-b pb-3 border-gray-400" style={{textShadow: "0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.5)"}}>SETUP PBB V2</div>
        
        <div className="text-xs text-white text-justify">
            <p className="font-bold mb-1">Langkah 1:</p>
            <p>Klik link di bawah ini, untuk membuat salinan Template Spreadsheet PBB agar tersimpan di Google Drive kamu <b>(Skip langkah ini kalau sudah memiliki file Spreadsheet PBB)</b></p>
        </div>
        <a 
            href={SPREADSHEET_TEMPLATE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex w-full text-center font-bold items-center justify-center my-4 gap-1.5 text-xs px-4 py-2 bg-[#005bff] text-white rounded-lg transition transform hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"
        > 
            <svg xmlns="http://www.w3.org/2000/svg" width="17" zoomAndPan="magnify" viewBox="0 0 26.25 26.249998" height="17" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="a2831d7587"><path d="M 0 0 L 25.519531 0 L 25.519531 25.519531 L 0 25.519531 Z M 0 0 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#a2831d7587)"><path fill="#fdfdfd" d="M 12.6875 0 C 5.667969 0 0 5.667969 0 12.6875 C 0 19.707031 5.667969 25.371094 12.6875 25.371094 C 19.707031 25.371094 25.371094 19.707031 25.371094 12.6875 C 25.371094 5.667969 19.707031 0 12.6875 0 Z M 18.746094 7.300781 L 16.152344 7.300781 L 16.152344 4.734375 Z M 8.65625 4.679688 C 8.65625 4.539062 8.769531 4.425781 8.910156 4.425781 L 15.054688 4.425781 L 15.054688 7.667969 L 14.292969 6.90625 C 13.757812 6.371094 13.503906 6.175781 12.910156 6.175781 L 8.65625 6.175781 Z M 16.070312 10.007812 L 13.503906 10.007812 L 13.503906 7.414062 Z M 6.203125 20.296875 C 6.0625 20.296875 5.949219 20.183594 5.949219 20.042969 L 5.949219 7.359375 C 5.949219 7.21875 6.0625 7.105469 6.203125 7.105469 L 12.375 7.105469 L 12.375 10.542969 C 12.375 10.855469 12.628906 11.078125 12.941406 11.078125 L 16.378906 11.078125 L 16.378906 20.042969 C 16.378906 20.183594 16.265625 20.296875 16.125 20.296875 Z M 18.804688 17.621094 C 17.929688 17.621094 17.308594 17.621094 17.308594 17.621094 L 17.308594 10.542969 C 17.308594 10.066406 17.167969 9.78125 16.832031 9.445312 L 15.789062 8.402344 L 19.03125 8.402344 L 19.03125 17.339844 C 19.058594 17.507812 18.945312 17.621094 18.804688 17.621094 Z M 18.804688 17.621094 " fill-opacity="1" fill-rule="nonzero"/></g></svg> 
            Salin Template
        </a>

        <div className="text-xs text-white text-justify">
            <p className="font-bold mb-1">Langkah 2:</p>
            <p>Salin Link Spreadsheet PBB Kamu dan tempel di bawah ini.</p>
        </div>
        <input 
            value={localId} 
            onChange={(e) => setLocalId(e.target.value)} 
            placeholder="Tempel Link Spreadsheet PBB di sini!" 
            className="w-full border bg-white dark:text-black px-3 py-2 my-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow duration-150" 
        />

        <div className="mt-1 mb-5 flex justify-start gap-3">
            <button onClick={handleSave} className={btnPrimary}><SaveIcon className="w-4 h-4 -mt-0.5" /> Simpan Perubahan</button>
            <button onClick={onClose} className={btnNeutral}>Batal</button>
        </div>

        <div className="text-xs text-white text-justify">
            <p className="font-bold mb-1">Langkah 3:</p>
            <p>Nonton video tutorial lengkap penggunaan, di bawah ini:</p>
        </div>

        <div className="aspect-video w-full mx-auto my-4">
            <LazyYoutube
              videoId="NBh1t1gGID0"
              title="Video Clip Personal Branding Builder"
              ratio="16:9"
            />
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
  const menuItems = ['Start from 0', 'Niche Finder', 'Storytelling Builder', 'Smart Pillar', 'Bio Generator', 'Content Factory', 'Personal Branding Planner'];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150; // px per klik
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-5">
      <div className="relative flex items-center px-7">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 p-1 bg-black/40 hover:bg-black/70 rounded-full text-white"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
  
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden h-fit [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1"
        >
          <nav className="flex space-x-2 py-2" aria-label="Tabs">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`
                  whitespace-nowrap py-2 px-4 text-sm cursor-pointer rounded-lg
                  transition-colors duration-150 focus:outline-none text-white font-bold
                  ${
                    activeTab === item
                      ? "bg-[#005bff]"
                      : "border-transparent hover:text-[#a6c3f7]"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
  
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 p-1 bg-black/40 hover:bg-black/70 rounded-full text-white"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );  
};
// ▲▲▲ END ▲▲▲

// ▼▼▼ FEATURE COMPONENTS ▼▼▼
const IdentitySection = memo(({ identity, setIdentity, onGenerate, onSave, isSaving }: {
  identity: Identity; setIdentity: (i: Identity) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean;
}) => (
  <div>
    <div className="space-y-2">
      <Input label="Nama" value={identity.nama} onChange={(v) => setIdentity({ ...identity, nama: v })} placeholder="Nama kamu" rows={2} />
      <Input label="Hal yang kamu suka" value={identity.suka} onChange={(v) => setIdentity({ ...identity, suka: v })} placeholder="Contoh: Suka ngomong didepan orang banyak" rows={2} />
      <Input label="Hal yang kamu bisa" value={identity.dikuasai} onChange={(v) => setIdentity({ ...identity, dikuasai: v })} placeholder="Contoh: Public speaking" rows={2} />
      <Input label="Kenapa dibutuhkan?" value={identity.kenapaDibutuhkan} onChange={(v) => setIdentity({ ...identity, kenapaDibutuhkan: v })} placeholder="Contoh: Orang-orang butuh komukasi dengan benar apalagi ngomong nya didepan banyak orang" rows={3} />
      <Input label="Peluang penghasilan" value={identity.peluangPenghasilan} onChange={(v) => setIdentity({ ...identity, peluangPenghasilan: v })} placeholder="[Opsional] bisa dikosongin bila belum tau" rows={2} />
      <div className="flex gap-2 mt-4">
        <button onClick={onGenerate} className={btnPrimary}> <Bot className="w-5 h-5 -mt-0.5" /> Generate </button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}><SaveIcon className="w-4 h-4 -mt-0.5" /> {isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </div>
  </div>
));

const SwotSection = memo(({ swot, setSwot, onGenerate, onSave, isSaving }: {
  swot: SWOT; setSwot: (s: SWOT) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean;
}) => (
  <div>
    <div className="space-y-2">
      <Input label="Niche" value={swot.niche} onChange={(v) => setSwot({ ...swot, niche: v })} />
      <Input label="Kategori" value={swot.kategori} onChange={(v) => setSwot({ ...swot, kategori: v })} />
      <Input label="Micro-niche" value={swot.microNiche} onChange={(v) => setSwot({ ...swot, microNiche: v })} />
      <Input label="Nama Profile Sosmed" value={swot.akunSosmed} onChange={(v) => setSwot({ ...swot, akunSosmed: v })} />
      <Input label="Kelebihan" value={swot.kelebihan} onChange={(v) => setSwot({ ...swot, kelebihan: v })} />
      <Input label="Kelemahan" value={swot.kelemahan} onChange={(v) => setSwot({ ...swot, kelemahan: v })} />
      <Input label="Peluang" value={swot.peluang} onChange={(v) => setSwot({ ...swot, peluang: v })} />
      <Input label="Tantangan" value={swot.tantangan} onChange={(v) => setSwot({ ...swot, tantangan: v })} />
      <div className="flex gap-2 mt-4">
        <button onClick={onGenerate} className={btnPrimary}><Bot className="w-5 h-5 -mt-0.5" /> Generate</button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}><SaveIcon className="w-4 h-4 -mt-0.5" /> {isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </div>
  </div>
));

const PillarSection = memo(({ pillar, setPillar, onGenerate, onSave, isSaving }: {
  pillar: Pillar; setPillar: (p: Pillar) => void; onGenerate: () => void; onSave: () => void; isSaving: boolean;
}) => (
  <>
    <div className="space-y-2">
      <Input label="Premis" value={pillar.premis} onChange={(v) => setPillar({ ...pillar, premis: v })} rows={3} />
      <label className="text-xs text-white mb-2">Tone of Voice</label>
      <div className="relative mb-4">
        <select
          className="w-full border px-3 pr-8 py-2 rounded text-sm dark:text-black appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
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
      <Input label="Target audiens" value={pillar.targetAudiens} onChange={(v) => setPillar({ ...pillar, targetAudiens: v })} placeholder="Contoh: Gen-Z, Mahasiswa, Mama muda, Editor pemula, Pembelajar bahasa Inggris, dsb." />
      <div className="flex gap-2 mt-4">
        <button onClick={onGenerate} className={btnPrimary}><Bot className="w-5 h-5 -mt-0.5" /> Generate </button>
        <button type="button" onClick={onSave} disabled={isSaving} className={btnNeutral}><SaveIcon className="w-4 h-4 -mt-0.5" /> {isSaving ? "Menyimpan..." : "Simpan"}</button>
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
      <label className="text-sm font-bold text-white">{`List Pillar ${identity.nama} (max.6)`}</label>
      <div className="mt-2 flex flex-col md:flex-row gap-2">
        <input 
          value={tagInputValue} 
          onChange={(e) => setTagInputValue(e.target.value)} 
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPillarTagFromInput(); } }} 
          placeholder="Tulis lalu tekan Enter untuk menambahkan pillar baru" 
          className="w-full bg-white dark:text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
        />
        <div className="flex gap-2 w-full md:w-fit mt-1 md:mt-0">
          <button onClick={addPillarTagFromInput} className={`w-full md:w-fit justify-center ${btnPrimary}`}><PlusCircle className="w-4 h-4" />Tambah</button>
          <button type="button" onClick={onSave} disabled={isSaving} className={`w-full md:w-fit justify-center ${btnNeutral}`}><SaveIcon className="w-4 h-4 -mt-0.5" /> {isSaving ? "Menyimpan..." : "Simpan"}</button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {pillarsList.map((p, i) => (
          <div key={"grid" + i} className="bg-white rounded p-2 text-sm min-h-fit flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150">
            <input 
              value={p} 
              onChange={(e) => updatePillarAt(i, e.target.value)} 
              className="bg-transparent text-sm dark:text-black outline-none w-full" 
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
    <div className="flex flex-col gap-2 w-full mb-3">
      <div className="flex my-2 gap-2">
        <button onClick={onGenerate} className={`w-fit ${btnPrimary}`}>
        <Bot className="w-5 h-5 -mt-0.5" /> Generate
        </button>
        <button type="button" onClick={onSave} disabled={isSaving} className={`w-fit ${btnNeutral}`}><SaveIcon className="w-4 h-4 -mt-0.5" /> {isSaving ? "Menyimpan..." : "Simpan"}</button>
      </div>
      <div className="w-full">
      <p className="text-xs text-white mb-2">Hasil generate akan didasarkan pada data Niche, Storytelling, dan Pillar yang telah diisi.</p>
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
    <>
      <div className="relative mt-2">
        <select 
          value={selectedPillar} 
          onChange={(e) => setSelectedPillar(e.target.value)} 
          className="w-full border px-3 pr-8 py-2 rounded text-sm appearance-none bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
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
      <div className="mt-3 flex gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-xs text-white mb-1">Jumlah ide</label>
          <input 
            type="number" 
            min={1} max={50} 
            value={numIdeas} 
            onChange={(e) => setNumIdeas(Number(e.target.value))} 
            className="w-[4.3rem] bg-white dark:text-black border px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" 
          />
        </div>
        <button 
          onClick={() => { if (!selectedPillar) return alert("Pilih pilar dulu"); onGenerateIdeas(selectedPillar, numIdeas); }} 
          className={`${btnPrimary}`}
          disabled={!selectedPillar}
        >
          <Bot className="w-5 h-5 -mt-0.5" /> Generate
        </button>
      </div>
    </>
  );
});

const ContentIdeasList = memo(({ identity, contentIdeas, pillarsList, setContentIdeas, onGenerateScript, onGenerateEval, onSave, isSaving }: {
  identity: Identity;
  contentIdeas: ContentIdea[];
  setContentIdeas: React.Dispatch<React.SetStateAction<ContentIdea[]>>;
  onGenerateScript: (idea: ContentIdea) => void;
  onGenerateEval: (idea: ContentIdea) => void;
  pillarsList: string[];
  onSave: () => void; isSaving: boolean;
}) => {
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [selectedEvalIdea, setSelectedEvalIdea] = useState<ContentIdea | null>(null);

  const addIdea = () => {
    if (!newIdeaTitle.trim()) return;
    const newIdea: ContentIdea = {
      id: Date.now() + Math.random(),
      title: newIdeaTitle.trim(),
      deadline: "",
      status: "Idea",
      script: "Hook: \n\nIsi Konten: \n\nCall to Action: \n\nCaption:",
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

  const handleOpenDetailModal = (idea: ContentIdea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };
  
  const handleOpenEvalModal = (idea: ContentIdea) => {
    setSelectedEvalIdea(idea);
    setIsEvalModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIdea(null);
  };
  
  const handleCloseEvalModal = () => {
    setIsEvalModalOpen(false);
    setSelectedEvalIdea(null);
  };

  return (
    <>
      <label className="text-sm mb-3 text-white">List Konten <b><i>{`${identity.nama}`}</i></b></label>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input type="text" placeholder="Judul ide konten" value={newIdeaTitle} onChange={(e) => setNewIdeaTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIdea(); }}} className="flex-1 bg-white dark:text-black border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
        <div className="flex gap-2 w-full md:w-fit mt-1 md:mt-0">
          <button onClick={addIdea} className={`w-full md:w-fit justify-center ${btnPrimary}`}><PlusCircle className="w-4 h-4" />Tambah</button>
          <button type="button" onClick={onSave} disabled={isSaving} className={`w-full md:w-fit justify-center ${btnNeutral}`}><SaveIcon className="w-4 h-4 -mt-0.5" /> {isSaving ? "Menyimpan..." : "Simpan"}</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="hidden md:table-header-group dark:text-black bg-gray-100">
            <tr>
              <th className="border p-2">Judul Ide</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Status</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {contentIdeas.length === 0 ? (
              <tr className="block md:table-row"><td colSpan={4} className="block md:table-cell text-center text-white/50 py-4">Belum ada ide konten</td></tr>
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
                className="block bg-white/80 md:table-row mb-4 md:mb-0 border md:border-none rounded-lg md:rounded-none"
              >
                <td
                  data-label="Judul:"
                  className="p-2 block md:table-cell dark:text-black border-b md:border relative"
                >
                  <span className="md:hidden font-bold mr-2">Judul:</span>
                  {idea.title}
                </td>
          
                <td
                  data-label="Deadline:"
                  className="p-2 block md:table-cell border-b dark:text-black md:border text-right md:text-center relative"
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
                  className="p-2 block md:table-cell border-b md:border dark:text-black text-right md:text-center relative"
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
                  className="p-2 border-0 md:border block dark:text-black md:table-cell text-right md:text-center relative"
                >
                  <span className="md:hidden font-bold float-left mt-1">Aksi:</span>
                  <div className="flex justify-end md:justify-center items-center gap-1">
                    <button
                      onClick={() => handleOpenDetailModal(idea)}
                      className="text-blue-600 hover:text-blue-800 py-1 px-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 flex items-center gap-1 cursor-pointer"
                      title="Lihat Detail & Script"
                    >
                      <FileText className="w-3 h-3" /> Detail
                    </button>
                    <button
                      onClick={() => handleOpenEvalModal(idea)}
                      className="text-yellow-600 hover:text-yellow-800 py-1 px-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 flex items-center gap-1 cursor-pointer"
                      title="Lihat Detail & Script"
                    >
                      <LucideBookOpenText className="w-3 h-3" /> Evaluasi
                    </button>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="text-red-500 hover:text-red-700 py-1 px-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 flex gap-1 items-center cursor-pointer"
                      title="Hapus Konten"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
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
          onGenerateEval={onGenerateEval} // opsional kalau masih dipakai di detail
          pillarsList={pillarsList}
        />
      )}

      {isEvalModalOpen && selectedEvalIdea && (
        <ContentEvalModal
          isOpen={isEvalModalOpen}
          onClose={handleCloseEvalModal}
          ideaData={selectedEvalIdea}
          onGenerateEval={onGenerateEval}
        />
      )}
    </>
  );
});
const ContentDetailModal = memo(({ isOpen, onClose, ideaData, onUpdate, onGenerateScript, onGenerateEval, pillarsList }: {
  isOpen: boolean;
  onClose: () => void;
  ideaData: ContentIdea;
  onUpdate: (updatedIdea: ContentIdea) => void;
  onGenerateScript: (idea: ContentIdea) => void;
  onGenerateEval: (idea: ContentIdea) => void;
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
      <div className="relative bg-gradient-to-b from-[#000000] via-[#000000] to-[#00498b] rounded-lg shadow-xl w-full max-w-2xl p-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center mt-2 mb-4">
          <Image src="/logo-pbbv2.webp" alt="Logo Personal Branding Builder v2" width={120} height={60} className="mb-1 mx-auto" priority />
        </div>
        <button onClick={onClose} className="absolute top-3 right-4 text-white hover:text-gray-300 text-2xl leading-none cursor-pointer">
          &times;
        </button>
        <div className="flex justify-center mb-5 text-white text-3xl md:text-4xl font-bold border-b pb-3 border-white/20" style={{textShadow: "0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.5)"}}>DETAIL KONTEN</div>
        
        <main className="p-4 space-y-4 mb-2 overflow-y-scroll">
          <div>
            <label className="text-xs text-white mb-1 block">Judul Konten</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-white dark:text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white mb-1 block">Status</label>
              <div className="relative">
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-white dark:text-black rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150">
                  {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-xs text-white mb-1 block">Pilar Konten</label>
              <div className="relative">
                <select 
                  name="pillar" 
                  value={formData.pillar || ""} 
                  onChange={handleChange} 
                  className="w-full bg-white rounded-lg px-3 py-2 text-sm dark:text-black appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
                  disabled={filteredPillars.length === 0}
                >
                  <option value="">-- Pilih Pilar --</option>
                  {filteredPillars.map((p, i) => (
                    <option key={`modal-pillar-opt-${i}`} value={p}>{p}</option>
                  ))}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-white mb-1 block">Tanggal Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-white dark:text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150" />
            </div>
            <div>
              <label className="text-xs text-white mb-1 block">Platform</label>
              <div className="relative">
                <select name="platform" value={formData.platform} onChange={handleChange} className="w-full bg-white rounded-lg px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 dark:text-black transition-shadow duration-150">
                  <option value="">-- Pilih Platform --</option>
                  {platforms.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-xs text-white mb-1 block">Format Konten</label>
              <div className="relative">
                <select 
                  name="format" 
                  value={formData.format || ""} 
                  onChange={handleChange} 
                  className="w-full bg-white rounded-lg px-3 py-2 text-sm dark:text-black appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 transition-shadow duration-150"
                >
                  <option value="">-- Pilih Format --</option>
                  {formats.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => onGenerateScript(formData)} className={`w-full mt-5 mb-4 justify-center ${btnPrimary}`}>
              <Bot className="w-5 h-5 -mt-0.5" /> Generate Script
            </button>
            <label className="text-xs text-white mb-1 block">Script Konten bisa di isi sendiri, atau copy dari hasil script yang sudah di generate AI.</label>
            <textarea name="script" value={formData.script} onChange={handleChange} rows={8} placeholder="Tulis script konten di sini..." className="w-full bg-white rounded-lg px-3 py-2 text-sm resize-y dark:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150" />
          </div>
        </main>
        
        <footer className="pb-4 pt-6 px-6 border-t border-white/50 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-2">
            <button onClick={handleSaveChanges} className={btnPrimary}><SaveIcon className="w-4 h-4" /> Simpan Perubahan</button>
            <button onClick={onClose} className={btnNeutral}>Batal</button>
          </div>
        </footer>
      </div>
    </div>
  );
});
const ContentEvalModal = memo(({ isOpen, onClose, ideaData, onGenerateEval }: {
  isOpen: boolean;
  onClose: () => void;
  ideaData: ContentIdea;
  onGenerateEval: (idea: ContentIdea) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative bg-gradient-to-b from-[#000000] via-[#000000] to-[#00498b] rounded-lg shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        
        <div className="relative flex items-center justify-center mt-2 mb-4">
          <Image src="/logo-pbbv2.webp" alt="Logo Personal Branding Builder v2" width={120} height={60} className="mb-1 mx-auto" priority />
        </div>
        <button onClick={onClose} className="absolute top-3 right-4 text-white hover:text-gray-300 text-2xl leading-none cursor-pointer">
          &times;
        </button>
        <div className="flex justify-center mb-5 text-white text-3xl md:text-4xl font-bold border-b pb-3 border-white/20" style={{textShadow: "0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.5)"}}>EVALUASI KONTEN</div>

        <main className="space-y-4 text-white">
          <p className="text-sm">
            Evaluasi untuk konten: <span className="font-bold">{ideaData.title}</span>
          </p>
          <button
            onClick={() => onGenerateEval(ideaData)}
            className={`w-full justify-center ${btnPrimary}`}
          >
            <Bot className="w-5 h-5 -mt-0.5" /> Generate Evaluasi
          </button>
          <p className="text-xs max-w-md text-center mx-auto text-white/80 mt-2">
            Disarankan melakukan evaluasi <strong>7 hari setelah posting</strong> dan upload screenshot insight konten sebelum submit prompt ke ChatGPT.
          </p>
        </main>
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
  const emptySwot: SWOT = { niche: "", kategori: "", microNiche: "", akunSosmed: "", kelebihan: "", kelemahan: "", peluang: "", tantangan: "" };
  const emptyPillar: Pillar = { premis: "", toneOfVoice: "", targetAudiens: "" };
  const [identity, setIdentity] = useState<Identity>(emptyIdentity);
  const [swot, setSwot] = useState<SWOT>(emptySwot);
  const [pillar, setPillar] = useState<Pillar>(emptyPillar);
  const [pillarsList, setPillarsList] = useState<string[]>(["", "", "", "", "", ""]);
  const [bioResult, setBioResult] = useState("");
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [activeTab, setActiveTab] = useState("Start from 0");
  const [isSpreadsheetModalOpen, setIsSpreadsheetModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<string | null>(null);

  // ▼▼▼ LOCAL STORAGE & AUTH EFFECT ▼▼▼ //
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
  // ▲▲▲ END ▲▲▲ //

  // ▼▼▼ POPUP MODAL SHEET ID ▼▼▼ //
  useEffect(() => {
    if (isLoggedIn && !spreadsheetId) {
      setIsSpreadsheetModalOpen(true);
    }
  }, [isLoggedIn, spreadsheetId]);
  // ▲▲▲ END ▲▲▲ //

  // ▼▼▼ POPUP MODAL INFO ▼▼▼ //
  const openInfoModal = (type: string) => setInfoModal(type);
  const closeInfoModal = () => setInfoModal(null);

  const InfoModal = ({ type, onClose }: { type: string; onClose: () => void }) => {
    const infoContent: Record<string, string> = {
      niche: "Bantu kamu menemukan niche personal branding yang paling sesuai dengan minat, keahlian, dan peluang pasar.",
      storytelling: "Memudahkanmu merangkai cerita personal agar audiens merasa relate dan engage.",
      pillar: "Bantu kamu menemukan pilar konten strategis agar kontenmu konsisten, terarah, dan berhubungan dengan niche.",
      bio: "Bantu kamu menulis bio media sosial yang ringkas, menarik, dan kuat membangun personal branding.",
      contentFactory: "Hasilkan ide konten sesuai pilar dan kebutuhanmu agar nggak kehabisan bahan posting.",
      planner: "Bantu kamu mengelola ide, script, dan evaluasi konten dalam satu tempat.",
    };
  
    return (
      <div className="fixed inset-0 dark:text-black bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full pt-5 pb-6 px-6 relative">
          <button
            onClick={onClose}
            className="absolute top-1 cursor-pointer right-3 text-gray-600 hover:text-black text-xl"
          >
            &times;
          </button>
          <h2 className="text-lg font-bold mb-2">Tentang Fitur</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {infoContent[type]}
          </p>
        </div>
      </div>
    );
  };
  // ▲▲▲ END ▲▲▲ //

  // ▼▼▼ DATA & AUTH FUNCTIONS ▼▼▼ //
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
    setPillarsList(["", "", "", "", "", ""]);
    setContentIdeas([]);
    setBioResult("");
    setContentIdeas([]);
  }
  // ▲▲▲ END ▲▲▲ //

  // ▼▼▼ PROMPT & GENERATION FUNCTIONS ▼▼▼ //
  const buildPromptForNiche = (data: Identity) => `[ROLE SETUP]
Kamu adalah seorang Ikigai Strategist & Personal Branding Coach yang ahli membantu orang menemukan niche otentik berdasarkan empat elemen utama Ikigai.
Gunakan bahasa yang ramah, jelas, inspiratif, dan actionable.
Jawaban harus terstruktur, praktis, dan relevan agar mudah dipahami serta langsung bisa dipakai untuk membangun personal branding.

[CONTEXT INPUT]
Nama saya: ${data.nama}
Saya ingin menemukan niche terbaik yang sesuai dengan Ikigai saya agar bisa membangun personal branding yang otentik dan berkelanjutan. Berikut adalah input Ikigai saya:
- What I Love (Apa yang saya cintai): ${data.suka}
- What I’m Good At (Apa yang saya kuasai): ${data.dikuasai}
- What The World Needs (Apa yang dibutuhkan dunia): ${data.kenapaDibutuhkan}
- What I Can Be Paid For (Apa yang bisa menghasilkan uang untuk saya): ${data.peluangPenghasilan && data.peluangPenghasilan.trim() !== "" ? data.peluangPenghasilan  : "Tolong bantu menemukan peluang monetisasinya"}

[TASK OUTPUT]
Berdasarkan data di atas, tolong bantu saya:
1. Menemukan benang merah yang menghubungkan keempat elemen Ikigai.
2. Memberikan beberapa rekomendasi niche spesifik (lengkap dengan kategori & micro-niche).
3. Menjelaskan kenapa niche tersebut cocok untuk saya dalam jangka panjang.
4. Menyebutkan contoh peluang monetisasi nyata dari niche tersebut.
5. Memberikan 10 pilihan variasi nama niche yang mudah di ingat (maksimal 2 kata, familiar, tidak annoying) dan rekomendasi nama profil sosial media → format: ${data.nama} | [NICHE].
Tambahan:
Pastikan setiap rekomendasi niche sudah jelas kategori → niche → micro-niche.
Gunakan gaya bahasa yang sederhana, agar mudah dipahami audiens.
Buat agar hasilnya unik & membedakan saya dari kreator lain.

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Apakah hasil ini sudah sesuai dengan gambaran diri kamu, atau mau eksplor lebih dalam sampai benar-benar ketemu niche yang paling relevan? kalau mau, tuliskan lebih detail tentang dirimu”`;

  const buildPromptForPremis = (data: SWOT) => `[ROLE SETUP]
Kamu adalah seorang Personal Branding Strategist yang ahli merumuskan premis personal branding menggunakan metode SWOT dengan bahasa yang sederhana, emosional, dan relatable untuk audiens.
Jawaban harus mudah dipahami, inspiratif, dan bisa langsung dipakai dalam komunikasi personal branding.

[CONTEXT INPUT]
Nama akun dan niche saya: ${data.niche}
Kategori niche: ${data.kategori}
Spesifik pembahasan (Micro-niche): ${data.microNiche}
Analisis SWOT sederhana saya adalah sebagai berikut:
Kelebihan (Strength): ${data.kelebihan}
Kelemahan (Weakness): ${data.kelemahan}
Peluang (Opportunity): ${data.peluang}
Ancaman (Threat): ${data.tantangan}

[TASK OUTPUT]
Berdasarkan data di atas, tolong bantu saya:
 Membuat premis personal branding dalam format storytelling sederhana.
Format 1:
"Dari [Kelemahan], akhirnya [Kelebihan], dan kini [Peluang]."
Format 2:
"Dari [Ancaman] menjadi [Kelebihan], saya percaya bahwa [Peluang], dan saya ingin [Peluang]."
Dan buat format lain-lainnya yang relevan dan menarik agar tidak monoton.
 Pastikan premis:
Menarik dan mudah dipahami audiens.
Menggugah emosi agar audiens merasa relate dengan perjalanan saya.
Mengandung benang merah yang kuat antara kelemahan → kelebihan → peluang/visi.
 Buatkan 5 variasi premis personal branding (gunakan gaya bahasa berbeda tapi tetap sesuai format & konteks).

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Apakah salah satu premis ini sudah terasa cocok mewakili perjalanan kamu, atau mau saya bantu kembangkan lagi sampai benar-benar pas?”`;

  const buildPromptForPillars = (data: Pillar, swotData: SWOT) => `[ROLE SETUP]
Kamu adalah seorang Content Strategist & Personal Branding Coach yang ahli dalam menyusun content pillar strategis untuk membangun otoritas dan memperkuat personal branding di media sosial.
Gunakan bahasa yang jelas, inspiratif, praktis, dan relevan dengan tren sosial media terkini.

[CONTEXT INPUT]
Nama akun: ${swotData.niche}
Kategori niche: ${swotData.kategori}
Fokus utama niche: ${swotData.microNiche}
Tone of voice yang digunakan: ${data.toneOfVoice}
Target audiens: ${data.targetAudiens}
Premis personal branding saya: ${data.premis}

[TASK OUTPUT]
Berdasarkan data di atas, tolong buatkan daftar content pillar yang lengkap, relevan, dan strategis untuk sosial media saya.
1. Buat daftar topik utama yang relevan dengan niche dan bisa dikembangkan jangka panjang.
2. Turunkan menjadi sub-topik yang masih berhubungan dengan topik utama.
3. Susun minimal 5 content pillar utama yang meliputi:
- Educational (Edukasi)
- Entertain (Hiburan)
- Social Proof (Bukti Sosial)
- Personal Story (Cerita Pribadi)
- Promotional (Promosi)
4. Sesuaikan penyebutannya agar tetap terasa nyambung dengan niche & personal branding saya.
5. Tambahkan beberapa content pillar tambahan sebagai referensi alternatif agar saya punya lebih banyak pilihan.
Selain daftar pilar, berikan juga insight tambahan:
- Kenapa content pillar ini penting untuk membangun otoritas di niche tersebut.
- Bagaimana content pillar ini bisa membantu audiens dan menyelesaikan masalah mereka.
Kriteria Output:
 ✔ Tidak dibatasi jumlah tertentu → buat sebanyak mungkin agar bisa dipilih sesuai kebutuhan, namun tetap relevan.
 ✔ Relevan dengan tren industri ${swotData.kategori} dan sesuai target audiens ${data.targetAudiens}.
 ✔ Membantu saya membangun personal branding yang kuat.
Jika ada insight tambahan atau ide pengembangan strategi, silakan tambahkan.

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Apakah daftar content pillar ini sudah cukup sesuai dengan gaya dan tujuan kamu, atau mau saya bantu perbaiki lagi agar lebih tajam dan spesifik ke audiens kamu?”`;

  const buildPromptForBio = (identityData: Identity, swotData: SWOT, pillarData: Pillar) => `[ROLE SETUP]
Kamu adalah seorang top kreator sosial media yang ahli membuat bio profil yang ringkas, menarik, dan strategis untuk membangun personal branding serta menarik audiens yang tepat.
Gunakan gaya bahasa yang simple, relatable, mudah dipahami orang awam, dan emosional.

[CONTEXT INPUT]
Berikut data personal brand saya:
Nama: ${identityData.nama}
Niche: ${swotData.niche}
Premis Utama: ${pillarData.premis}
Target Audiens: ${pillarData.targetAudiens}
USP (dari Kelebihan): ${swotData.kelebihan}
Tone of Voice: ${pillarData.toneOfVoice}

[TASK OUTPUT]
Berdasarkan data di atas, tolong buatkan 10 pilihan bio profil sosial media dengan ketentuan:
 Setiap pilihan bio ditulis dalam 3 baris:
Baris 1: Siapa diri saya (positioning).
Baris 2: Solusi/Value yang saya tawarkan untuk audiens.
Baris 3: CTA untuk klik link di bio.
 Gunakan emoji yang relevan di tiap baris agar tidak monoton.
 Buat dalam bentuk tabel agar mudah dibandingkan.
Kolom 1: Nomor.
Kolom 2: Isi Bio (3 baris).
Kolom 3: Pertimbangan (alasan kenapa bio itu efektif).
 Pastikan bio:
Ringkas, jelas, dan mudah dipahami audiens awam.
Merepresentasikan personal brand secara otentik.
Mendorong audiens untuk klik link di bio.
 Variasikan gaya penulisan agar setiap opsi punya nuansa berbeda, tapi tetap relevan dengan data personal brand saya.

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Dari 10 pilihan bio ini, mana yang paling terasa aku banget nih..’? Kalau belum ada yang pas, mau saya bantu perbaiki dengan fokus ke sisi otoritas, sisi emosional, atau sisi yang funny?”`;

  const buildPromptForContentIdeas = (pillarName: string, jumlah: number, swotData: SWOT, pillarData: Pillar) => `[ROLE SETUP]
Kamu adalah seorang Content Strategist & Top Social Media Creator yang ahli membuat ide konten kreatif, strategis, dan relevan dengan tren terkini untuk membantu membangun personal branding yang kuat.
Gunakan bahasa yang segar, relate, dan langsung bisa dieksekusi.

[CONTEXT INPUT]
Nama akun: ${swotData.niche}
Kategori niche: ${swotData.kategori}
Fokus utama niche: ${swotData.microNiche}
Fokus utama pilar konten: ${pillarName}
Tone of Voice: ${pillarData.toneOfVoice}
Target audiens: ${pillarData.targetAudiens}

[TASK OUTPUT]
Berdasarkan data di atas, buatkan daftar ide konten kreatif, relevan, dan strategis untuk akun sosial media saya.
1. Setiap ide konten harus mencakup:
- Judul ide / hook utama.
- Bentuk/gambaran kontennya seperti apa (misalnya: Reels, carousel, thread, podcast, dll).
- Potensi viralnya (kenapa bisa menarik audiens sekarang).
- Insight tambahan (value atau pesan penting yang ingin ditanamkan).
2. Pastikan daftar ide konten memenuhi kriteria:
✔ Jumlah ide sesuai input ${jumlah} (buat sebanyak itu).
✔ Kreatif, menarik, dan punya potensi viral sesuai tren terkini.
✔ Relevan dengan target audiens dan membantu menyelesaikan masalah/tujuan mereka.
✔ Membantu membangun personal branding yang kuat dan sustainable.
3. Sajikan output dalam bentuk tabel dengan kolom berikut:
- Ide Konten
- Gambaran / Ringkasan Konten
- Insight / Value
4. Tambahkan juga rekomendasi pengembangan konten atau insight tambahan di akhir untuk memperkaya ide konten yang diterima.

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Apakah daftar ide konten ini sudah sesuai dengan gaya dan kebutuhan kamu, atau ada gambaran ide di kepala mu yang bisa aku bantu eksplor lebih luas buat mengembangkan ide itu?”`;

  const buildPromptForScript = (idea: ContentIdea, pillarData: Pillar, swot: SWOT) => `[ROLE SETUP]
Kamu adalah seorang Social Media Scriptwriter & Content Strategist yang ahli membuat script konten kreatif dan engaging sesuai dengan platform, audiens, dan tone of voice.
Gunakan bahasa yang relatable, jelas, dan sesuai tren sosial media agar konten punya potensi viral sekaligus membangun personal branding.

[CONTEXT INPUT]
Detail konten yang akan dibuat:
- Niche: ${swot.niche}
- Target Audiens: ${pillarData.targetAudiens}
- Judul/Topik Utama: "${idea.title}"
- Target Platform: ${idea.platform.toUpperCase()}
- Format Konten: ${idea.format}
- Tone of Voice: ${pillarData.toneOfVoice}

[TASK OUTPUT]
Berdasarkan detail di atas, buatkan script konten yang lengkap dan siap dipakai dengan format berikut:
1. Hook (3 detik pertama): Buat hook yang sangat menarik perhatian agar audiens langsung stay (persuasif).
2. Isi Konten: Jabarkan poin-poin utama secara jelas, ringkas, dan sesuai tujuan konten.
3. Call to Action (CTA): Ajak audiens untuk bertindak (contoh: follow, comment, share).
4. Caption: Buat caption yang sesuai dengan tone of voice ${pillar.toneOfVoice}, panjang minimal 500 kata, mengandung storytelling + value, serta mendorong interaksi.
Format Output:
- Sajikan sebagai teks script lengkap (bisa dibacakan langsung atau dipakai sebagai poin-poin video).
- Berikan 5 variasi script agar saya bisa memilih gaya yang paling cocok.

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Dari 5 variasi script ini, mana yang paling terasa cocok dengan gaya kamu? Atau ada yang perlu diperbaiki dan di breakdown lebih detail?”`;

  const buildPromptForEvaluation = (pillarData: Pillar, idea: ContentIdea, swotData:SWOT) => `[ROLE SETUP]
Kamu adalah seorang Social Media Analyst & Content Strategist yang ahli membaca insight konten dari metrik performa sosial media untuk memberikan evaluasi objektif sekaligus rekomendasi strategis.
Gunakan bahasa yang jelas, to the point, actionable, dan relevan dengan tren terkini.

[CONTEXT INPUT]
Data evaluasi akan diambil dari screenshot insight konten yang diupload. Olah keseluruhan data yang ada di screenshot tersebut.
Tambahan informasi:
Niche: ${swotData.niche}
Tone of Voice: ${pillarData.toneOfVoice}
Target Audiens: ${pillarData.targetAudiens}
Tujuan utama konten: ${idea.pillar}

[TASK OUTPUT]
Berdasarkan metrik insight yang dibaca dari screenshot, lakukan:
 Analisis Kinerja Konten:
Bandingkan hasil metrik dengan standar umum performa konten di platform tersebut.
Identifikasi kelebihan konten (apa yang berhasil).
Identifikasi kelemahan konten (apa yang kurang efektif).
 Insight Strategis:
Kenapa hasilnya bisa seperti itu (misalnya: hook lemah, caption tidak engaging, waktu posting kurang tepat, dsb).
Faktor eksternal yang mungkin memengaruhi performa (tren, algoritma, audiens behavior).
 Rekomendasi Perbaikan:
Berikan tips spesifik untuk memperbaiki performa konten serupa di masa depan.
Sertakan contoh konkrit (misalnya: alternatif hook, CTA lebih kuat, format konten berbeda, jam posting optimal).
 Action Plan:
Ringkas hasil analisis dalam bentuk langkah-langkah praktis yang bisa langsung diterapkan untuk optimasi konten selanjutnya.

[INTERACTIVITY]
Akhiri jawaban dengan pertanyaan:
👉 “Apakah evaluasi ini sudah menjawab kebutuhan kamu? atau ada kendala terkait konten ini yang ingin dicari tau solusi nya?”`;

  const openChatWithPrompt = (prompt: string) => { const url = 'https://chat.openai.com/?prompt=' + encodeURIComponent(prompt); window.open(url, '_blank'); };
  // ▲▲▲ END ▲▲▲ //

  // ▼▼▼ IMPORT & EXPORT FUNCTIONS ▼▼▼ //
  async function importFromSheet(importType: 'branding' | 'content') {
    if (!spreadsheetId) {
      return alert("Masukkan Spreadsheet ID atau URL lengkap terlebih dahulu.");
    }

    let extractedId = spreadsheetId;
    try {
      if (spreadsheetId.includes("spreadsheets/d/")) {
        extractedId = spreadsheetId.split("spreadsheets/d/")[1].split("/")[0];
      }
      extractedId = extractedId.trim();
    } catch (e) {
      console.warn("Gagal mengekstrak ID, menggunakan input mentah.", e);
    }

    let sheetName: string;
    let successMessage: string;

    if (importType === "branding") {
      sheetName = "Personal Branding Builder";
      successMessage = "✅ Data Personal Branding berhasil diimpor!";
    } else {
      sheetName = "Content Factory";
      successMessage = "✅ Data Content Factory berhasil diimpor!";
    }

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
          akunSosmed: parsed.swot?.akunSosmed || "",
          kelebihan: parsed.swot?.kelebihan || "",
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
    if (!spreadsheetId) {
      return alert("Masukkan Spreadsheet ID atau URL lengkap terlebih dahulu.");
    }

    if (exportType === 'content' && contentIdeas.length === 0) {
      return alert("Tidak ada ide konten untuk diekspor.");
    }

    let extractedId = spreadsheetId;
    try {
      if (spreadsheetId.includes("spreadsheets/d/")) {
        extractedId = spreadsheetId.split("spreadsheets/d/")[1].split("/")[0];
      }
      extractedId = extractedId.trim();
    } catch (e) {
      console.warn("Gagal mengekstrak ID, menggunakan input mentah.", e);
    }

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

  function sanitizeText(text: string) {
    if (!text) return "";
    return text.replace(/[^\x00-\x7F]/g, "");
  }
  async function downloadPDF() {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt" });
      let y = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
  
      function drawBackground() {
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
      }
  
      drawBackground();
  
      const logo = new window.Image();
      logo.src = "/logo-pbbv2.webp";
      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
      });
  
      const imgWidth = 200;
      const imgHeight = (logo.height / logo.width) * imgWidth;
      doc.addImage(logo, "WEBP", (pageWidth - imgWidth) / 2, y, imgWidth, imgHeight);
  
      y += imgHeight + 30;
  
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("Data Personal Branding", pageWidth / 2, y, { align: "center" });
      y += 50;
  
      function writeSection(title: string, fields: { label: string; value?: any; isArray?: boolean }[]) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title, 40, y);
        y += 6;
  
        doc.setDrawColor(255, 255, 255);
        doc.line(40, y, pageWidth - 40, y);
        y += 20;
  
        fields.forEach((f) => {
          if (!f.value || (Array.isArray(f.value) && f.value.length === 0)) return;
  
          if (f.isArray && Array.isArray(f.value)) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.text(`${f.label}:`, 60, y);
            y += 16;
  
            f.value.forEach((item: string) => {
              doc.setFont("helvetica", "bold");
              const split = doc.splitTextToSize(`• ${item}`, 460);
              doc.text(split, 80, y);
              y += split.length * 14 + 4;
  
              if (y > pageHeight - 80) {
                doc.addPage();
                drawBackground();
                y = 60;
              }
            });
            y += 10;
          } else {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.text(`${f.label}: `, 60, y);
  
            doc.setFont("helvetica", "bold");
            const split = doc.splitTextToSize(String(f.value), 400);
            doc.text(split, 180, y);
            y += split.length * 14 + 6;
  
            if (y > pageHeight - 80) {
              doc.addPage();
              drawBackground();
              y = 60;
            }
          }
        });
  
        y += 20;
      }
  
      // Identity
      writeSection("PERSONAL IDENTITY", [
        { label: "Nama", value: identity?.nama },
        { label: "Hal yang Aku Suka", value: identity?.suka },
        { label: "Hal yang Aku Bisa", value: identity?.dikuasai },
        { label: "Kenapa Dibutuhkan", value: identity?.kenapaDibutuhkan },
        { label: "Peluang Penghasilan", value: identity?.peluangPenghasilan },
        { label: "Profile di Sosmed", value: swot?.akunSosmed },
        { label: "Bio Sosmed", value: sanitizeText(bioResult) },
        { label: "Niche", value: swot?.niche },
        { label: "Kategori", value: swot?.kategori },
        { label: "Micro-niche", value: swot?.microNiche },
      ]);
  
      // Storytelling
      writeSection("STORYTELLING FOUNDATION", [
        { label: "Kelebihan", value: swot?.kelebihan },
        { label: "Kelemahan", value: swot?.kelemahan },
        { label: "Peluang", value: swot?.peluang },
        { label: "Tantangan", value: swot?.tantangan },
        { label: "Premis", value: pillar?.premis },
      ]);
  
      // Pillar
      writeSection("CONTENT PILLAR", [
        { label: "Tone of Voice", value: pillar?.toneOfVoice },
        { label: "Target Audiens", value: pillar?.targetAudiens },
        { label: "Pilar Konten", value: pillarsList, isArray: true },
      ]);
  
      doc.save(`personal-branding-${identity?.nama || "export"}.pdf`);
    } catch (err) {
      alert("Gagal export PDF — pastikan library jspdf tersedia.");
      console.error(err);
    }
  }  
  // ▲▲▲ END ▲▲▲ //

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
      <div className="bg-gradient-to-b from-[#000000] via-[#000000] to-[#00498b] min-h-screen w-full p-0 md:p-6">
        <div className="max-w-5xl mx-auto rounded p-6">
          <header className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-6 md:mt-0 mb-6">
            <div className="w-full md:w-fit">
              <Image src="/logo-pbbv2.webp" alt="Logo Personal Branding Builder v2" width={280} height={140} className="mb-6 mx-auto" priority />
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center font-bold text-black gap-2 w-full md:w-1/2">
              <button onClick={() => setIsSpreadsheetModalOpen(true)} className="flex bg-white items-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"> <FileSpreadsheet className="w-4 h-4" strokeWidth={2.5} /> Sheet ID </button>
              <button className="flex bg-white items-center justify-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150" onClick={downloadPDF}><Download className="w-4 h-4" strokeWidth={2.5} /> Download PDF</button>
              <button className="flex bg-white items-center justify-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150" onClick={resetAll}><RefreshCcw className="w-4 h-4" strokeWidth={2.5} /> Reset Data</button>
              <button onClick={handleLogout} className="hidden lg:flex bg-white items-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"> <LogOut className="w-4 h-4" strokeWidth={2.5} /> Logout </button>
              <button onClick={() => importFromSheet('branding')} disabled={isImporting} className={`hidden lg:flex bg-white items-center justify-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}> <Upload className="w-4 h-4" strokeWidth={2.5} /> {isImporting ? 'Importing...' : 'Import Data Personal Branding'} </button>
              <button onClick={() => importFromSheet('content')} disabled={isImporting} className={`hidden lg:flex bg-white items-center justify-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}> <Upload className="w-4 h-4" strokeWidth={2.5} /> {isImporting ? 'Importing...' : 'Import Content Planner'} </button>
              <button onClick={() => importFromSheet('branding')} disabled={isImporting} className={`flex lg:hidden bg-white items-center justify-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}> <Upload className="w-4 h-4" strokeWidth={2.5} /> {isImporting ? 'Importing...' : 'Import Branding'} </button>
              <button onClick={() => importFromSheet('content')} disabled={isImporting} className={`flex lg:hidden bg-white items-center justify-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}> <Upload className="w-4 h-4" strokeWidth={2.5} /> {isImporting ? 'Importing...' : 'Import Content'} </button>
              <button onClick={handleLogout} className="flex lg:hidden bg-white items-center gap-1 px-2 py-1 border rounded text-xs lg:text-sm cursor-pointer transition transform hover:scale-[1.02] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 duration-150"> <LogOut className="w-4 h-4" strokeWidth={2.5} /> Logout </button>
            </div>
          </header>

          <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="grid grid-cols-1 lg:grid-cols-2">
            <section className="col-span-2 py-5 rounded space-y-4">
              {activeTab === 'Start from 0' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <h2 className="text-base font-bold mb-2 text-white">NICHE FINDER</h2>
                        <Info className="w-4 h-4 mt-1 cursor-pointer hover:scale-110" strokeWidth={3} onClick={() => openInfoModal("niche")} />
                        {infoModal && <InfoModal type={infoModal} onClose={closeInfoModal} />}
                      </div>
                      <IdentitySection identity={identity} setIdentity={setIdentity} onGenerate={() => openChatWithPrompt(buildPromptForNiche(identity))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <h2 className="text-base font-bold mb-2 text-white">STORYTELLING BUILDER</h2>
                        <Info className="w-4 h-4 mt-1 cursor-pointer hover:scale-110" strokeWidth={3} onClick={() => openInfoModal("storytelling")} />
                        {infoModal && <InfoModal type={infoModal} onClose={closeInfoModal} />}
                      </div>
                      <SwotSection swot={swot} setSwot={setSwot} onGenerate={() => openChatWithPrompt(buildPromptForPremis(swot))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-white/50 mt-10 mb-8" />

                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <h2 className="text-base font-bold mb-2 text-white">SMART PILLAR</h2>
                      <Info className="w-4 h-4 mt-1 cursor-pointer hover:scale-110" strokeWidth={3} onClick={() => openInfoModal("pillar")} />
                      {infoModal && <InfoModal type={infoModal} onClose={closeInfoModal} />}
                    </div>
                    <PillarSection pillar={pillar} setPillar={setPillar} onGenerate={() => openChatWithPrompt(buildPromptForPillars(pillar,swot))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                    <div className="h-[1px] w-full bg-transparent mt-5" />
                    <PillarListManager identity={identity} pillarsList={pillarsList} setPillarsList={setPillarsList} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  </div>

                  <div className="h-[1px] w-full bg-white/50 mt-12 mb-9" />

                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <h2 className="text-base font-bold mb-2 text-white">BIO GENERATOR</h2>
                      <Info className="w-4 h-4 mt-1 cursor-pointer hover:scale-110" strokeWidth={3} onClick={() => openInfoModal("bio")} />
                      {infoModal && <InfoModal type={infoModal} onClose={closeInfoModal} />}
                    </div>
                    <BioGeneratorSection bio={bioResult} setBio={setBioResult} onGenerate={() => openChatWithPrompt(buildPromptForBio(identity, swot, pillar))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  </div>

                  <div className="h-[1px] w-full bg-white/50 mt-8 mb-9" />

                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <h2 className="text-base font-bold mb-2 text-white">CONTENT FACTORY</h2>
                      <Info className="w-4 h-4 mt-1 cursor-pointer hover:scale-110" strokeWidth={3} onClick={() => openInfoModal("contentFactory")} />
                      {infoModal && <InfoModal type={infoModal} onClose={closeInfoModal} />}
                    </div>
                    <IdeaGenerator pillarsList={pillarsList} onGenerateIdeas={(pillarList, count) => openChatWithPrompt(buildPromptForContentIdeas(pillarList, count, swot, pillar))} />
                  </div>

                  <div className="h-[1px] w-full bg-white/50 mt-10 mb-9" />

                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <h2 className="text-base font-bold mb-2 text-white">PERSONAL BRANDING PLANNER</h2>
                      <Info className="w-4 h-4 mt-1 cursor-pointer hover:scale-110" strokeWidth={3} onClick={() => openInfoModal("planner")} />
                      {infoModal && <InfoModal type={infoModal} onClose={closeInfoModal} />}
                    </div>
                    <ContentIdeasList identity={identity} pillarsList={pillarsList} contentIdeas={contentIdeas} setContentIdeas={setContentIdeas} onGenerateScript={(idea) => openChatWithPrompt(buildPromptForScript(idea, pillar, swot))} onGenerateEval={(idea) => openChatWithPrompt(buildPromptForEvaluation(pillar, idea, swot))} onSave={() => exportToSheet('content')} isSaving={isExporting} />
                  </div>
                </>
              )}
              {activeTab === 'Niche Finder' && (
                <>
                  <div className="flex flex-col gap-0.5 mb-5 border-b pb-3 border-white/40">
                    <h2 className="text-xl tracking-wider font-bold text-white">NICHE FINDER</h2>
                    <p className="text-sm text-white">Bantu kamu menemukan niche personal branding yang paling sesuai dengan minat, keahlian, dan peluang pasar.</p>
                  </div>                  
                  <IdentitySection identity={identity} setIdentity={setIdentity} onGenerate={() => openChatWithPrompt(buildPromptForNiche(identity))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <div className="space-y-2">
                    <Input label="Niche" value={swot.niche} onChange={(v) => setSwot({ ...swot, niche: v })} placeholder="Contoh: Digital Tools for Creators" />
                    <Input label="Kategori" value={swot.kategori} onChange={(v) => setSwot({ ...swot, kategori: v })} />
                    <Input label="Micro-niche" value={swot.microNiche} onChange={(v) => setSwot({ ...swot, microNiche: v })} />
                    <Input label="Nama Profile Sosmed" value={swot.akunSosmed} onChange={(v) => setSwot({ ...swot, akunSosmed: v })} />
                  </div>
                </>
              )}
              {activeTab === 'Storytelling Builder' && (
                <>
                  <div className="flex flex-col gap-0.5 mb-5 border-b pb-3 border-white/40">
                    <h2 className="text-xl tracking-wider font-bold text-white">STORYTELLING BUILDER</h2>
                    <p className="text-sm text-white">Memudahkanmu merangkai cerita personal agar audiens merasa relate dan engage.</p>
                  </div> 
                  <div className="space-y-2">
                    <SwotSection swot={swot} setSwot={setSwot} onGenerate={() => openChatWithPrompt(buildPromptForPremis(swot))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                    <Input label="Premis" value={pillar.premis} onChange={(v) => setPillar({ ...pillar, premis: v })} rows={2} />
                  </div>
                </>
              )}
              {activeTab === 'Smart Pillar' && (
                <>
                  <div className="flex flex-col gap-0.5 mb-5 border-b pb-3 border-white/40">
                    <h2 className="text-xl tracking-wider font-bold text-white">SMART PILLAR</h2>
                    <p className="text-sm text-white">Bantu kamu menemukan pilar konten strategis agar kontenmu konsisten, terarah, dan berhubungan dengan niche.</p>
                  </div> 
                  <PillarSection pillar={pillar} setPillar={setPillar} onGenerate={() => openChatWithPrompt(buildPromptForPillars(pillar,swot))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <PillarListManager identity={identity} pillarsList={pillarsList} setPillarsList={setPillarsList} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                </>
              )}
              {activeTab === 'Bio Generator' && (
                <>
                  <div className="flex flex-col gap-0.5 mb-5 border-b pb-3 border-white/40">
                    <h2 className="text-xl tracking-wider font-bold text-white">BIO GENERATOR</h2>
                    <p className="text-sm text-white">Bantu kamu menulis bio media sosial yang ringkas, menarik, dan kuat membangun personal branding.</p>
                  </div> 
                  <BioGeneratorSection bio={bioResult} setBio={setBioResult} onGenerate={() => openChatWithPrompt(buildPromptForBio(identity, swot, pillar))} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                </>
              )}
              {activeTab === 'Content Factory' && (
                <>
                  <div className="flex flex-col gap-0.5 mb-5 border-b pb-3 border-white/40">
                    <h2 className="text-xl tracking-wider font-bold text-white">CONTENT FACTORY</h2>
                    <p className="text-sm text-white">Hasilkan ide konten sesuai pilar dan kebutuhanmu agar nggak kehabisan bahan posting.</p>
                  </div> 
                  <PillarListManager identity={identity} pillarsList={pillarsList} setPillarsList={setPillarsList} onSave={() => exportToSheet('branding')} isSaving={isExporting} />
                  <div className="h-[1px] w-full bg-transparent mt-5" />
                  <IdeaGenerator pillarsList={pillarsList} onGenerateIdeas={(pillarList, count) => openChatWithPrompt(buildPromptForContentIdeas(pillarList, count, swot, pillar))} />
                  <div className="h-[1px] w-full bg-white/50 mt-10 mb-7" />
                  <ContentIdeasList identity={identity} pillarsList={pillarsList} contentIdeas={contentIdeas} setContentIdeas={setContentIdeas} onGenerateScript={(idea) => openChatWithPrompt(buildPromptForScript(idea, pillar, swot))} onGenerateEval={(idea) => openChatWithPrompt(buildPromptForEvaluation(pillar, idea, swot))} onSave={() => exportToSheet('content')} isSaving={isExporting} />
                </>
              )}
              {activeTab === 'Personal Branding Planner' && (
                <>
                  <div className="flex flex-col gap-0.5 mb-5 border-b pb-3 border-white/40">
                    <h2 className="text-xl tracking-wider font-bold text-white">PERSONAL BRANDING PLANNER</h2>
                    <p className="text-sm text-white">Bantu kamu mengelola ide, script, dan evaluasi konten dalam satu tempat.</p>
                  </div> 
                  <ContentIdeasList identity={identity} pillarsList={pillarsList} contentIdeas={contentIdeas} setContentIdeas={setContentIdeas} onGenerateScript={(idea) => openChatWithPrompt(buildPromptForScript(idea, pillar, swot))} onGenerateEval={(idea) => openChatWithPrompt(buildPromptForEvaluation(pillar, idea, swot))} onSave={() => exportToSheet('content')} isSaving={isExporting} />
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