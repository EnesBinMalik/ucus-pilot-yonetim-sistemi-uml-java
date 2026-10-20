export interface UMLAttribute {
  visibility: '+' | '-' | '#';
  name: string;
  type: string;
  isStatic?: boolean;
}

export interface UMLMethod {
  visibility: '+' | '-' | '#';
  name: string;
  parameters: string;
  returnType: string;
  isAbstract?: boolean;
}

export interface UMLClassNode {
  id: string;
  name: string;
  stereotype?: 'enumeration' | 'interface' | 'entity' | 'service';
  x: number;
  y: number;
  width: number;
  height: number;
  colorTheme: 'blue' | 'emerald' | 'amber' | 'purple' | 'cyan' | 'rose';
  attributes: UMLAttribute[];
  methods: UMLMethod[];
  javaFileName: string;
  descriptionTr: string;
  rulesHighlightTr?: string[];
}

export interface UMLRelationship {
  id: string;
  from: string;
  to: string;
  type: 'composition' | 'aggregation' | 'association' | 'dependency';
  fromMultiplicity?: string;
  toMultiplicity?: string;
  label?: string;
  fromAnchor?: 'top' | 'bottom' | 'left' | 'right';
  toAnchor?: 'top' | 'bottom' | 'left' | 'right';
  descriptionTr: string;
}

