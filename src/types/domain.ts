export type AircraftStatusCode = 'OPERATIONAL' | 'UNDER_MAINTENANCE';

export interface AircraftStatusInfo {
  code: AircraftStatusCode;
  labelTr: string;
  labelEn: string;
  descriptionTr: string;
}

export type ExperienceLevelCode = 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'CHIEF_PILOT';

export interface ExperienceLevelInfo {
  code: ExperienceLevelCode;
  titleTr: string;
  titleEn: string;
  minHours: number;
  canBeCaptain: boolean;
  badgeColor: string;
}

export interface Airport {
  airportId: string; // e.g. "IST", "SAW", "ESB"
  name: string;      // e.g. "İstanbul Havalimanı"
  city: string;
  country: string;
}

export interface AircraftType {
  typeId: string;           // e.g. "B738", "A359", "B77W"
  modelName: string;        // e.g. "Boeing 737-800", "Airbus A350-900"
  requiredPilotCount: number; // Her uçak tipi belirli sayıda pilota ihtiyaç duyar (genellikle 2, ağır uçaklarda ek pilot)
  minCaptainLevel: ExperienceLevelCode;
  passengerCapacity: number;
  rangeKm: number;
}

export interface Aircraft {
  aircraftId: string;       // e.g. "TC-JYA", "TC-LNA"
  serialNumber: string;
  type: AircraftType;
  status: AircraftStatusCode; // "Çalışır" veya "Onarım"
  airlineId: string;
  manufactureYear: number;
}

export interface Pilot {
  pilotId: string;          // e.g. "PLT-101"
  firstName: string;
  lastName: string;
  licenseNumber: string;    // e.g. "ATPL-7482"
  experienceLevel: ExperienceLevelCode; // Deneyim seviyesi
  totalFlightHours: number;
  airlineId: string;
  status: 'AVAILABLE' | 'ON_FLIGHT' | 'RESTING';
}

export type FlightStatusCode = 'SCHEDULED' | 'BOARDING' | 'IN_FLIGHT' | 'LANDED' | 'CANCELLED';

export interface Flight {
  flightId: string;          // Benzersiz uçuş kimliği, örn: "TK1923"
  airlineId: string;
  departureAirport: Airport; // Kalkacağı havaalanı
  arrivalAirport: Airport;   // İneceği havaalanı
  departureTime: string;     // ISO String or formatted time
  arrivalTime: string;       // ISO String or formatted time
  aircraft: Aircraft;        // Kullanılan uçak
  captainPilot: Pilot;       // Kaptan pilot
  coPilot: Pilot;            // Yardımcı pilot
  status: FlightStatusCode;
}

export interface Airline {
  airlineId: string;         // Benzersiz kimlik, örn: "THY", "PGS"
  name: string;              // Hava yolu şirket ismi
  iataCode: string;
  callsign: string;
  fleet: Aircraft[];         // Farklı tipteki uçaklar
  pilots: Pilot[];           // Hava yolu şirketinin pilotları
  flights: Flight[];         // Gerçekleştirilen uçuşlar
}

export interface FlightValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
