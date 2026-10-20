import React from 'react';
import { Archive } from 'lucide-react';
import JSZip from 'jszip';
import { JAVA_FILES } from '../data/javaSourceCode';

export type ActiveTab = 'uml' | 'java' | 'simulator' | 'docs';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const handleQuickZipDownload = async () => {
    try {
      const zip = new JSZip();
      const readme = `# Uçuş ve Pilot Yönetim Sistemi
Mimar & Yazılım Mühendisi: Enes Öztürk
UML Sınıf Diyagramı ve Java Kaynak Kodları Paketi
`;
      zip.file('README.md', readme);

      JAVA_FILES.forEach(file => {
        zip.file(file.packagePath, file.code);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ucus_Pilot_Yonetim_Enes_Ozturk_Java.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          onTabChange('uml');
        }}
        className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-sky-400 transition-colors"
      >
        Uçuş & Pilot Yönetim Sistemi
      </a>

      {/* Zone 2: 4 clean single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onTabChange('uml')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'uml' ? 'text-sky-400 font-bold border-b-2 border-sky-400 py-1' : ''
          }`}
        >
          UML Sınıf Diyagramı
        </button>
        <button
          onClick={() => onTabChange('java')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'java' ? 'text-sky-400 font-bold border-b-2 border-sky-400 py-1' : ''
          }`}
        >
          Java Programı (Enes Öztürk)
        </button>
        <button
          onClick={() => onTabChange('simulator')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'simulator' ? 'text-sky-400 font-bold border-b-2 border-sky-400 py-1' : ''
          }`}
        >
          Canlı Simülatör & Filo
        </button>
        <button
          onClick={() => onTabChange('docs')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'docs' ? 'text-sky-400 font-bold border-b-2 border-sky-400 py-1' : ''
          }`}
        >
          Mimari Rapor
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleQuickZipDownload}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <Archive className="w-3.5 h-3.5" />
          Java Projesini İndir (.ZIP)
        </button>
      </div>
    </header>
  );
};