export const UML_CLASSES: UMLClassNode[] = [
  {
    id: 'Airline',
    name: 'Airline',
    stereotype: 'entity',
    x: 40,
    y: 60,
    width: 290,
    height: 300,
    colorTheme: 'blue',
    javaFileName: 'Airline.java',
    descriptionTr: 'Hava yolu şirketlerini temsil eder. Her hava yolunun benzersiz bir kimliği vardır.',
    rulesHighlightTr: [
      'Her hava yolu şirketinin benzersiz bir kimliği (airlineId) vardır.',
      'Farklı tipteki uçaklara (fleet) ve pilotlara (pilots) sahiptir.',
      'Uçuşları gerçekleştirir (flights).',
    ],
    attributes: [
      { visibility: '-', name: 'airlineId', type: 'String' },
      { visibility: '-', name: 'name', type: 'String' },
      { visibility: '-', name: 'fleet', type: 'List<Aircraft>' },
      { visibility: '-', name: 'pilots', type: 'List<Pilot>' },
      { visibility: '-', name: 'flights', type: 'List<Flight>' },
    ],
    methods: [
      { visibility: '+', name: 'addAircraft', parameters: 'aircraft: Aircraft', returnType: 'void' },
      { visibility: '+', name: 'hirePilot', parameters: 'pilot: Pilot', returnType: 'void' },
      { visibility: '+', name: 'scheduleFlight', parameters: 'flight: Flight', returnType: 'void' },
      { visibility: '+', name: 'getOperationalAircraft', parameters: '', returnType: 'List<Aircraft>' },
      { visibility: '+', name: 'getFleet', parameters: '', returnType: 'List<Aircraft>' },
      { visibility: '+', name: 'getPilots', parameters: '', returnType: 'List<Pilot>' },
    ],
  },
  {
    id: 'Aircraft',
    name: 'Aircraft',
    stereotype: 'entity',
    x: 440,
    y: 60,
    width: 290,
    height: 300,
    colorTheme: 'cyan',
    javaFileName: 'Aircraft.java',
    descriptionTr: 'Filodaki uçak varlığı. Çalışır (OPERATIONAL) veya onarımda (UNDER_MAINTENANCE) olabilir.',
    rulesHighlightTr: [
      'Uçaklar çalışır veya onarım durumunda olabilir (AircraftStatus).',
      'Her uçak belirli bir AircraftType tipine aittir.',
      'Sadece çalışır durumdaki uçaklar sefere atanabilir.',
    ],
    attributes: [
      { visibility: '-', name: 'aircraftId', type: 'String' },
      { visibility: '-', name: 'serialNumber', type: 'String' },
      { visibility: '-', name: 'type', type: 'AircraftType' },
      { visibility: '-', name: 'status', type: 'AircraftStatus' },
      { visibility: '-', name: 'manufactureYear', type: 'int' },
    ],
    methods: [
      { visibility: '+', name: 'getStatus', parameters: '', returnType: 'AircraftStatus' },
      { visibility: '+', name: 'setStatus', parameters: 'status: AircraftStatus', returnType: 'void' },
      { visibility: '+', name: 'isFlightReady', parameters: '', returnType: 'boolean' },
      { visibility: '+', name: 'sendToMaintenance', parameters: '', returnType: 'void' },
      { visibility: '+', name: 'completeMaintenance', parameters: '', returnType: 'void' },
      { visibility: '+', name: 'getType', parameters: '', returnType: 'AircraftType' },
    ],
  },
  {
    id: 'AircraftType',
    name: 'AircraftType',
    stereotype: 'entity',
    x: 840,
    y: 60,
    width: 290,
    height: 290,
    colorTheme: 'purple',
    javaFileName: 'AircraftType.java',
    descriptionTr: 'Uçak tiplerini tanımlar. Bir uçak tipi belirli sayıda pilota ihtiyaç duyabilir.',
    rulesHighlightTr: [
      'Bir uçak tipi, belirli sayıda pilota ihtiyaç duyabilir (requiredPilotCount).',
      'Kaptan için gereken asgari deneyim seviyesini (minCaptainLevel) belirler.',
    ],
    attributes: [
      { visibility: '-', name: 'typeId', type: 'String' },
      { visibility: '-', name: 'modelName', type: 'String' },
      { visibility: '-', name: 'requiredPilotCount', type: 'int' },
      { visibility: '-', name: 'minCaptainLevel', type: 'ExperienceLevel' },
      { visibility: '-', name: 'passengerCapacity', type: 'int' },
      { visibility: '-', name: 'rangeKm', type: 'double' },
    ],
    methods: [
      { visibility: '+', name: 'getTypeId', parameters: '', returnType: 'String' },
      { visibility: '+', name: 'getModelName', parameters: '', returnType: 'String' },
      { visibility: '+', name: 'getRequiredPilotCount', parameters: '', returnType: 'int' },
      { visibility: '+', name: 'getMinCaptainLevel', parameters: '', returnType: 'ExperienceLevel' },
    ],
  },
  {
    id: 'AircraftStatus',
    name: 'AircraftStatus',
    stereotype: 'enumeration',
    x: 440,
    y: 430,
    width: 260,
    height: 190,
    colorTheme: 'amber',
    javaFileName: 'AircraftStatus.java',
    descriptionTr: 'Uçakların operasyonel durumu: OPERATIONAL (Çalışır), UNDER_MAINTENANCE (Onarımda).',
    rulesHighlightTr: [
      'OPERATIONAL: Uçak uçar/seferde.',
      'UNDER_MAINTENANCE: Onarım durumunda, uçağa uçuş atanamaz.',
    ],
    attributes: [
      { visibility: '+', name: 'OPERATIONAL', type: 'AircraftStatus', isStatic: true },
      { visibility: '+', name: 'UNDER_MAINTENANCE', type: 'AircraftStatus', isStatic: true },
      { visibility: '-', name: 'description', type: 'String' },
      { visibility: '-', name: 'isFlightReady', type: 'boolean' },
    ],
    methods: [
      { visibility: '+', name: 'getDescription', parameters: '', returnType: 'String' },
      { visibility: '+', name: 'isFlightReady', parameters: '', returnType: 'boolean' },
    ],
  },
  {
    id: 'Flight',
    name: 'Flight',
    stereotype: 'entity',
    x: 40,
    y: 450,
    width: 320,
    height: 380,
    colorTheme: 'emerald',
    javaFileName: 'Flight.java',
    descriptionTr: 'Uçuş varlığı. Benzersiz kimlik, kalkış/iniş havaalanları, saatler, uçak ve iki pilot.',
    rulesHighlightTr: [
      'Her uçuşun benzersiz kimliği (flightId), kalkış ve iniş havaalanları, kalkış ve iniş saatleri vardır.',
      'Her uçuşun bir pilotu (captainPilot) ve yardımcı pilotu (coPilot) vardır ve uçağı kullanırlar.',
      'Uçağın çalışır durumda olması şarttır; onarımdaki uçakla uçuş açılamaz.',
      'Kaptan ve yardımcı pilot aynı kişi olamaz.',
    ],
    attributes: [
      { visibility: '-', name: 'flightId', type: 'String' },
      { visibility: '-', name: 'departureAirport', type: 'Airport' },
      { visibility: '-', name: 'arrivalAirport', type: 'Airport' },
      { visibility: '-', name: 'departureTime', type: 'LocalDateTime' },
      { visibility: '-', name: 'arrivalTime', type: 'LocalDateTime' },
      { visibility: '-', name: 'aircraft', type: 'Aircraft' },
      { visibility: '-', name: 'captainPilot', type: 'Pilot' },
      { visibility: '-', name: 'coPilot', type: 'Pilot' },
      { visibility: '-', name: 'status', type: 'FlightStatus' },
    ],
    methods: [
      { visibility: '+', name: 'assignAircraftAndCrew', parameters: 'aircraft, captain, coPilot', returnType: 'void' },
      { visibility: '+', name: 'getDepartureAirport', parameters: '', returnType: 'Airport' },
      { visibility: '+', name: 'getArrivalAirport', parameters: '', returnType: 'Airport' },
      { visibility: '+', name: 'getAircraft', parameters: '', returnType: 'Aircraft' },
      { visibility: '+', name: 'getCaptainPilot', parameters: '', returnType: 'Pilot' },
      { visibility: '+', name: 'getCoPilot', parameters: '', returnType: 'Pilot' },
    ],
  },
  {
    id: 'Pilot',
    name: 'Pilot',
    stereotype: 'entity',
    x: 440,
    y: 690,
    width: 290,
    height: 320,
    colorTheme: 'rose',
    javaFileName: 'Pilot.java',
    descriptionTr: 'Havayolu pilotları. Her pilotun bir deneyim seviyesi ve uçuş saati mevcuttur.',
    rulesHighlightTr: [
      'Hava yolu şirketlerinin pilotları vardır.',
      'Her pilotun bir deneyim seviyesi (experienceLevel) mevcuttur.',
      'Kaptan olabilmek için asgari deneyim seviyesi karşılanmalıdır.',
    ],
    attributes: [
      { visibility: '-', name: 'pilotId', type: 'String' },
      { visibility: '-', name: 'firstName', type: 'String' },
      { visibility: '-', name: 'lastName', type: 'String' },
      { visibility: '-', name: 'licenseNumber', type: 'String' },
      { visibility: '-', name: 'experienceLevel', type: 'ExperienceLevel' },
      { visibility: '-', name: 'totalFlightHours', type: 'int' },
    ],
    methods: [
      { visibility: '+', name: 'getFullName', parameters: '', returnType: 'String' },
      { visibility: '+', name: 'getExperienceLevel', parameters: '', returnType: 'ExperienceLevel' },
      { visibility: '+', name: 'canActAsCaptain', parameters: '', returnType: 'boolean' },
      { visibility: '+', name: 'addFlightHours', parameters: 'hours: int', returnType: 'void' },
    ],
  },
  {
    id: 'ExperienceLevel',
    name: 'ExperienceLevel',
    stereotype: 'enumeration',
    x: 840,
    y: 690,
    width: 290,
    height: 280,
    colorTheme: 'purple',
    javaFileName: 'ExperienceLevel.java',
    descriptionTr: 'Deneyim seviyeleri: JUNIOR, MID_LEVEL, SENIOR, CHIEF_PILOT.',
    rulesHighlightTr: [
      'Pilotların kıdem hiyerarşisi.',
      'Kaptanlık yapabilme kriterini belirler (qualifiedForCaptain).',
    ],
    attributes: [
      { visibility: '+', name: 'JUNIOR', type: 'ExperienceLevel', isStatic: true },
      { visibility: '+', name: 'MID_LEVEL', type: 'ExperienceLevel', isStatic: true },
      { visibility: '+', name: 'SENIOR', type: 'ExperienceLevel', isStatic: true },
      { visibility: '+', name: 'CHIEF_PILOT', type: 'ExperienceLevel', isStatic: true },
      { visibility: '-', name: 'minimumFlightHours', type: 'int' },
      { visibility: '-', name: 'qualifiedForCaptain', type: 'boolean' },
    ],
    methods: [
      { visibility: '+', name: 'isQualifiedForCaptain', parameters: '', returnType: 'boolean' },
      { visibility: '+', name: 'satisfies', parameters: 'required: ExperienceLevel', returnType: 'boolean' },
    ],
  },
  {
    id: 'Airport',
    name: 'Airport',
    stereotype: 'entity',
    x: 40,
    y: 910,
    width: 290,
    height: 240,
    colorTheme: 'cyan',
    javaFileName: 'Airport.java',
    descriptionTr: 'Havaalanları. Benzersiz kimlikleri (IATA) ve isimleri vardır.',
    rulesHighlightTr: [
      'Havaalanlarının benzersiz kimlikleri (airportId) ve isimleri (name) vardır.',
      'Bir uçuşun kalkış ve varış havaalanı olarak kullanılır.',
    ],
    attributes: [
      { visibility: '-', name: 'airportId', type: 'String' },
      { visibility: '-', name: 'name', type: 'String' },
      { visibility: '-', name: 'city', type: 'String' },
      { visibility: '-', name: 'country', type: 'String' },
    ],
    methods: [
      { visibility: '+', name: 'getAirportId', parameters: '', returnType: 'String' },
      { visibility: '+', name: 'getName', parameters: '', returnType: 'String' },
    ],
  },
];

