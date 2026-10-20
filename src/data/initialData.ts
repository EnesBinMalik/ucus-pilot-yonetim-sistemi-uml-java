import {
  Aircraft,
  AircraftStatusInfo,
  AircraftType,
  Airline,
  Airport,
  ExperienceLevelInfo,
  Flight,
  Pilot,
} from '../types/domain';

export const AIRCRAFT_STATUS_METADATA: Record<string, AircraftStatusInfo> = {
  OPERATIONAL: {
    code: 'OPERATIONAL',
    labelTr: 'Çalışır Durumda',
    labelEn: 'Operational',
    descriptionTr: 'Uçak tüm teknik kontrollerden geçmiş, sefere ve uçuşa elverişlidir.',
  },
  UNDER_MAINTENANCE: {
    code: 'UNDER_MAINTENANCE',
    labelTr: 'Onarımda / Bakımda',
    labelEn: 'Under Maintenance',
    descriptionTr: 'Uçak hangarda periyodik bakım veya arıza giderme sürecindedir. Uçuşa atanamaz.',
  },
};

export const EXPERIENCE_LEVEL_METADATA: Record<string, ExperienceLevelInfo> = {
  JUNIOR: {
    code: 'JUNIOR',
    titleTr: 'Junior Pilot (İkinci Pilot Adayı)',
    titleEn: 'Junior First Officer',
    minHours: 500,
    canBeCaptain: false,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  MID_LEVEL: {
    code: 'MID_LEVEL',
    titleTr: 'First Officer (Kıdemli İkinci Pilot)',
    titleEn: 'First Officer',
    minHours: 2500,
    canBeCaptain: false,
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
  SENIOR: {
    code: 'SENIOR',
    titleTr: 'Kaptan Pilot (Captain)',
    titleEn: 'Captain',
    minHours: 5000,
    canBeCaptain: true,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  CHIEF_PILOT: {
    code: 'CHIEF_PILOT',
    titleTr: 'Başpilot / Tip Yetkili Kaptan (Examiner)',
    titleEn: 'Chief Pilot / TRI / TRE',
    minHours: 9000,
    canBeCaptain: true,
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
};

export const INITIAL_AIRCRAFT_TYPES: AircraftType[] = [
  {
    typeId: 'B738',
    modelName: 'Boeing 737-800',
    requiredPilotCount: 2,
    minCaptainLevel: 'SENIOR',
    passengerCapacity: 189,
    rangeKm: 5765,
  },
  {
    typeId: 'A321N',
    modelName: 'Airbus A321neo',
    requiredPilotCount: 2,
    minCaptainLevel: 'SENIOR',
    passengerCapacity: 239,
    rangeKm: 7400,
  },
  {
    typeId: 'A359',
    modelName: 'Airbus A350-900',
    requiredPilotCount: 2,
    minCaptainLevel: 'SENIOR',
    passengerCapacity: 329,
    rangeKm: 15000,
  },
  {
    typeId: 'B77W',
    modelName: 'Boeing 777-300ER',
    requiredPilotCount: 2,
    minCaptainLevel: 'CHIEF_PILOT',
    passengerCapacity: 349,
    rangeKm: 13649,
  },
];

export const INITIAL_AIRPORTS: Airport[] = [
  {
    airportId: 'IST',
    name: 'İstanbul Havalimanı',
    city: 'İstanbul',
    country: 'Türkiye',
  },
  {
    airportId: 'SAW',
    name: 'Sabiha Gökçen Havalimanı',
    city: 'İstanbul',
    country: 'Türkiye',
  },
  {
    airportId: 'ESB',
    name: 'Esenboğa Havalimanı',
    city: 'Ankara',
    country: 'Türkiye',
  },
  {
    airportId: 'AYT',
    name: 'Antalya Havalimanı',
    city: 'Antalya',
    country: 'Türkiye',
  },
  {
    airportId: 'ADB',
    name: 'Adnan Menderes Havalimanı',
    city: 'İzmir',
    country: 'Türkiye',
  },
  {
    airportId: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    country: 'Almanya',
  },
  {
    airportId: 'LHR',
    name: 'London Heathrow Airport',
    city: 'Londra',
    country: 'Birleşik Krallık',
  },
  {
    airportId: 'JFK',
    name: 'John F. Kennedy Intl Airport',
    city: 'New York',
    country: 'ABD',
  },
];

export const INITIAL_AIRCRAFT: Aircraft[] = [
  {
    aircraftId: 'TC-JYA',
    serialNumber: 'MSN-35712',
    type: INITIAL_AIRCRAFT_TYPES[0], // B738
    status: 'OPERATIONAL',
    airlineId: 'THY',
    manufactureYear: 2020,
  },
  {
    aircraftId: 'TC-LNA',
    serialNumber: 'MSN-08912',
    type: INITIAL_AIRCRAFT_TYPES[2], // A359
    status: 'OPERATIONAL',
    airlineId: 'THY',
    manufactureYear: 2022,
  },
  {
    aircraftId: 'TC-JHY',
    serialNumber: 'MSN-29401',
    type: INITIAL_AIRCRAFT_TYPES[3], // B77W
    status: 'UNDER_MAINTENANCE', // Onarım durumunda
    airlineId: 'THY',
    manufactureYear: 2018,
  },
  {
    aircraftId: 'TC-RBG',
    serialNumber: 'MSN-78120',
    type: INITIAL_AIRCRAFT_TYPES[1], // A321N
    status: 'OPERATIONAL',
    airlineId: 'PGS',
    manufactureYear: 2021,
  },
  {
    aircraftId: 'TC-CPK',
    serialNumber: 'MSN-51203',
    type: INITIAL_AIRCRAFT_TYPES[0], // B738
    status: 'UNDER_MAINTENANCE', // Onarımda
    airlineId: 'PGS',
    manufactureYear: 2017,
  },
  {
    aircraftId: 'TC-SOB',
    serialNumber: 'MSN-66129',
    type: INITIAL_AIRCRAFT_TYPES[0], // B738
    status: 'OPERATIONAL',
    airlineId: 'SXS',
    manufactureYear: 2023,
  },
];

export const INITIAL_PILOTS: Pilot[] = [
  {
    pilotId: 'PLT-001',
    firstName: 'Enes',
    lastName: 'Öztürk',
    licenseNumber: 'ATPL-TR-1923',
    experienceLevel: 'CHIEF_PILOT',
    totalFlightHours: 11400,
    airlineId: 'THY',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-002',
    firstName: 'Selin',
    lastName: 'Kaya',
    licenseNumber: 'ATPL-TR-3419',
    experienceLevel: 'SENIOR',
    totalFlightHours: 6200,
    airlineId: 'THY',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-003',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    licenseNumber: 'CPL-TR-5821',
    experienceLevel: 'MID_LEVEL',
    totalFlightHours: 2900,
    airlineId: 'THY',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-004',
    firstName: 'Burak',
    lastName: 'Demir',
    licenseNumber: 'CPL-TR-8902',
    experienceLevel: 'JUNIOR',
    totalFlightHours: 850,
    airlineId: 'THY',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-005',
    firstName: 'Canan',
    lastName: 'Vural',
    licenseNumber: 'ATPL-TR-4188',
    experienceLevel: 'SENIOR',
    totalFlightHours: 5800,
    airlineId: 'PGS',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-006',
    firstName: 'Murat',
    lastName: 'Arslan',
    licenseNumber: 'CPL-TR-7301',
    experienceLevel: 'MID_LEVEL',
    totalFlightHours: 2400,
    airlineId: 'PGS',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-007',
    firstName: 'Zeynep',
    lastName: 'Şahin',
    licenseNumber: 'CPL-TR-9114',
    experienceLevel: 'JUNIOR',
    totalFlightHours: 620,
    airlineId: 'PGS',
    status: 'AVAILABLE',
  },
  {
    pilotId: 'PLT-008',
    firstName: 'Emre',
    lastName: 'Güler',
    licenseNumber: 'ATPL-TR-2877',
    experienceLevel: 'SENIOR',
    totalFlightHours: 5400,
    airlineId: 'SXS',
    status: 'AVAILABLE',
  },
];

export const INITIAL_FLIGHTS: Flight[] = [
  {
    flightId: 'TK1923',
    airlineId: 'THY',
    departureAirport: INITIAL_AIRPORTS[0], // IST
    arrivalAirport: INITIAL_AIRPORTS[6],   // LHR
    departureTime: '2026-10-20T08:30:00',
    arrivalTime: '2026-10-20T10:45:00',
    aircraft: INITIAL_AIRCRAFT[1],         // TC-LNA (A359, OPERATIONAL)
    captainPilot: INITIAL_PILOTS[0],       // Enes Öztürk (Chief Pilot)
    coPilot: INITIAL_PILOTS[2],            // Ahmet Yılmaz (Mid-level)
    status: 'SCHEDULED',
  },
  {
    flightId: 'TK0001',
    airlineId: 'THY',
    departureAirport: INITIAL_AIRPORTS[0], // IST
    arrivalAirport: INITIAL_AIRPORTS[7],   // JFK
    departureTime: '2026-10-20T14:15:00',
    arrivalTime: '2026-10-20T18:50:00',
    aircraft: INITIAL_AIRCRAFT[0],         // TC-JYA (B738, OPERATIONAL)
    captainPilot: INITIAL_PILOTS[1],       // Selin Kaya (Senior)
    coPilot: INITIAL_PILOTS[3],            // Burak Demir (Junior)
    status: 'SCHEDULED',
  },
  {
    flightId: 'PC2024',
    airlineId: 'PGS',
    departureAirport: INITIAL_AIRPORTS[1], // SAW
    arrivalAirport: INITIAL_AIRPORTS[3],   // AYT
    departureTime: '2026-10-20T11:00:00',
    arrivalTime: '2026-10-20T12:15:00',
    aircraft: INITIAL_AIRCRAFT[3],         // TC-RBG (A321N, OPERATIONAL)
    captainPilot: INITIAL_PILOTS[4],       // Canan Vural (Senior)
    coPilot: INITIAL_PILOTS[5],            // Murat Arslan (Mid-level)
    status: 'SCHEDULED',
  },
];

export const INITIAL_AIRLINES: Airline[] = [
  {
    airlineId: 'THY',
    name: 'Türk Hava Yolları',
    iataCode: 'TK',
    callsign: 'TURKISH',
    fleet: INITIAL_AIRCRAFT.filter(a => a.airlineId === 'THY'),
    pilots: INITIAL_PILOTS.filter(p => p.airlineId === 'THY'),
    flights: INITIAL_FLIGHTS.filter(f => f.airlineId === 'THY'),
  },
  {
    airlineId: 'PGS',
    name: 'Pegasus Hava Yolları',
    iataCode: 'PC',
    callsign: 'SUNTURK',
    fleet: INITIAL_AIRCRAFT.filter(a => a.airlineId === 'PGS'),
    pilots: INITIAL_PILOTS.filter(p => p.airlineId === 'PGS'),
    flights: INITIAL_FLIGHTS.filter(f => f.airlineId === 'PGS'),
  },
  {
    airlineId: 'SXS',
    name: 'SunExpress',
    iataCode: 'XQ',
    callsign: 'SUNEXPRESS',
    fleet: INITIAL_AIRCRAFT.filter(a => a.airlineId === 'SXS'),
    pilots: INITIAL_PILOTS.filter(p => p.airlineId === 'SXS'),
    flights: INITIAL_FLIGHTS.filter(f => f.airlineId === 'SXS'),
  },
];
