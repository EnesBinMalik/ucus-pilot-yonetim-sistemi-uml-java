export interface JavaFile {
  name: string;
  packagePath: string;
  category: 'model' | 'service' | 'exception' | 'main';
  descriptionTr: string;
  code: string;
}

export const JAVA_FILES: JavaFile[] = [
  {
    name: 'AircraftStatus.java',
    packagePath: 'com/enesozturk/flightmgmt/model/AircraftStatus.java',
    category: 'model',
    descriptionTr: 'Uçakların operasyonel durumunu belirten Enum sınıfı (Çalışır / Onarımda)',
    code: `package com.enesozturk.flightmgmt.model;

/**
 * Uçağın güncel teknik ve operasyonel durumunu temsil eder.
 * Uçaklar çalışır (OPERATIONAL) veya onarımda (UNDER_MAINTENANCE) olabilir.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public enum AircraftStatus {
    /**
     * Uçak faaldir, tüm teknik kontroller tamamlanmıştır ve uçuşa hazırdır.
     */
    OPERATIONAL("Çalışır Durumda", true),

    /**
     * Uçak bakım veya onarım sürecindedir. Uçuşa atanamaz ve sefere çıkamaz.
     */
    UNDER_MAINTENANCE("Onarımda / Bakımda", false);

    private final String description;
    private final boolean isFlightReady;

    AircraftStatus(String description, boolean isFlightReady) {
        this.description = description;
        this.isFlightReady = isFlightReady;
    }

    public String getDescription() {
        return description;
    }

    public boolean isFlightReady() {
        return isFlightReady;
    }
}
`,
  },
  {
    name: 'ExperienceLevel.java',
    packagePath: 'com/enesozturk/flightmgmt/model/ExperienceLevel.java',
    category: 'model',
    descriptionTr: 'Pilotların kıdem ve deneyim seviyelerini yöneten Enum sınıfı',
    code: `package com.enesozturk.flightmgmt.model;

/**
 * Pilotun sahip olduğu deneyim seviyesini ve asgari gereksinimleri temsil eder.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public enum ExperienceLevel {
    JUNIOR("İkinci Pilot Adayı (Junior First Officer)", 500, 1, false),
    MID_LEVEL("Kıdemli İkinci Pilot (Senior First Officer)", 2000, 2, false),
    SENIOR("Kaptan Pilot (Captain)", 4500, 3, true),
    CHIEF_PILOT("Başpilot / Tip Yetkili Kaptan (TRI/TRE)", 8000, 4, true);

    private final String title;
    private final int minimumFlightHours;
    private final int rankOrder;
    private final boolean qualifiedForCaptain;

    ExperienceLevel(String title, int minimumFlightHours, int rankOrder, boolean qualifiedForCaptain) {
        this.title = title;
        this.minimumFlightHours = minimumFlightHours;
        this.rankOrder = rankOrder;
        this.qualifiedForCaptain = qualifiedForCaptain;
    }

    public String getTitle() {
        return title;
    }

    public int getMinimumFlightHours() {
        return minimumFlightHours;
    }

    public int getRankOrder() {
        return rankOrder;
    }

    public boolean isQualifiedForCaptain() {
        return qualifiedForCaptain;
    }

    /**
     * Bu deneyim seviyesinin verilen hedef seviyeyi karşılayıp karşılamadığını kontrol eder.
     */
    public boolean satisfies(ExperienceLevel requiredLevel) {
        return this.rankOrder >= requiredLevel.rankOrder;
    }
}
`,
  },
  {
    name: 'Airport.java',
    packagePath: 'com/enesozturk/flightmgmt/model/Airport.java',
    category: 'model',
    descriptionTr: 'Havaalanı kimliği ve isim bilgilerini kapsülleyen sınıf',
    code: `package com.enesozturk.flightmgmt.model;

import java.util.Objects;

/**
 * Havaalanlarını temsil eden sınıf.
 * Her havaalanının benzersiz bir kimliği (IATA/ICAO) ve ismi vardır.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class Airport {
    private final String airportId; // Benzersiz kimlik (örn. "IST", "SAW", "ESB")
    private final String name;      // İsim (örn. "İstanbul Havalimanı")
    private final String city;
    private final String country;

    public Airport(String airportId, String name, String city, String country) {
        if (airportId == null || airportId.trim().isEmpty()) {
            throw new IllegalArgumentException("Havaalanı kimliği boş olamaz!");
        }
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Havaalanı ismi boş olamaz!");
        }
        this.airportId = airportId.trim().toUpperCase();
        this.name = name.trim();
        this.city = city != null ? city.trim() : "";
        this.country = country != null ? country.trim() : "";
    }

    public String getAirportId() {
        return airportId;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Airport airport = (Airport) o;
        return Objects.equals(airportId, airport.airportId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(airportId);
    }

    @Override
    public String toString() {
        return String.format("%s [%s - %s, %s]", name, airportId, city, country);
    }
}
`,
  },
  {
    name: 'AircraftType.java',
    packagePath: 'com/enesozturk/flightmgmt/model/AircraftType.java',
    category: 'model',
    descriptionTr: 'Uçak tiplerini ve pilot gereksinimlerini belirleyen sınıf',
    code: `package com.enesozturk.flightmgmt.model;

import java.util.Objects;

/**
 * Uçak tipini ve bu tipin ihtiyaç duyduğu asgari pilot gereksinimlerini tanımlar.
 * "Bir uçak tipi, belirli sayıda pilota ihtiyaç duyabilir."
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class AircraftType {
    private final String typeId;                  // Örn: "B738", "A359", "B77W"
    private final String modelName;               // Örn: "Boeing 737-800", "Airbus A350-900"
    private final int requiredPilotCount;         // Gereken pilot sayısı (Kaptan + Yardımcı Pilot)
    private final ExperienceLevel minCaptainLevel;// Kaptan için asgari deneyim seviyesi
    private final int passengerCapacity;
    private final double rangeKm;

    public AircraftType(String typeId, String modelName, int requiredPilotCount, 
                        ExperienceLevel minCaptainLevel, int passengerCapacity, double rangeKm) {
        if (typeId == null || typeId.trim().isEmpty()) {
            throw new IllegalArgumentException("Uçak tipi kimliği boş olamaz!");
        }
        if (requiredPilotCount < 2) {
            throw new IllegalArgumentException("Ticari uçuşlarda en az 2 pilot (Kaptan + Yardımcı) zorunludur!");
        }
        this.typeId = typeId.trim().toUpperCase();
        this.modelName = modelName.trim();
        this.requiredPilotCount = requiredPilotCount;
        this.minCaptainLevel = minCaptainLevel != null ? minCaptainLevel : ExperienceLevel.SENIOR;
        this.passengerCapacity = passengerCapacity;
        this.rangeKm = rangeKm;
    }

    public String getTypeId() {
        return typeId;
    }

    public String getModelName() {
        return modelName;
    }

    public int getRequiredPilotCount() {
        return requiredPilotCount;
    }

    public ExperienceLevel getMinCaptainLevel() {
        return minCaptainLevel;
    }

    public int getPassengerCapacity() {
        return passengerCapacity;
    }

    public double getRangeKm() {
        return rangeKm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AircraftType that = (AircraftType) o;
        return Objects.equals(typeId, that.typeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(typeId);
    }

    @Override
    public String toString() {
        return String.format("%s (Tip: %s, Gerekli Pilot: %d, Min Kaptan: %s)",
                modelName, typeId, requiredPilotCount, minCaptainLevel.name());
    }
}
`,
  },
  {
    name: 'Aircraft.java',
    packagePath: 'com/enesozturk/flightmgmt/model/Aircraft.java',
    category: 'model',
    descriptionTr: 'Filodaki uçakları ve çalışma/onarım durumlarını yöneten sınıf',
    code: `package com.enesozturk.flightmgmt.model;

import java.util.Objects;

/**
 * Havayolu filosundaki fiziksel bir uçağı temsil eder.
 * Uçaklar çalışır (OPERATIONAL) veya onarım (UNDER_MAINTENANCE) durumunda olabilir.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class Aircraft {
    private final String aircraftId;       // Kuyruk tescil numarası (örn: "TC-JYA")
    private final String serialNumber;     // Üretici seri numarası
    private final AircraftType type;       // Uçağın tipi
    private AircraftStatus status;         // Çalışır veya onarım durumu
    private final int manufactureYear;

    public Aircraft(String aircraftId, String serialNumber, AircraftType type, 
                    AircraftStatus status, int manufactureYear) {
        if (aircraftId == null || aircraftId.trim().isEmpty()) {
            throw new IllegalArgumentException("Uçak kuyruk tescil kimliği boş olamaz!");
        }
        if (type == null) {
            throw new IllegalArgumentException("Uçak tipi zorunludur!");
        }
        this.aircraftId = aircraftId.trim().toUpperCase();
        this.serialNumber = serialNumber;
        this.type = type;
        this.status = status != null ? status : AircraftStatus.OPERATIONAL;
        this.manufactureYear = manufactureYear;
    }

    public String getAircraftId() {
        return aircraftId;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public AircraftType getType() {
        return type;
    }

    public AircraftStatus getStatus() {
        return status;
    }

    public void setStatus(AircraftStatus status) {
        if (status == null) {
            throw new IllegalArgumentException("Durum boş olamaz!");
        }
        this.status = status;
    }

    /**
     * Uçağın sefere elverişli olup olmadığını bildirir.
     */
    public boolean isFlightReady() {
        return this.status == AircraftStatus.OPERATIONAL;
    }

    public void sendToMaintenance() {
        this.status = AircraftStatus.UNDER_MAINTENANCE;
    }

    public void completeMaintenance() {
        this.status = AircraftStatus.OPERATIONAL;
    }

    public int getManufactureYear() {
        return manufactureYear;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aircraft aircraft = (Aircraft) o;
        return Objects.equals(aircraftId, aircraft.aircraftId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aircraftId);
    }

    @Override
    public String toString() {
        return String.format("Uçak [%s] - %s | Durum: %s", 
                aircraftId, type.getModelName(), status.getDescription());
    }
}
`,
  },
  {
    name: 'Pilot.java',
    packagePath: 'com/enesozturk/flightmgmt/model/Pilot.java',
    category: 'model',
    descriptionTr: 'Pilot bilgilerini, deneyim seviyelerini ve uçuş saatlerini tutan sınıf',
    code: `package com.enesozturk.flightmgmt.model;

import java.util.Objects;

/**
 * Havayolu şirketine bağlı pilotları temsil eder.
 * Her pilotun bir deneyim seviyesi ve lisansı mevcuttur.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class Pilot {
    private final String pilotId;              // Benzersiz kimlik (örn: "PLT-001")
    private final String firstName;
    private final String lastName;
    private final String licenseNumber;        // Lisans numarası (örn: "ATPL-1923")
    private ExperienceLevel experienceLevel;   // Deneyim seviyesi
    private int totalFlightHours;              // Toplam uçuş saati

    public Pilot(String pilotId, String firstName, String lastName, 
                 String licenseNumber, ExperienceLevel experienceLevel, int totalFlightHours) {
        if (pilotId == null || pilotId.trim().isEmpty()) {
            throw new IllegalArgumentException("Pilot kimliği boş olamaz!");
        }
        this.pilotId = pilotId.trim();
        this.firstName = firstName != null ? firstName.trim() : "";
        this.lastName = lastName != null ? lastName.trim() : "";
        this.licenseNumber = licenseNumber != null ? licenseNumber.trim() : "";
        this.experienceLevel = experienceLevel != null ? experienceLevel : ExperienceLevel.JUNIOR;
        this.totalFlightHours = Math.max(0, totalFlightHours);
    }

    public String getPilotId() {
        return pilotId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public ExperienceLevel getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(ExperienceLevel experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public int getTotalFlightHours() {
        return totalFlightHours;
    }

    public void addFlightHours(int hours) {
        if (hours > 0) {
            this.totalFlightHours += hours;
        }
    }

    public boolean canActAsCaptain() {
        return this.experienceLevel.isQualifiedForCaptain();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pilot pilot = (Pilot) o;
        return Objects.equals(pilotId, pilot.pilotId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pilotId);
    }

    @Override
    public String toString() {
        return String.format("Pilot [%s]: %s (%s, %d saat)", 
                pilotId, getFullName(), experienceLevel.getTitle(), totalFlightHours);
    }
}
`,
  },
  {
    name: 'Flight.java',
    packagePath: 'com/enesozturk/flightmgmt/model/Flight.java',
    category: 'model',
    descriptionTr: 'Uçuş varlığı; uçak, kaptan, yardımcı pilot, havaalanları ve zaman doğrulama kurallarını işletir',
    code: `package com.enesozturk.flightmgmt.model;

import com.enesozturk.flightmgmt.exception.FlightOperationException;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Uçuş varlığını temsil eder.
 * Her uçuşun benzersiz kimliği, kalkacağı ve ineceği havaalanı, kalkış/iniş saatleri vardır.
 * Her uçuşun bir kaptan pilotu ve yardımcı pilotu vardır ve uçağı kullanırlar.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class Flight {
    private final String flightId;               // Benzersiz uçuş kimliği (örn: "TK1923")
    private final Airport departureAirport;      // Kalkacağı havaalanı
    private final Airport arrivalAirport;        // İneceği havaalanı
    private final LocalDateTime departureTime;   // Kalkış saati
    private final LocalDateTime arrivalTime;     // İniş saati
    private Aircraft aircraft;                   // Uçuşta kullanılan uçak
    private Pilot captainPilot;                  // Kaptan pilot
    private Pilot coPilot;                       // Yardımcı pilot
    private FlightStatus status;                 // Uçuş durumu

    public Flight(String flightId, Airport departureAirport, Airport arrivalAirport,
                  LocalDateTime departureTime, LocalDateTime arrivalTime,
                  Aircraft aircraft, Pilot captainPilot, Pilot coPilot) {
        
        // 1. Temel Doğrulamalar
        if (flightId == null || flightId.trim().isEmpty()) {
            throw new IllegalArgumentException("Uçuş kimliği boş olamaz!");
        }
        if (departureAirport == null || arrivalAirport == null) {
            throw new IllegalArgumentException("Kalkış ve iniş havaalanları tanımlı olmalıdır!");
        }
        if (departureAirport.equals(arrivalAirport)) {
            throw new IllegalArgumentException("Kalkış havaalanı ile iniş havaalanı aynı olamaz!");
        }
        if (departureTime == null || arrivalTime == null) {
            throw new IllegalArgumentException("Kalkış ve iniş saatleri zorunludur!");
        }
        if (!arrivalTime.isAfter(departureTime)) {
            throw new IllegalArgumentException("İniş saati kalkış saatinden sonra olmalıdır!");
        }

        this.flightId = flightId.trim().toUpperCase();
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.status = FlightStatus.SCHEDULED;

        // 2. Uçak ve Mürettebat Ataması ve Kural Doğrulaması
        assignAircraftAndCrew(aircraft, captainPilot, coPilot);
    }

    /**
     * Uçak, kaptan pilot ve yardımcı pilotu doğrulamalar eşliğinde atar.
     */
    public final void assignAircraftAndCrew(Aircraft aircraft, Pilot captain, Pilot coPilot) {
        if (aircraft == null) {
            throw new FlightOperationException("Uçuşa geçerli bir uçak atanmalıdır!");
        }
        // Kural: Uçaklar çalışır durumda olmalıdır!
        if (aircraft.getStatus() == AircraftStatus.UNDER_MAINTENANCE) {
            throw new FlightOperationException(
                String.format("Uçuş planlanamaz! [%s] kuyruk numaralı uçak ONARIMDA/BAKIMDA durumundadır.", 
                              aircraft.getAircraftId())
            );
        }

        if (captain == null || coPilot == null) {
            throw new FlightOperationException("Uçuş için hem Kaptan Pilot hem de Yardımcı Pilot zorunludur!");
        }

        // Kural: Kaptan ve yardımcı pilot aynı kişi olamaz!
        if (captain.equals(coPilot)) {
            throw new FlightOperationException("Kaptan pilot ile yardımcı pilot aynı kişi olamaz!");
        }

        // Kural: Kaptan pilot asgari deneyim seviyesine sahip olmalıdır
        if (!captain.canActAsCaptain()) {
            throw new FlightOperationException(
                String.format("Pilot %s kaptanlık yetkisine sahip değildir! (Deneyim: %s)",
                              captain.getFullName(), captain.getExperienceLevel().getTitle())
            );
        }

        // Kural: Uçak tipinin kaptan deneyim gereksinimini karşılama
        ExperienceLevel requiredLevel = aircraft.getType().getMinCaptainLevel();
        if (!captain.getExperienceLevel().satisfies(requiredLevel)) {
            throw new FlightOperationException(
                String.format("[%s] tipi uçak en az %s düzeyinde kaptan gerektirir. Pilotun düzeyi: %s",
                              aircraft.getType().getModelName(), requiredLevel.name(), captain.getExperienceLevel().name())
            );
        }

        this.aircraft = aircraft;
        this.captainPilot = captain;
        this.coPilot = coPilot;
    }

    public String getFlightId() {
        return flightId;
    }

    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public Aircraft getAircraft() {
        return aircraft;
    }

    public Pilot getCaptainPilot() {
        return captainPilot;
    }

    public Pilot getCoPilot() {
        return coPilot;
    }

    public FlightStatus getStatus() {
        return status;
    }

    public void setStatus(FlightStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Flight flight = (Flight) o;
        return Objects.equals(flightId, flight.flightId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(flightId);
    }

    @Override
    public String toString() {
        return String.format("Uçuş %s: %s -> %s | Uçak: %s (%s) | Kaptan: %s | Y.Pilot: %s | Durum: %s",
                flightId, departureAirport.getAirportId(), arrivalAirport.getAirportId(),
                aircraft.getAircraftId(), aircraft.getType().getModelName(),
                captainPilot.getFullName(), coPilot.getFullName(), status);
    }
}
`,
  },
  {
    name: 'FlightStatus.java',
    packagePath: 'com/enesozturk/flightmgmt/model/FlightStatus.java',
    category: 'model',
    descriptionTr: 'Uçuş yaşam döngüsü durumlarını belirten Enum',
    code: `package com.enesozturk.flightmgmt.model;

/**
 * Uçuşun yaşam döngüsü durumlarını temsil eder.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public enum FlightStatus {
    SCHEDULED("Planlandı"),
    BOARDING("Yolcu Alımı"),
    IN_FLIGHT("Havada / Uçuşta"),
    LANDED("İniş Yaptı / Tamamlandı"),
    CANCELLED("İptal Edildi");

    private final String description;

    FlightStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
`,
  },
  {
    name: 'Airline.java',
    packagePath: 'com/enesozturk/flightmgmt/model/Airline.java',
    category: 'model',
    descriptionTr: 'Havayolu şirketi sınıfı; kimlik, filo, pilotlar ve uçuş operasyonlarını yönetir',
    code: `package com.enesozturk.flightmgmt.model;

import com.enesozturk.flightmgmt.exception.FlightOperationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Hava yolu şirketini temsil eder.
 * "Hava yolu şirketleri uçuşları gerçekleştirir. Her hava yolunun bir kimliği vardır.
 * Hava yolu şirketi, farklı tipteki uçaklara sahiptir.
 * Hava yolu şirketlerinin pilotları vardır."
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class Airline {
    private final String airlineId;       // Her hava yolunun benzersiz bir kimliği vardır (örn: "THY")
    private final String name;            // Şirket Adı (örn: "Türk Hava Yolları")
    private final List<Aircraft> fleet;   // Farklı tipteki uçaklar
    private final List<Pilot> pilots;     // Şirketin istihdam ettiği pilotlar
    private final List<Flight> flights;   // Gerçekleştirilen uçuşlar

    public Airline(String airlineId, String name) {
        if (airlineId == null || airlineId.trim().isEmpty()) {
            throw new IllegalArgumentException("Havayolu kimliği zorunludur!");
        }
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Havayolu ismi zorunludur!");
        }
        this.airlineId = airlineId.trim().toUpperCase();
        this.name = name.trim();
        this.fleet = new ArrayList<>();
        this.pilots = new ArrayList<>();
        this.flights = new ArrayList<>();
    }

    public String getAirlineId() {
        return airlineId;
    }

    public String getName() {
        return name;
    }

    // --- Uçak & Filo Yönetimi ---
    public void addAircraft(Aircraft aircraft) {
        if (aircraft == null) {
            throw new IllegalArgumentException("Uçak boş olamaz!");
        }
        if (fleet.contains(aircraft)) {
            throw new IllegalArgumentException("Bu uçak (" + aircraft.getAircraftId() + ") zaten filoda mevcut!");
        }
        fleet.add(aircraft);
    }

    public List<Aircraft> getFleet() {
        return Collections.unmodifiableList(fleet);
    }

    public List<Aircraft> getOperationalAircraft() {
        List<Aircraft> operational = new ArrayList<>();
        for (Aircraft a : fleet) {
            if (a.isFlightReady()) {
                operational.add(a);
            }
        }
        return operational;
    }

    // --- Pilot Yönetimi ---
    public void hirePilot(Pilot pilot) {
        if (pilot == null) {
            throw new IllegalArgumentException("Pilot boş olamaz!");
        }
        if (pilots.contains(pilot)) {
            throw new IllegalArgumentException("Bu pilot (" + pilot.getPilotId() + ") zaten kayıtlı!");
        }
        pilots.add(pilot);
    }

    public List<Pilot> getPilots() {
        return Collections.unmodifiableList(pilots);
    }

    // --- Uçuş Yönetimi ---
    public void scheduleFlight(Flight flight) {
        if (flight == null) {
            throw new IllegalArgumentException("Uçuş boş olamaz!");
        }
        // Uçağın bu havayoluna ait olup olmadığı kontrolü
        if (!fleet.contains(flight.getAircraft())) {
            throw new FlightOperationException("Uçuşa atanan uçak (" + flight.getAircraft().getAircraftId() 
                    + ") bu hava yolu filosunda bulunmamaktadır!");
        }
        flights.add(flight);
    }

    public List<Flight> getFlights() {
        return Collections.unmodifiableList(flights);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Airline airline = (Airline) o;
        return Objects.equals(airlineId, airline.airlineId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(airlineId);
    }

    @Override
    public String toString() {
        return String.format("Havayolu [%s]: %s (Filo: %d, Pilot: %d, Uçuş: %d)",
                airlineId, name, fleet.size(), pilots.size(), flights.size());
    }
}
`,
  },
  {
    name: 'FlightOperationException.java',
    packagePath: 'com/enesozturk/flightmgmt/exception/FlightOperationException.java',
    category: 'exception',
    descriptionTr: 'Havacılık iş kuralları ve operasyonel ihlalleri fırlatan özel istisna sınıfı',
    code: `package com.enesozturk.flightmgmt.exception;

/**
 * Uçuş planlama ve pilot yetkilendirme kuralları ihlal edildiğinde fırlatılan özel istisna.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class FlightOperationException extends RuntimeException {
    public FlightOperationException(String message) {
        super(message);
    }

    public FlightOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}
`,
  },
  {
    name: 'FlightManagementService.java',
    packagePath: 'com/enesozturk/flightmgmt/service/FlightManagementService.java',
    category: 'service',
    descriptionTr: 'Uçuş planlama, mürettebat yetkilendirme ve operasyonel doğrulama servisi',
    code: `package com.enesozturk.flightmgmt.service;

import com.enesozturk.flightmgmt.exception.FlightOperationException;
import com.enesozturk.flightmgmt.model.*;
import java.time.LocalDateTime;

/**
 * Uçuş ve pilot yönetimi operasyonlarını koordine eden servis katmanı.
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class FlightManagementService {

    /**
     * Yeni bir uçuş oluşturur ve hava yolu şirketinin uçuş listesine ekler.
     * Tüm havacılık kuralları burada denetlenir.
     */
    public Flight createAndScheduleFlight(Airline airline, String flightId,
                                          Airport departureAirport, Airport arrivalAirport,
                                          LocalDateTime departureTime, LocalDateTime arrivalTime,
                                          Aircraft aircraft, Pilot captain, Pilot coPilot) {
        
        System.out.printf(">>> [%s] Uçuşu için planlama başlatılıyor: %s -> %s%n",
                flightId, departureAirport.getAirportId(), arrivalAirport.getAirportId());

        // Uçuş nesnesi oluşturulurken kurallar otomatik olarak denetlenir
        Flight flight = new Flight(flightId, departureAirport, arrivalAirport, 
                                   departureTime, arrivalTime, aircraft, captain, coPilot);
        
        // Havayolu şirketine eklenir
        airline.scheduleFlight(flight);

        System.out.printf("✓ Uçuş başarıyla onaylandı ve planlandı: %s%n", flight.getFlightId());
        return flight;
    }

    /**
     * Bir uçağın durumunu günceller (Çalışır <-> Onarımda)
     */
    public void updateAircraftStatus(Aircraft aircraft, AircraftStatus newStatus) {
        AircraftStatus oldStatus = aircraft.getStatus();
        aircraft.setStatus(newStatus);
        System.out.printf("ℹ Uçak durumu güncellendi [%s]: %s -> %s%n", 
                aircraft.getAircraftId(), oldStatus.getDescription(), newStatus.getDescription());
    }
}
`,
  },
  {
    name: 'Main.java',
    packagePath: 'com/enesozturk/flightmgmt/Main.java',
    category: 'main',
    descriptionTr: 'Sistemi ve tüm kuralları (başarılı & istisna senaryoları) çalıştıran ana program',
    code: `package com.enesozturk.flightmgmt;

import com.enesozturk.flightmgmt.exception.FlightOperationException;
import com.enesozturk.flightmgmt.model.*;
import com.enesozturk.flightmgmt.service.FlightManagementService;
import java.time.LocalDateTime;

/**
 * Uçuş ve Pilot Yönetim Sistemi - Test & Simülasyon Uygulaması
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
public class Main {

    public static void main(String[] args) {
        printBanner();

        FlightManagementService service = new FlightManagementService();

        // 1. Havaalanlarını Oluştur
        Airport ist = new Airport("IST", "İstanbul Havalimanı", "İstanbul", "Türkiye");
        Airport lhr = new Airport("LHR", "London Heathrow", "Londra", "Birleşik Krallık");
        Airport saw = new Airport("SAW", "Sabiha Gökçen Havalimanı", "İstanbul", "Türkiye");
        Airport ayt = new Airport("AYT", "Antalya Havalimanı", "Antalya", "Türkiye");

        // 2. Uçak Tiplerini Oluştur
        AircraftType b738 = new AircraftType("B738", "Boeing 737-800", 2, ExperienceLevel.SENIOR, 189, 5765);
        AircraftType a359 = new AircraftType("A359", "Airbus A350-900", 2, ExperienceLevel.SENIOR, 329, 15000);
        AircraftType b77w = new AircraftType("B77W", "Boeing 777-300ER", 2, ExperienceLevel.CHIEF_PILOT, 349, 13649);

        // 3. Havayolu Şirketini Oluştur
        Airline thy = new Airline("THY", "Türk Hava Yolları");

        // 4. Farklı Tipteki Uçakları Oluştur ve Filoya Ekle
        // TC-JYA: Çalışır durumda Boeing 737
        Aircraft planeOperational = new Aircraft("TC-JYA", "MSN-35712", b738, AircraftStatus.OPERATIONAL, 2020);
        
        // TC-JHY: Onarım durumunda Boeing 777 (Test için)
        Aircraft planeMaintenance = new Aircraft("TC-JHY", "MSN-29401", b77w, AircraftStatus.UNDER_MAINTENANCE, 2018);
        
        // TC-LNA: Çalışır durumda Airbus A350
        Aircraft planeLongHaul = new Aircraft("TC-LNA", "MSN-08912", a359, AircraftStatus.OPERATIONAL, 2022);

        thy.addAircraft(planeOperational);
        thy.addAircraft(planeMaintenance);
        thy.addAircraft(planeLongHaul);

        // 5. Pilotları Oluştur ve İşe Al
        Pilot enesOzturk = new Pilot("PLT-001", "Enes", "Öztürk", "ATPL-TR-1923", ExperienceLevel.CHIEF_PILOT, 11400);
        Pilot selinKaya = new Pilot("PLT-002", "Selin", "Kaya", "ATPL-TR-3419", ExperienceLevel.SENIOR, 6200);
        Pilot ahmetYilmaz = new Pilot("PLT-003", "Ahmet", "Yılmaz", "CPL-TR-5821", ExperienceLevel.MID_LEVEL, 2900);
        Pilot burakDemir = new Pilot("PLT-004", "Burak", "Demir", "CPL-TR-8902", ExperienceLevel.JUNIOR, 850);

        thy.hirePilot(enesOzturk);
        thy.hirePilot(selinKaya);
        thy.hirePilot(ahmetYilmaz);
        thy.hirePilot(burakDemir);

        System.out.println("--- [SENARYO 1: BAŞARILI UÇUŞ PLANLAMA] ---");
        try {
            LocalDateTime depTime = LocalDateTime.now().plusDays(1).withHour(8).withMinute(30);
            LocalDateTime arrTime = depTime.plusHours(4);

            Flight flight1 = service.createAndScheduleFlight(
                    thy, "TK1923", ist, lhr, depTime, arrTime,
                    planeOperational, selinKaya, ahmetYilmaz
            );
            System.out.println("Planlanan Uçuş Detayı:");
            System.out.println(flight1);
        } catch (Exception e) {
            System.err.println("Beklenmeyen Hata: " + e.getMessage());
        }

        System.out.println("\n--- [SENARYO 2: HATA - ONARIMDAKİ UÇAĞA UÇUŞ ATAMA DENEMESİ] ---");
        try {
            LocalDateTime depTime = LocalDateTime.now().plusDays(1).withHour(14).withMinute(0);
            LocalDateTime arrTime = depTime.plusHours(10);

            // planeMaintenance: UNDER_MAINTENANCE durumundadır!
            service.createAndScheduleFlight(
                    thy, "TK0001", ist, lhr, depTime, arrTime,
                    planeMaintenance, enesOzturk, ahmetYilmaz
            );
        } catch (FlightOperationException e) {
            System.out.println("✓ Sistem Beklenen Kuralı Doğruladı (Başarılı Engel):");
            System.out.println("  Mesaj: " + e.getMessage());
        }

        System.out.println("\n--- [SENARYO 3: HATA - AYNI KİŞİYİ HEM KAPTAN HEM YARDIMCI PİLOT ATAMA] ---");
        try {
            LocalDateTime depTime = LocalDateTime.now().plusDays(1).withHour(18).withMinute(0);
            LocalDateTime arrTime = depTime.plusHours(2);

            service.createAndScheduleFlight(
                    thy, "TK4502", saw, ayt, depTime, arrTime,
                    planeOperational, selinKaya, selinKaya // Kaptan ve Y.Pilot aynı!
            );
        } catch (FlightOperationException e) {
            System.out.println("✓ Sistem Beklenen Kuralı Doğruladı (Başarılı Engel):");
            System.out.println("  Mesaj: " + e.getMessage());
        }

        System.out.println("\n--- [SENARYO 4: HATA - JUNIOR PİLOTU KAPTAN ATAMA DENEMESİ] ---");
        try {
            LocalDateTime depTime = LocalDateTime.now().plusDays(1).withHour(20).withMinute(0);
            LocalDateTime arrTime = depTime.plusHours(1);

            // burakDemir JUNIOR seviyesindedir, kaptan olamaz
            service.createAndScheduleFlight(
                    thy, "TK2104", ist, ayt, depTime, arrTime,
                    planeOperational, burakDemir, ahmetYilmaz
            );
        } catch (FlightOperationException e) {
            System.out.println("✓ Sistem Beklenen Kuralı Doğruladı (Başarılı Engel):");
            System.out.println("  Mesaj: " + e.getMessage());
        }

        System.out.println("\n=======================================================");
        System.out.println("Tüm Sistem Kuralları Başarıyla Doğrulandı.");
        System.out.println("Mühendislik & Mimari: Enes Öztürk");
        System.out.println("=======================================================");
    }

    private static void printBanner() {
        System.out.println("=======================================================");
        System.out.println("       UÇUŞ VE PİLOT YÖNETİM SİSTEMİ (v1.0.0)");
        System.out.println("           Tasarımcı: Enes Öztürk");
        System.out.println("=======================================================");
    }
}
`,
  },
];