export const UML_RELATIONSHIPS: UMLRelationship[] = [
  {
    id: 'rel_airline_fleet',
    from: 'Airline',
    to: 'Aircraft',
    type: 'composition',
    fromMultiplicity: '1',
    toMultiplicity: '0..*',
    label: 'fleet (sahiptir)',
    descriptionTr: 'Hava yolu şirketi farklı tipteki uçaklara sahiptir (Bileşim - Composition)',
  },
  {
    id: 'rel_airline_pilots',
    from: 'Airline',
    to: 'Pilot',
    type: 'aggregation',
    fromMultiplicity: '1',
    toMultiplicity: '1..*',
    label: 'pilots (istihdam eder)',
    descriptionTr: 'Hava yolu şirketlerinin pilotları vardır (Toplama - Aggregation)',
  },
  {
    id: 'rel_airline_flights',
    from: 'Airline',
    to: 'Flight',
    type: 'association',
    fromMultiplicity: '1',
    toMultiplicity: '0..*',
    label: 'gerçekleştirir',
    descriptionTr: 'Hava yolu şirketleri uçuşları gerçekleştirir (1:N İlişkisi)',
  },
  {
    id: 'rel_aircraft_type',
    from: 'Aircraft',
    to: 'AircraftType',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'tipi',
    descriptionTr: 'Her uçak belirli bir uçak tipine aittir (N:1 İlişkisi)',
  },
  {
    id: 'rel_aircraft_status',
    from: 'Aircraft',
    to: 'AircraftStatus',
    type: 'association',
    fromMultiplicity: '1',
    toMultiplicity: '1',
    label: 'durumu',
    descriptionTr: 'Uçaklar çalışır veya onarım durumunda olabilir (1:1 Enum İlişkisi)',
  },
  {
    id: 'rel_flight_aircraft',
    from: 'Flight',
    to: 'Aircraft',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'uçağı kullanır',
    descriptionTr: 'Uçuş operasyonunda atanan ve çalışır durumda olan uçak',
  },
  {
    id: 'rel_flight_captain',
    from: 'Flight',
    to: 'Pilot',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'captainPilot (kullanır)',
    descriptionTr: 'Her uçuşun bir kaptan pilotu vardır ve uçağı kullanır',
  },
  {
    id: 'rel_flight_copilot',
    from: 'Flight',
    to: 'Pilot',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'coPilot (kullanır)',
    descriptionTr: 'Her uçuşun bir yardımcı pilotu vardır ve uçağı kullanır',
  },
  {
    id: 'rel_flight_dep_airport',
    from: 'Flight',
    to: 'Airport',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'departureAirport',
    descriptionTr: 'Uçuşun kalkacağı havaalanı',
  },
  {
    id: 'rel_flight_arr_airport',
    from: 'Flight',
    to: 'Airport',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'arrivalAirport',
    descriptionTr: 'Uçuşun ineceği havaalanı',
  },
  {
    id: 'rel_pilot_exp',
    from: 'Pilot',
    to: 'ExperienceLevel',
    type: 'association',
    fromMultiplicity: '1',
    toMultiplicity: '1',
    label: 'deneyim seviyesi',
    descriptionTr: 'Her pilotun bir deneyim seviyesi mevcuttur',
  },
  {
    id: 'rel_type_exp',
    from: 'AircraftType',
    to: 'ExperienceLevel',
    type: 'association',
    fromMultiplicity: '0..*',
    toMultiplicity: '1',
    label: 'minCaptainLevel',
    descriptionTr: 'Uçak tipi için asgari gereken kaptan deneyim düzeyi',
  },
];
