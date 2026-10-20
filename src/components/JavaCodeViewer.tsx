import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  FileCode,
  FolderTree,
  Archive,
  Terminal,
  UserCheck,
  Search,
} from 'lucide-react';
import JSZip from 'jszip';
import { JAVA_FILES, JavaFile } from '../data/javaSourceCode';

interface Props {
  initialFileName?: string;
}

export const JavaCodeViewer: React.FC<Props> = ({ initialFileName }) => {
  const [selectedFile, setSelectedFile] = useState<JavaFile>(() => {
    if (initialFileName) {
      const found = JAVA_FILES.find(f => f.name.toLowerCase() === initialFileName.toLowerCase());
      if (found) return found;
    }
    return JAVA_FILES[0];
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Readme with Enes Öztürk signature
      const readmeContent = `# Uçuş ve Pilot Yönetim Sistemi (Flight & Pilot Management System)
Tasarımcı & Yazılım Mimarı: Enes Öztürk
Tarih: 2026
Teknoloji: Java 17/21 LTS (Object-Oriented Architecture)

## Proje Hakkında
Bu proje havacılık kuralları gereğince:
1. Havayolu şirketleri ve filolarındaki farklı tipteki uçaklar (Aircraft & AircraftType),
2. Uçakların çalışır (OPERATIONAL) ve onarımda (UNDER_MAINTENANCE) durumları,
3. Her uçuşun benzersiz kimliği, kalkış/varış havaalanı, kalkış/varış saatleri,
4. Her uçuşun kaptan pilotu ve yardımcı pilotu,
5. Havaalanlarının benzersiz kimlik ve isimleri,
6. Pilotların kıdem ve deneyim seviyeleri (Junior, Mid-Level, Senior, Chief Pilot),
7. Uçak tipine göre gereken asgari pilot sayıları ve yeterlilikleri
modellemektedir.

## Çalıştırma (Compile & Run)
javac com/enesozturk/flightmgmt/**/*.java com/enesozturk/flightmgmt/*.java
java com.enesozturk.flightmgmt.Main

İmza: Enes Öztürk
`;
      zip.file('README.md', readmeContent);

      // Add each Java file to its respective package directory
      JAVA_FILES.forEach(file => {
        zip.file(file.packagePath, file.code);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ucus_Pilot_Yonetim_Sistemi_Enes_Ozturk_Java.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP oluşturma hatası:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const filteredFiles = JAVA_FILES.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.descriptionTr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-[calc(100vh-140px)] min-h-[750px]">
      {/* File Explorer Sidebar */}
      <div className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Java Paket Gezgini
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {JAVA_FILES.length} dosya
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Dosya veya sınıf ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            com.enesozturk.flightmgmt
          </div>
          {filteredFiles.map(file => {
            const isSelected = selectedFile.name === file.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-sky-500/15 border border-sky-500/30 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FileCode
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    isSelected ? 'text-sky-400' : 'text-slate-500'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium truncate">
                      {file.name}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded ${
                        file.category === 'main'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : file.category === 'model'
                          ? 'bg-blue-500/20 text-blue-300'
                          : file.category === 'service'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {file.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {file.descriptionTr}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Author Badge & Download All */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-slate-900 border border-slate-800/80">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-[11px]">
              <span className="text-slate-400">Yazar / Mimar:</span>{' '}
              <strong className="text-white">Enes Öztürk</strong>
            </div>
          </div>

          <button
            onClick={handleDownloadAllZip}
            disabled={isZipping}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Archive className="w-3.5 h-3.5" />
            {isZipping ? 'ZIP Hazırlanıyor...' : 'Tüm Projeyi ZIP İndir'}
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 truncate">
              <span className="text-slate-500">src/main/java/</span>
              <span className="text-sky-400 font-semibold">{selectedFile.packagePath}</span>
            </div>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Java 17/21 LTS
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Kodu Kopyala"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadSingle}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-colors"
              title="Bu dosyayı indir"
            >
              <Download className="w-3.5 h-3.5" />
              .java İndir
            </button>
          </div>
        </div>

        {/* Code Description Notice */}
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-300">
            <strong className="text-sky-400">{selectedFile.name}:</strong> {selectedFile.descriptionTr}
          </span>
          <span className="font-mono text-[11px] text-slate-500 hidden md:inline">
            İmza: Enes Öztürk
          </span>
        </div>

        {/* Code Content with Line Numbers */}
        <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed">
          <div className="flex">
            {/* Line numbers */}
            <div className="select-none text-right pr-4 text-slate-600 border-r border-slate-800 shrink-0 font-mono text-xs">
              {selectedFile.code.split('\n').map((_, i) => (
                <div key={i} className="h-5">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code lines */}
            <div className="pl-4 flex-1 whitespace-pre overflow-x-auto text-xs font-mono">
              {selectedFile.code.split('\n').map((line, idx) => {
                // Simple high-contrast keyword highlighting for Java
                let formatted = line;
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*');
                const isAnnotationOrAuthor = line.includes('@author') || line.includes('@version');

                return (
                  <div
                    key={idx}
                    className={`h-5 ${
                      isAnnotationOrAuthor
                        ? 'text-sky-400 font-bold bg-sky-500/10 px-1 -mx-1 rounded'
                        : isComment
                        ? 'text-emerald-400/80 italic'
                        : 'text-slate-200'
                    }`}
                  >
                    {formatted}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>javac {selectedFile.packagePath}</span>
          </div>
          <div>UTF-8 · LF · Java Class Definition</div>
        </div>
      </div>
    </div>
  );
};
