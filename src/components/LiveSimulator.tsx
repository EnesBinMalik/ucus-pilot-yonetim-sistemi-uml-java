import React, { useState } from 'react';
import {
  Plane,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Wrench,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import {
  Aircraft,
  Airline,
  Flight,
  Pilot,
} from '../types/domain';
import {
  INITIAL_AIRCRAFT,
  INITIAL_AIRLINES,
  INITIAL_AIRPORTS,
  INITIAL_PILOTS,
  INITIAL_AIRCRAFT_TYPES,
  AIRCRAFT_STATUS_METADATA,
  EXPERIENCE_LEVEL_METADATA,
} from '../data/initialData';

export const LiveSimulator: React.FC = () => {
  const [airlines, setAirlines] = useState<Airline[]>(INITIAL_AIRLINES);
  const [selectedAirlineId, setSelectedAirlineId] = useState<string>('THY');
  const [aircraftList, setAircraftList] = useState<Aircraft[]>(INITIAL_AIRCRAFT);
  const [pilotList, setPilotList] = useState<Pilot[]>(INITIAL_PILOTS);

  // Form states for creating a new flight
  const [flightId, setFlightId] = useState<string>('TK3401');
  const [depAirportId, setDepAirportId] = useState<string>('IST');
  const [arrAirportId, setArrAirportId] = useState<string>('LHR');
  const [depTime, setDepTime] = useState<string>('2026-10-21T09:00');
  const [arrTime, setArrTime] = useState<string>('2026-10-21T11:45');
  const [selectedAircraftId, setSelectedAircraftId] = useState<string>('TC-JYA');
  const [selectedCaptainId, setSelectedCaptainId] = useState<string>('PLT-001');
  const [selectedCoPilotId, setSelectedCoPilotId] = useState<string>('PLT-003');

  // Logs & notifications
  const [statusLog, setStatusLog] = useState<{ id: string; type: 'success' | 'error' | 'info'; message: string; time: string }[]>([
    {
      id: 'log-1',
      type: 'info',
      message: 'Sistem başlatıldı. Enes Öztürk havacılık doğrulama motoru devrede.',
      time: '09:00:00',
    },
  ]);

  const currentAirline = airlines.find(a => a.airlineId === selectedAirlineId) || airlines[0];
  const airlineAircraft = aircraftList.filter(a => a.airlineId === selectedAirlineId);
  const airlinePilots = pilotList.filter(p => p.airlineId === selectedAirlineId);

  // Toggle Aircraft Status (Çalışır <-> Onarımda)
  const toggleAircraftStatus = (aircraftId: string) => {
    setAircraftList(prev =>
      prev.map(ac => {
        if (ac.aircraftId === aircraftId) {
          const nextStatus = ac.status === 'OPERATIONAL' ? 'UNDER_MAINTENANCE' : 'OPERATIONAL';
          const time = new Date().toLocaleTimeString();

          setStatusLog(l => [
            {
              id: 'log-' + Date.now(),
              type: nextStatus === 'OPERATIONAL' ? 'success' : 'info',
              message: `[${ac.aircraftId}] durumu güncellendi: ${
                nextStatus === 'OPERATIONAL' ? 'Çalışır Durumda' : 'Onarımda / Bakımda'
              }`,
              time,
            },
            ...l,
          ]);

          return { ...ac, status: nextStatus };
        }
        return ac;
      })
    );
  };

  // Real-time Flight Validation
  const validateCurrentForm = () => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Airports
    if (depAirportId === arrAirportId) {
      errors.push('Kalkış havaalanı ile varış havaalanı aynı olamaz!');
    }

    // 2. Dates
    if (new Date(arrTime) <= new Date(depTime)) {
      errors.push('İniş saati kalkış saatinden sonra olmalıdır!');
    }

    // 3. Aircraft Check
    const targetAircraft = aircraftList.find(a => a.aircraftId === selectedAircraftId);
    if (!targetAircraft) {
      errors.push('Lütfen geçerli bir uçak seçiniz.');
    } else if (targetAircraft.status === 'UNDER_MAINTENANCE') {
      errors.push(
        `[${targetAircraft.aircraftId}] kuyruk numaralı uçak ONARIMDA/BAKIMDA durumundadır! Sefere çıkamaz.`
      );
    }

    // 4. Pilot Checks
    const captain = pilotList.find(p => p.pilotId === selectedCaptainId);
    const coPilot = pilotList.find(p => p.pilotId === selectedCoPilotId);

    if (!captain || !coPilot) {
      errors.push('Kaptan pilot ve yardımcı pilot seçilmelidir.');
    } else {
      if (captain.pilotId === coPilot.pilotId) {
        errors.push('Kaptan pilot ile yardımcı pilot aynı kişi olamaz!');
      }

      if (captain.experienceLevel === 'JUNIOR' || captain.experienceLevel === 'MID_LEVEL') {
        errors.push(
          `Kaptan olarak seçilen ${captain.firstName} ${captain.lastName} (${EXPERIENCE_LEVEL_METADATA[captain.experienceLevel]?.titleTr}) kaptanlık yetkisine sahip değildir!`
        );
      }

      if (targetAircraft) {
        const requiredCaptainLevel = targetAircraft.type.minCaptainLevel;
        const captainExp = captain.experienceLevel;
        if (requiredCaptainLevel === 'CHIEF_PILOT' && captainExp !== 'CHIEF_PILOT') {
          errors.push(
            `[${targetAircraft.type.modelName}] uçak tipi asgari CHIEF_PILOT (Başpilot) deneyim seviyesi gerektirir!`
          );
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  };

  const validation = validateCurrentForm();

  // Create Flight Handler
  const handleCreateFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) return;

    const depAirport = INITIAL_AIRPORTS.find(a => a.airportId === depAirportId)!;
    const arrAirport = INITIAL_AIRPORTS.find(a => a.airportId === arrAirportId)!;
    const aircraft = aircraftList.find(a => a.aircraftId === selectedAircraftId)!;
    const captain = pilotList.find(p => p.pilotId === selectedCaptainId)!;
    const coPilot = pilotList.find(p => p.pilotId === selectedCoPilotId)!;

    const newFlight: Flight = {
      flightId: flightId.toUpperCase().trim(),
      airlineId: selectedAirlineId,
      departureAirport: depAirport,
      arrivalAirport: arrAirport,
      departureTime: depTime,
      arrivalTime: arrTime,
      aircraft,
      captainPilot: captain,
      coPilot,
      status: 'SCHEDULED',
    };

    setAirlines(prev =>
      prev.map(a => {
        if (a.airlineId === selectedAirlineId) {
          return {
            ...a,
            flights: [newFlight, ...a.flights],
          };
        }
        return a;
      })
    );

    const time = new Date().toLocaleTimeString();
    setStatusLog(l => [
      {
        id: 'log-' + Date.now(),
        type: 'success',
        message: `Uçuş [${newFlight.flightId}] (${depAirport.airportId} -> ${arrAirport.airportId}) başarıyla planlandı. Uçak: ${aircraft.aircraftId}, Kaptan: ${captain.lastName}, Y.Pilot: ${coPilot.lastName}`,
        time,
      },
      ...l,
    ]);

    // Generate next flight ID
    setFlightId('TK' + Math.floor(1000 + Math.random() * 9000));
  };

  // Preset Scenario Loaders
  const loadScenario = (type: 'valid' | 'maintenance_fail' | 'same_pilot_fail' | 'junior_captain_fail') => {
    setSelectedAirlineId('THY');

    if (type === 'valid') {
      setFlightId('TK1923');
      setDepAirportId('IST');
      setArrAirportId('LHR');
      setSelectedAircraftId('TC-LNA'); // A359 Operational
      setSelectedCaptainId('PLT-001'); // Enes Öztürk (Chief)
      setSelectedCoPilotId('PLT-003'); // Ahmet Yılmaz (Mid-level)
    } else if (type === 'maintenance_fail') {
      setFlightId('TK0002');
      setDepAirportId('IST');
      setArrAirportId('JFK');
      setSelectedAircraftId('TC-JHY'); // UNDER_MAINTENANCE!
      setSelectedCaptainId('PLT-001');
      setSelectedCoPilotId('PLT-002');
    } else if (type === 'same_pilot_fail') {
      setFlightId('TK4410');
      setDepAirportId('SAW');
      setArrAirportId('AYT');
      setSelectedAircraftId('TC-JYA');
      setSelectedCaptainId('PLT-002');
      setSelectedCoPilotId('PLT-002'); // Same pilot!
    } else if (type === 'junior_captain_fail') {
      setFlightId('TK5520');
      setDepAirportId('IST');
      setArrAirportId('ESB');
      setSelectedAircraftId('TC-JYA');
      setSelectedCaptainId('PLT-004'); // Burak Demir (Junior)!
      setSelectedCoPilotId('PLT-003');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Airline Selector & Quick Scenarios */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Aktif Havayolu Şirketi</div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                {currentAirline.name}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                  {currentAirline.airlineId} / {currentAirline.iataCode}
                </span>
              </div>
            </div>
          </div>

          {/* Airline Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
            {airlines.map(airline => (
              <button
                key={airline.airlineId}
                onClick={() => setSelectedAirlineId(airline.airlineId)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  selectedAirlineId === airline.airlineId
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {airline.name}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Test Scenarios */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Hızlı Kural Testleri:</span>
          <button
            onClick={() => loadScenario('valid')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded border border-slate-700 transition-colors flex items-center gap-1"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            1. Geçerli Uçuş Senaryosu
          </button>
          <button
            onClick={() => loadScenario('maintenance_fail')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-slate-700 transition-colors flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            2. Onarımdaki Uçak Hatası
          </button>
          <button
            onClick={() => loadScenario('same_pilot_fail')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded border border-slate-700 transition-colors flex items-center gap-1"
          >
            <XCircle className="w-3 h-3 text-rose-400" />
            3. Aynı Pilot Hatası
          </button>
          <button
            onClick={() => loadScenario('junior_captain_fail')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded border border-slate-700 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            4. Junior Kaptan Hatası
          </button>
        </div>
      </div>

      {/* Main Grid: Fleet & Pilots + Flight Scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fleet Status & Pilot Roster (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Fleet Management */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">
                  Havayolu Filosu ({airlineAircraft.length} Uçak)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                "Uçaklar çalışır veya onarım durumunda olabilir"
              </span>
            </div>

            <div className="p-4 space-y-3">
              {airlineAircraft.map(aircraft => {
                const isOp = aircraft.status === 'OPERATIONAL';
                return (
                  <div
                    key={aircraft.aircraftId}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isOp
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {isOp ? <Plane className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white font-mono text-sm">
                            {aircraft.aircraftId}
                          </span>
                          <span className="text-xs text-slate-300 font-medium">
                            {aircraft.type.modelName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>Gerekli Pilot: {aircraft.type.requiredPilotCount}</span>
                          <span>·</span>
                          <span>Min Kaptan: {aircraft.type.minCaptainLevel}</span>
                          <span>·</span>
                          <span>{aircraft.serialNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Status & Toggle Button */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md border font-mono ${
                          isOp
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                            : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                        }`}
                      >
                        {AIRCRAFT_STATUS_METADATA[aircraft.status]?.labelTr}
                      </span>

                      <button
                        onClick={() => toggleAircraftStatus(aircraft.aircraftId)}
                        className="px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors flex items-center gap-1.5"
                        title="Uçak durumunu değiştir"
                      >
                        <RefreshCw className="w-3 h-3 text-slate-400" />
                        {isOp ? 'Onarıma Al' : 'Sefer Hazırla'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pilot Roster */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">
                  Pilot Kadrosu & Deneyim Seviyeleri ({airlinePilots.length} Pilot)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                "Her pilotun bir deneyim seviyesi mevcuttur"
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {airlinePilots.map(pilot => {
                const expInfo = EXPERIENCE_LEVEL_METADATA[pilot.experienceLevel];
                const isEnes = pilot.firstName === 'Enes' && pilot.lastName === 'Öztürk';

                return (
                  <div
                    key={pilot.pilotId}
                    className={`p-3 bg-slate-950 border rounded-lg ${
                      isEnes ? 'border-sky-500/50 bg-sky-950/20' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          {pilot.firstName} {pilot.lastName}
                          {isEnes && (
                            <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/20 px-1.5 py-0.2 rounded border border-sky-500/30">
                              MİMAR & CHIEF
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {pilot.pilotId} · {pilot.licenseNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-slate-300">
                          {pilot.totalFlightHours.toLocaleString()} sa
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${expInfo?.badgeColor}`}>
                        {expInfo?.titleTr.split('(')[0].trim()}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {expInfo?.canBeCaptain ? '✓ Kaptan Yetkili' : '✕ Yalnızca Y.Pilot'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Flight Creation & Live Rule Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Flight Creation Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Yeni Uçuş Planla & Doğrula</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">OOP Kural Denetimi</span>
            </div>

            <form onSubmit={handleCreateFlight} className="p-4 space-y-4">
              {/* Flight ID */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Uçuş Kimliği (Benzersiz Kod)
                </label>
                <input
                  type="text"
                  value={flightId}
                  onChange={e => setFlightId(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-sky-500 uppercase"
                  placeholder="Örn: TK1923"
                />
              </div>

              {/* Airports Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kalkış Havaalanı
                  </label>
                  <select
                    value={depAirportId}
                    onChange={e => setDepAirportId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {INITIAL_AIRPORTS.map(ap => (
                      <option key={ap.airportId} value={ap.airportId}>
                        {ap.airportId} - {ap.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    İniş Havaalanı
                  </label>
                  <select
                    value={arrAirportId}
                    onChange={e => setArrAirportId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {INITIAL_AIRPORTS.map(ap => (
                      <option key={ap.airportId} value={ap.airportId}>
                        {ap.airportId} - {ap.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Times */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kalkış Saati
                  </label>
                  <input
                    type="datetime-local"
                    value={depTime}
                    onChange={e => setDepTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    İniş Saati
                  </label>
                  <input
                    type="datetime-local"
                    value={arrTime}
                    onChange={e => setArrTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Aircraft Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Kullanılacak Uçak (Filodan Seçim)
                </label>
                <select
                  value={selectedAircraftId}
                  onChange={e => setSelectedAircraftId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {airlineAircraft.map(ac => (
                    <option key={ac.aircraftId} value={ac.aircraftId}>
                      {ac.aircraftId} ({ac.type.modelName}) — {ac.status === 'OPERATIONAL' ? '✓ Çalışır' : '⚠ Onarımda'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Captain & Co-Pilot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kaptan Pilot
                  </label>
                  <select
                    value={selectedCaptainId}
                    onChange={e => setSelectedCaptainId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {airlinePilots.map(p => (
                      <option key={p.pilotId} value={p.pilotId}>
                        {p.firstName} {p.lastName} ({p.experienceLevel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Yardımcı Pilot (Co-Pilot)
                  </label>
                  <select
                    value={selectedCoPilotId}
                    onChange={e => setSelectedCoPilotId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {airlinePilots.map(p => (
                      <option key={p.pilotId} value={p.pilotId}>
                        {p.firstName} {p.lastName} ({p.experienceLevel})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Validation Rules Diagnostic Box */}
              <div
                className={`p-3 rounded-lg border text-xs transition-all ${
                  validation.isValid
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {validation.isValid ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Uçuş Kuralları Doğrulandı (Onaylı)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <span>Operasyonel Kural İhlali Tespit Edildi</span>
                    </>
                  )}
                </div>

                {validation.isValid ? (
                  <p className="text-[11px] text-emerald-300">
                    Uçak çalışır durumda, mürettebat yetkileri eksiksiz ve uçak tipi pilot gereksinimleri karşılandı.
                  </p>
                ) : (
                  <ul className="space-y-1 mt-1 text-[11px]">
                    {validation.errors.map((err, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!validation.isValid}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors ${
                  validation.isValid
                    ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4" />
                Uçuşu Onayla ve Filoya Kaydet
              </button>
            </form>
          </div>

          {/* Real-time System Log */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Sistem Olay Günlüğü
              </span>
              <span className="text-[11px] font-mono text-slate-400">Canlı Takip</span>
            </div>
            <div className="p-3 max-h-56 overflow-y-auto space-y-2 font-mono text-xs">
              {statusLog.map(log => (
                <div
                  key={log.id}
                  className="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-start gap-2"
                >
                  <span className="text-slate-500 text-[10px] shrink-0 mt-0.5">{log.time}</span>
                  <span
                    className={`leading-snug ${
                      log.type === 'success'
                        ? 'text-emerald-400'
                        : log.type === 'error'
                        ? 'text-rose-400'
                        : 'text-sky-300'
                    }`}
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Flights Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">
              Planlanan ve Gerçekleştirilen Uçuşlar ({currentAirline.flights.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {currentAirline.name} Sefer Çizelgesi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Uçuş Kodu</th>
                <th className="px-4 py-3">Rota</th>
                <th className="px-4 py-3">Kalkış - İniş</th>
                <th className="px-4 py-3">Uçak / Tip</th>
                <th className="px-4 py-3">Kaptan Pilot</th>
                <th className="px-4 py-3">Yardımcı Pilot</th>
                <th className="px-4 py-3">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {currentAirline.flights.map(fl => (
                <tr key={fl.flightId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-white text-sky-400">
                    {fl.flightId}
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <span className="font-bold text-white">{fl.departureAirport.airportId}</span>
                    <span className="text-slate-500 mx-1.5">→</span>
                    <span className="font-bold text-white">{fl.arrivalAirport.airportId}</span>
                    <div className="text-[11px] text-slate-500">
                      {fl.departureAirport.city} - {fl.arrivalAirport.city}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">
                    <div>{fl.departureTime.replace('T', ' ')}</div>
                    <div>{fl.arrivalTime.replace('T', ' ')}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{fl.aircraft.aircraftId}</div>
                    <div className="text-slate-500 text-[11px] font-sans">
                      {fl.aircraft.type.modelName}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <div className="text-white font-medium">
                      {fl.captainPilot.firstName} {fl.captainPilot.lastName}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      {fl.captainPilot.experienceLevel}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <div className="text-white font-medium">
                      {fl.coPilot.firstName} {fl.coPilot.lastName}
                    </div>
                    <div className="text-[11px] text-blue-400 font-mono">
                      {fl.coPilot.experienceLevel}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {fl.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
