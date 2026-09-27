// Central mock data & configuration for Autonomous EV Platform

export const INITIAL_VEHICLE_STATE = {
  name: "Autonomous EV-01",
  type: "Autonomous Electric SUV",
  model: "CyberCruiser L4 Pro",
  plate: "KA-01-EV-2026",
  driveConfig: "Dual-Motor AWD (320 kW)",
  vin: "EV-992-AUTONOMOUS-X",
  firmware: "v4.8.2-auto",
  batteryCapacityKWh: 75,
  efficiencyRating: "15.8 kWh/100km",
  maxChargingRateKW: 250,
  status: "ONLINE",
  drivingMode: "AUTONOMOUS", // 'AUTONOMOUS' | 'MANUAL'
  safetyInterlock: true,
  systemHealth: 98,
  speed: 42, // km/h
  heading: 184, // degrees
  acceleration: 0.8, // m/s²
  gps: {
    lat: 12.9716,
    lng: 77.5946,
    alt: 920,
    status: "LOCKED",
    satellites: 14,
    accuracy: "±0.12 m"
  },
  laneStatus: {
    state: "High Confidence",
    departureWarning: false,
    leftBoundaryDistance: 1.2, // meters
    rightBoundaryDistance: 1.4, // meters
    curvature: "Straight (+0.02 rad)"
  }
};

export const INITIAL_SENSORS_STATE = {
  lidar: {
    name: "Velodyne VLS-128 LiDAR",
    status: "ONLINE",
    signalQuality: 99,
    frequency: "20 Hz",
    pointsPerSec: "1.24M pts/sec",
    fov: "360° Horizontal x 40° Vertical",
    range: "245 meters",
    lastUpdate: "Just now",
    errorCount: 0
  },
  radar: {
    name: "Continental 77GHz Long Range Radar",
    status: "ONLINE",
    signalQuality: 97,
    frequency: "77 GHz",
    targetsTracked: 12,
    range: "250 meters",
    lastUpdate: "Just now",
    errorCount: 0
  },
  imu: {
    name: "Bosch 6-DoF Precision IMU",
    status: "ONLINE",
    signalQuality: 100,
    gyro: "+0.02°/s",
    roll: "0.3°",
    pitch: "-0.8°",
    yawRate: "0.01 rad/s",
    lastUpdate: "Just now",
    errorCount: 0
  },
  camera: {
    name: "Triple Front Vision Array (4K HDR)",
    status: "ONLINE",
    signalQuality: 98,
    fps: "60 FPS",
    latency: "12 ms",
    syncStatus: "HARDWARE LOCKED",
    lastUpdate: "Just now",
    errorCount: 0
  }
};

export const INITIAL_BATTERY_STATE = {
  soc: 78, // %
  soh: 94, // %
  voltage: 398, // V
  current: 42, // A
  temperature: 31, // °C
  energyConsumption: 15.8, // kWh/100km
  cycleCount: 382,
  packCapacityKWh: 75,
  cellMinVoltage: 3.96,
  cellMaxVoltage: 4.02,
  cellDeltaVoltage: 0.06,
  chargingState: "Discharging", // 'Discharging' | 'Charging' | 'Idle'
  coolingLoop: "Active - Nominal (Flow: 4.2 L/min)"
};

export const CHARGING_STATIONS = [
  {
    id: "cs-01",
    name: "ElectraFast Supercharger #4",
    location: "Tech Park Central, Sector 6",
    distanceKm: 2.4,
    powerKW: 150,
    type: "CCS2 / Type 2",
    availablePlugs: 3,
    totalPlugs: 4,
    pricePerKWh: 0.28,
    estimatedTimeTo80: "18 min",
    operator: "ElectraGrid HighPower",
    status: "Available",
    rating: 4.9,
    coordinates: { lat: 12.9780, lng: 77.6020 }
  },
  {
    id: "cs-02",
    name: "ChargePoint Hub - Metro Plaza",
    location: "Metro Boulevard, Exit 12",
    distanceKm: 5.8,
    powerKW: 250,
    type: "CCS2 Ultra-Fast",
    availablePlugs: 6,
    totalPlugs: 8,
    pricePerKWh: 0.32,
    estimatedTimeTo80: "12 min",
    operator: "ChargePoint Hyper",
    status: "Available",
    rating: 4.8,
    coordinates: { lat: 12.9850, lng: 77.5890 }
  },
  {
    id: "cs-03",
    name: "EcoCharge Urban Station",
    location: "Green Avenue, Ring Road",
    distanceKm: 8.2,
    powerKW: 50,
    type: "Type 2 / CHAdeMO",
    availablePlugs: 1,
    totalPlugs: 2,
    pricePerKWh: 0.22,
    estimatedTimeTo80: "45 min",
    operator: "EcoCharge Systems",
    status: "Available",
    rating: 4.6,
    coordinates: { lat: 12.9610, lng: 77.6150 }
  },
  {
    id: "cs-04",
    name: "Highway Rapid Hub 101",
    location: "Expressway Km 24 Service Area",
    distanceKm: 14.5,
    powerKW: 350,
    type: "CCS2 MegaWatt",
    availablePlugs: 0,
    totalPlugs: 6,
    pricePerKWh: 0.35,
    estimatedTimeTo80: "9 min",
    operator: "GridSpeed Express",
    status: "In Use",
    rating: 4.9,
    coordinates: { lat: 12.9420, lng: 77.6480 }
  }
];

export const INITIAL_CHARGING_HISTORY = [
  {
    id: "ch-101",
    date: "2026-09-23 18:42",
    station: "ElectraFast Supercharger #4",
    duration: "24 min",
    energyDelivered: "38.5 kWh",
    cost: "$10.78",
    startSoc: 22,
    endSoc: 80
  },
  {
    id: "ch-102",
    date: "2026-09-20 09:15",
    station: "ChargePoint Hub - Metro Plaza",
    duration: "18 min",
    energyDelivered: "32.1 kWh",
    cost: "$10.27",
    startSoc: 35,
    endSoc: 82
  },
  {
    id: "ch-103",
    date: "2026-09-17 14:05",
    station: "EcoCharge Urban Station",
    duration: "42 min",
    energyDelivered: "29.4 kWh",
    cost: "$6.46",
    startSoc: 38,
    endSoc: 80
  },
  {
    id: "ch-104",
    date: "2026-09-12 21:30",
    station: "Highway Rapid Hub 101",
    duration: "15 min",
    energyDelivered: "44.0 kWh",
    cost: "$15.40",
    startSoc: 16,
    endSoc: 85
  }
];

export const INITIAL_OBSTACLES = [
  { id: "obs-1", type: "Vehicle (Sedan)", distance: 18.2, speed: "38 km/h", relativeSpeed: "-4 km/h", bearing: "Ahead (Center)", risk: "Normal" },
  { id: "obs-2", type: "Pedestrian", distance: 32.5, speed: "4.5 km/h", relativeSpeed: "Cross-walking", bearing: "Right Lane (+3.2m)", risk: "Monitored" },
  { id: "obs-3", type: "Road Barrier", distance: 45.0, speed: "0 km/h", relativeSpeed: "Stationary", bearing: "Left Shoulder (-4.1m)", risk: "Static Clear" }
];
