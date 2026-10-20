import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Layers,
  Award,
  BookOpen,
} from 'lucide-react';

export const ArchitectureDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Title & Author Stamp Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Sistem Mimarisi & UML Teknik Raporu
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Uçuş ve Pilot Yönetim Sistemi
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Havacılık operasyonları, filo durumu, pilot yetkilendirme ve uçuş planlama süreçlerini kapsayan nesne yönelimli (OOP) kurumsal mimari tasarımı.
            </p>
          </div>

          {/* Author Badge */}
          <div className="shrink-0 p-4 rounded-xl bg-slate-950 border border-sky-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono text-lg border border-sky-500/30">
              EÖ
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                Tasarımcı & Mimar
              </div>
              <div className="text-base font-bold text-white">Enes Öztürk</div>
              <div className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Java 17/21 OOP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirement vs UML Mapping Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <BookOpen className="w-5 h-5 text-sky-400" />
          <h2>Problem Tanımı & UML Varlık Eşleme Matrisi</h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Kullanıcı gereksinimlerinin her bir maddesi, nesne yönelimli tasarım ilkeleri ve standart UML notasyonu ile birebir eşlenmiştir:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 w-1/3">Kullanıcı İsteri (Prompt)</th>
                <th className="px-4 py-3 w-1/4">UML Sınıfı & Rolü</th>
                <th className="px-4 py-3">Java & OOP Çözümü (Enes Öztürk)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Hava yolu şirketleri uçuşları gerçekleştirir. Her hava yolunun bir kimliği vardır."
                </td>
                <td className="px-4 py-3 font-mono text-sky-400">
                  Airline (Entity)
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-sky-300 font-mono text-[11px]">airlineId: String</code>,{' '}
                  <code className="text-sky-300 font-mono text-[11px]">flights: List&lt;Flight&gt;</code>. Şirket uçuşları planlar ve yönetir.
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Hava yolu şirketi, farklı tipteki uçaklara sahiptir."
                </td>
                <td className="px-4 py-3 font-mono text-sky-400">
                  Airline ♦— Aircraft → AircraftType
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <strong className="text-white">Composition (Bileşim):</strong> Havayolu uçak filosuna sahiptir. Her uçak (<code className="text-sky-300 font-mono text-[11px]">Aircraft</code>) bağımsız bir uçak tipine (<code className="text-sky-300 font-mono text-[11px]">AircraftType</code>) referans verir.
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Uçaklar çalışır veya onarım durumunda olabilir."
                </td>
                <td className="px-4 py-3 font-mono text-amber-400">
                  AircraftStatus (Enum)
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-amber-300 font-mono text-[11px]">OPERATIONAL</code> ve{' '}
                  <code className="text-amber-300 font-mono text-[11px]">UNDER_MAINTENANCE</code> durumları. Onarımdaki uçağa uçuş atanamaz (Invariant Kontrolü).
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Her uçuşun benzersiz kimliği, kalkacağı ve ineceği havaalanı, kalkış ve iniş saatleri vardır."
                </td>
                <td className="px-4 py-3 font-mono text-emerald-400">
                  Flight (Entity)
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-emerald-300 font-mono text-[11px]">flightId</code>,{' '}
                  <code className="text-emerald-300 font-mono text-[11px]">departureAirport: Airport</code>,{' '}
                  <code className="text-emerald-300 font-mono text-[11px]">arrivalAirport: Airport</code>,{' '}
                  <code className="text-emerald-300 font-mono text-[11px]">departureTime</code>,{' '}
                  <code className="text-emerald-300 font-mono text-[11px]">arrivalTime</code>.
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Her uçuşun bir pilotu ve yardımcı pilotu vardır ve uçağı kullanırlar."
                </td>
                <td className="px-4 py-3 font-mono text-rose-400">
                  Flight → Pilot (captain & coPilot)
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-rose-300 font-mono text-[11px]">captainPilot: Pilot</code> ve{' '}
                  <code className="text-rose-300 font-mono text-[11px]">coPilot: Pilot</code>. Kurucu metotta kaptan != yardımcı pilot doğrulaması yapılır.
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Havaalanlarının benzersiz kimlikleri ve isimleri vardır."
                </td>
                <td className="px-4 py-3 font-mono text-cyan-400">
                  Airport (Entity)
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-cyan-300 font-mono text-[11px]">airportId: String</code> (örn: "IST", "LHR") ve{' '}
                  <code className="text-cyan-300 font-mono text-[11px]">name: String</code> (örn: "İstanbul Havalimanı").
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Hava yolu şirketlerinin pilotları vardır ve her pilotun bir deneyim seviyesi mevcuttur."
                </td>
                <td className="px-4 py-3 font-mono text-purple-400">
                  Pilot → ExperienceLevel
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-purple-300 font-mono text-[11px]">ExperienceLevel</code> Enum: JUNIOR, MID_LEVEL, SENIOR, CHIEF_PILOT. Uçuş saatleri ve kaptanlık yetkileri denetlenir.
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium text-white">
                  "Bir uçak tipi, belirli sayıda pilota ihtiyaç duyabilir."
                </td>
                <td className="px-4 py-3 font-mono text-purple-400">
                  AircraftType
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <code className="text-purple-300 font-mono text-[11px]">requiredPilotCount: int</code> ve{' '}
                  <code className="text-purple-300 font-mono text-[11px]">minCaptainLevel: ExperienceLevel</code>. Uçuş planlanırken mürettebat sayısı ve yeterlilik kıyaslanır.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* UML Relationships & Multiplicities Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <GitBranch className="w-4 h-4 text-sky-400" />
            <h3>UML İlişki Türleri & Çokluklar (Cardinalities)</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="font-bold text-sky-300 flex items-center justify-between">
                <span>Airline ♦— Aircraft</span>
                <span className="font-mono text-[10px] text-slate-400">1 ♦────── 0..*</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                <strong>Bileşim (Composition):</strong> Bir havayolu şirketi uçak filosuna sahiptir. Uçaklar şirket mülkiyetindedir (Dolu elmas notasyonu).
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="font-bold text-sky-300 flex items-center justify-between">
                <span>Airline ◊— Pilot</span>
                <span className="font-mono text-[10px] text-slate-400">1 ◊────── 1..*</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                <strong>Toplama (Aggregation):</strong> Havayolu pilotları istihdam eder. Ancak pilot bağımsız bir varlıktır ve başka bir şirkete transfer olabilir (Boş elmas notasyonu).
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="font-bold text-sky-300 flex items-center justify-between">
                <span>Flight ───&gt; Aircraft &amp; Pilot</span>
                <span className="font-mono text-[10px] text-slate-400">0..* ──────&gt; 1</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                <strong>Birliktelik (Association):</strong> Uçuş nesnesi kullanılan uçak, kaptan pilot ve yardımcı pilotu refere eder.
              </p>
            </div>
          </div>
        </div>

        {/* OOP Invariants & Architectural Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3>Uygulanan OOP Prensipleri & Değişmezler (Invariants)</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="font-bold text-emerald-300">
                1. Kapsülleme (Encapsulation) & Savunmacı Programlama
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tüm alanlar <code className="text-slate-300 font-mono">private</code> ve değişmez alanlar <code className="text-slate-300 font-mono">final</code> yapılmıştır. Listeler <code className="text-slate-300 font-mono">Collections.unmodifiableList</code> ile dışarı açılır.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="font-bold text-emerald-300">
                2. İş Kuralı Doğrulama (Domain Invariants)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Onarımdaki uçak sefere çıkamaz (<code className="text-slate-300 font-mono">AircraftStatus.UNDER_MAINTENANCE</code>). İhlal durumunda özel <code className="text-rose-400 font-mono">FlightOperationException</code> fırlatılır.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="font-bold text-emerald-300">
                3. Mürettebat & Deneyim Bütünlüğü
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Kaptan ve yardımcı pilot aynı kişi olamaz. Kaptan pilotun seviyesi uçak tipinin gereksinimini karşılamak zorundadır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature & Certification Footer */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-sky-400 shrink-0" />
          <div>
            <strong className="text-white">Enes Öztürk İmzalı Java Programı</strong>
            <div>Tüm sınıflar ve dokümantasyon eksiksiz olarak Java 17/21 standartlarına uygundur.</div>
          </div>
        </div>

        <div className="text-right font-mono text-[11px] text-slate-500">
          UML 2.5 Standardı · Java Enterprise Architecture
        </div>
      </div>
    </div>
  );
};
