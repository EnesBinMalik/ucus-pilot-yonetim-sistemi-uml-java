import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { UMLDiagramViewer } from './components/UMLDiagramViewer';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { LiveSimulator } from './components/LiveSimulator';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('uml');
  const [selectedJavaFileName, setSelectedJavaFileName] = useState<string>('Flight.java');

  const handleSelectJavaFromUml = (fileName: string) => {
    setSelectedJavaFileName(fileName);
    setActiveTab('java');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero Sub-bar with Author Signature & Key Metrics */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sky-400 font-mono">Enes Öztürk</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">Uçuş ve Pilot Yönetimi Nesne Yönelimli Sistem Tasarımı</span>
            <span className="text-slate-600 hidden md:inline">·</span>
            <span className="text-slate-400 hidden md:inline">Java 17/21 OOP Mimarisi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> UML 2.5 Standardı
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-sky-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 8 Model Sınıfı
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-purple-400">
              <Sparkles className="w-3.5 h-3.5" /> 11 Havacılık Kuralı
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-between p-1 bg-slate-900 rounded-lg border border-slate-800 mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('uml')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'uml' ? 'bg-sky-600 text-white' : 'text-slate-400'
            }`}
          >
            UML Diyagramı
          </button>
          <button
            onClick={() => setActiveTab('java')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'java' ? 'bg-sky-600 text-white' : 'text-slate-400'
            }`}
          >
            Java Kodları
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-sky-600 text-white' : 'text-slate-400'
            }`}
          >
            Canlı Simülatör
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'docs' ? 'bg-sky-600 text-white' : 'text-slate-400'
            }`}
          >
            Mimari Rapor
          </button>
        </div>

        {activeTab === 'uml' && (
          <UMLDiagramViewer onSelectJavaFile={handleSelectJavaFromUml} />
        )}

        {activeTab === 'java' && (
          <JavaCodeViewer initialFileName={selectedJavaFileName} />
        )}

        {activeTab === 'simulator' && <LiveSimulator />}

        {activeTab === 'docs' && <ArchitectureDocs />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-4 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Uçuş ve Pilot Yönetim Sistemi — Yazılım Mimarı:{' '}
            <strong className="text-slate-300">Enes Öztürk</strong>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Airline</span>
            <span>·</span>
            <span>Aircraft</span>
            <span>·</span>
            <span>Flight</span>
            <span>·</span>
            <span>Pilot</span>
            <span>·</span>
            <span>Airport</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
