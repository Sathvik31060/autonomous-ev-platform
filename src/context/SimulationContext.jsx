import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  INITIAL_VEHICLE_STATE,
  INITIAL_SENSORS_STATE,
  INITIAL_BATTERY_STATE,
  INITIAL_OBSTACLES,
  INITIAL_CHARGING_HISTORY,
  CHARGING_STATIONS
} from '../data/mockData';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const { user, updateVehicle } = useAuth();

  // Global Live Simulation Toggle
  const [isLiveSimulation, setIsLiveSimulation] = useState(true);

  // Vehicle Telemetry initialized with mock data, then synced with user profile
  const [vehicle, setVehicle] = useState(() => {
    if (user?.vehicle || user?.vehicleType) {
      return {
        ...INITIAL_VEHICLE_STATE,
        name: user.vehicle || INITIAL_VEHICLE_STATE.name,
        type: user.vehicleType || INITIAL_VEHICLE_STATE.type,
        model: user.vehicleModel || INITIAL_VEHICLE_STATE.model,
        vin: user.vin || INITIAL_VEHICLE_STATE.vin,
        plate: user.plate || INITIAL_VEHICLE_STATE.plate,
        driveConfig: user.driveConfig || INITIAL_VEHICLE_STATE.driveConfig,
        firmware: user.firmware || INITIAL_VEHICLE_STATE.firmware,
        batteryCapacityKWh: user.batteryCapacity ? (parseInt(user.batteryCapacity) || INITIAL_VEHICLE_STATE.batteryCapacityKWh) : INITIAL_VEHICLE_STATE.batteryCapacityKWh
      };
    }
    return INITIAL_VEHICLE_STATE;
  });

  const [sensors, setSensors] = useState(INITIAL_SENSORS_STATE);
  const [battery, setBattery] = useState(INITIAL_BATTERY_STATE);
  const [obstacles, setObstacles] = useState(INITIAL_OBSTACLES);
  const [chargingStations, setChargingStations] = useState(CHARGING_STATIONS);
  const [chargingHistory, setChargingHistory] = useState(INITIAL_CHARGING_HISTORY);

  // Sync vehicle state when user profile changes
  useEffect(() => {
    if (user?.vehicle || user?.vehicleType) {
      setVehicle(prev => ({
        ...prev,
        name: user.vehicle || prev.name,
        type: user.vehicleType || prev.type,
        model: user.vehicleModel || prev.model,
        vin: user.vin || prev.vin,
        plate: user.plate || prev.plate,
        driveConfig: user.driveConfig || prev.driveConfig,
        firmware: user.firmware || prev.firmware,
        batteryCapacityKWh: user.batteryCapacity ? (parseInt(user.batteryCapacity) || prev.batteryCapacityKWh) : prev.batteryCapacityKWh
      }));
    }
  }, [user]);

  // Active Charging Session
  const [activeCharging, setActiveCharging] = useState({
    isActive: false,
    stationName: "ElectraFast Supercharger #4",
    powerKW: 150,
    targetSoc: 80,
    energyDeliveredKWh: 0,
    timeElapsedSeconds: 0,
    currentVoltage: 412,
    currentAmps: 185
  });

  // Real-time Event Logs
  const [eventLogs, setEventLogs] = useState([
    { id: 1, time: '22:04:12', message: 'Autonomous mode enabled: Level 4 Active', level: 'info' },
    { id: 2, time: '22:04:15', message: 'LiDAR + Camera multimodal fusion synchronized (60 FPS)', level: 'success' },
    { id: 3, time: '22:04:19', message: 'Dual lane boundaries locked with 99.4% confidence', level: 'info' },
    { id: 4, time: '22:04:22', message: 'Obstacle detected: Sedan vehicle at 18.2m (Velocity match)', level: 'warning' },
    { id: 5, time: '22:04:26', message: 'Battery thermal management: Normal coolant circulation', level: 'info' }
  ]);

  // Telemetry History for Charts (Speed, Acceleration, Voltage, Temperature)
  const [telemetryHistory, setTelemetryHistory] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 12 }, (_, i) => ({
      time: new Date(now - (12 - i) * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      speed: 40 + Math.sin(i * 0.8) * 3,
      acceleration: 0.6 + Math.cos(i * 0.8) * 0.4,
      voltage: 397 + Math.sin(i * 0.5) * 2,
      current: 40 + Math.cos(i * 0.5) * 3,
      temperature: 30.8 + (i * 0.03)
    }));
  });

  // Add event helper
  const addEventLog = (message, level = 'info') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEventLogs(prev => [
      { id: Date.now() + Math.random(), time: timeStr, message, level },
      ...prev.slice(0, 19)
    ]);
  };

  // Update Vehicle Details across entire application
  const updateVehicleInfo = (newInfo) => {
    const updatedName = newInfo.name || newInfo.vehicle || vehicle.name;
    const updatedType = newInfo.type || newInfo.vehicleType || vehicle.type;
    const updatedModel = newInfo.model || newInfo.vehicleModel || vehicle.model;
    const updatedVin = newInfo.vin || vehicle.vin;
    const updatedPlate = newInfo.plate || vehicle.plate;
    const updatedDrive = newInfo.driveConfig || vehicle.driveConfig;
    const updatedFirmware = newInfo.firmware || vehicle.firmware;
    const updatedCapacity = newInfo.batteryCapacity || `${vehicle.batteryCapacityKWh} kWh`;
    const capacityNum = parseInt(updatedCapacity) || vehicle.batteryCapacityKWh;

    setVehicle(prev => ({
      ...prev,
      name: updatedName,
      type: updatedType,
      model: updatedModel,
      vin: updatedVin,
      plate: updatedPlate,
      driveConfig: updatedDrive,
      firmware: updatedFirmware,
      batteryCapacityKWh: capacityNum
    }));

    if (updateVehicle) {
      updateVehicle({
        vehicle: updatedName,
        vehicleType: updatedType,
        vehicleModel: updatedModel,
        vin: updatedVin,
        plate: updatedPlate,
        driveConfig: updatedDrive,
        firmware: updatedFirmware,
        batteryCapacity: updatedCapacity
      });
    }

    addEventLog(`Vehicle Profile Updated: ${updatedName} [${updatedType}]`, 'success');
  };

  // Toggle Driving Mode
  const toggleDrivingMode = () => {
    setVehicle(prev => {
      const newMode = prev.drivingMode === 'AUTONOMOUS' ? 'MANUAL' : 'AUTONOMOUS';
      const interlockStatus = newMode === 'AUTONOMOUS';
      addEventLog(
        newMode === 'AUTONOMOUS'
          ? 'Switched to AUTONOMOUS mode — Safety Interlock Active'
          : 'Switched to MANUAL override — Driver taking control',
        newMode === 'AUTONOMOUS' ? 'success' : 'warning'
      );
      return {
        ...prev,
        drivingMode: newMode,
        safetyInterlock: interlockStatus
      };
    });
  };

  // Start Charging Simulation
  const startCharging = (stationName = "ElectraFast Supercharger #4", power = 150, target = 80) => {
    setActiveCharging({
      isActive: true,
      stationName,
      powerKW: power,
      targetSoc: target,
      energyDeliveredKWh: 0,
      timeElapsedSeconds: 0,
      currentVoltage: 415,
      currentAmps: Math.round((power * 1000) / 415)
    });
    setBattery(prev => ({
      ...prev,
      chargingState: 'Charging'
    }));
    addEventLog(`DC Fast Charging initiated at ${stationName} (${power} kW)`, 'success');
  };

  // Stop Charging Simulation
  const stopCharging = () => {
    if (activeCharging.isActive) {
      const newHistoryItem = {
        id: `ch-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        station: activeCharging.stationName,
        duration: `${Math.max(1, Math.round(activeCharging.timeElapsedSeconds / 60))} min`,
        energyDelivered: `${activeCharging.energyDeliveredKWh.toFixed(1)} kWh`,
        cost: `$${(activeCharging.energyDeliveredKWh * 0.28).toFixed(2)}`,
        startSoc: Math.max(10, Math.round(battery.soc - (activeCharging.energyDeliveredKWh / (vehicle.batteryCapacityKWh || 75) * 100))),
        endSoc: Math.round(battery.soc)
      };
      setChargingHistory(prev => [newHistoryItem, ...prev]);
    }

    setActiveCharging(prev => ({
      ...prev,
      isActive: false
    }));
    setBattery(prev => ({
      ...prev,
      chargingState: 'Discharging'
    }));
    addEventLog('Charging session concluded. BMS entering nominal discharging cycle.', 'info');
  };

  // Simulation Tick Loop
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      // 1. Vehicle Telemetry Update
      setVehicle(prev => {
        let speedFluctuation = prev.speed;
        let accel = prev.acceleration;
        let headingShift = prev.heading;

        if (prev.drivingMode === 'AUTONOMOUS') {
          speedFluctuation = Number((41.5 + Math.sin(Date.now() / 3000) * 2.8).toFixed(1));
          accel = Number((0.6 + Math.sin(Date.now() / 2500) * 0.4).toFixed(2));
          headingShift = Math.round(184 + Math.sin(Date.now() / 8000) * 2);
        } else {
          speedFluctuation = Number((44.0 + Math.sin(Date.now() / 2000) * 4.5).toFixed(1));
          accel = Number((0.9 + Math.sin(Date.now() / 1800) * 0.7).toFixed(2));
          headingShift = Math.round(183 + Math.sin(Date.now() / 6000) * 3);
        }

        const newLat = Number((prev.gps.lat + 0.00003).toFixed(5));
        const newLng = Number((prev.gps.lng + 0.00004).toFixed(5));

        return {
          ...prev,
          speed: speedFluctuation,
          heading: headingShift,
          acceleration: accel,
          gps: {
            ...prev.gps,
            lat: newLat,
            lng: newLng
          }
        };
      });

      // 2. Battery Dynamics Update
      setBattery(prev => {
        let newSoc = prev.soc;
        let newVoltage = prev.voltage;
        let newCurrent = prev.current;
        let newTemp = prev.temperature;

        if (activeCharging.isActive) {
          if (newSoc < activeCharging.targetSoc) {
            newSoc = Math.min(activeCharging.targetSoc, Number((newSoc + 0.35).toFixed(2)));
          }
          newVoltage = Number((414 + Math.sin(Date.now() / 1500) * 1.5).toFixed(1));
          newCurrent = -Number((178 + Math.cos(Date.now() / 2000) * 8).toFixed(1));
          newTemp = Number(Math.min(36.5, prev.temperature + 0.04).toFixed(1));
        } else {
          newSoc = Math.max(5, Number((newSoc - 0.025).toFixed(2)));
          newVoltage = Number((398 + Math.sin(Date.now() / 2000) * 2.2).toFixed(1));
          newCurrent = Number((42 + Math.sin(Date.now() / 1800) * 4.5).toFixed(1));
          newTemp = Number((31.0 + Math.sin(Date.now() / 10000) * 0.8).toFixed(1));
        }

        return {
          ...prev,
          soc: newSoc,
          voltage: newVoltage,
          current: newCurrent,
          temperature: newTemp
        };
      });

      // 3. Active Charging Stats Update
      if (activeCharging.isActive) {
        setActiveCharging(prev => {
          const addedEnergy = (prev.powerKW * (1.5 / 3600));
          const newEnergy = prev.energyDeliveredKWh + addedEnergy;
          return {
            ...prev,
            timeElapsedSeconds: prev.timeElapsedSeconds + 2,
            energyDeliveredKWh: newEnergy
          };
        });
      }

      // 4. Sensor status jitter
      setSensors(prev => ({
        lidar: { ...prev.lidar, signalQuality: 98 + Math.floor(Math.random() * 3) },
        radar: { ...prev.radar, signalQuality: 96 + Math.floor(Math.random() * 4) },
        imu: { ...prev.imu, gyro: `${(Math.sin(Date.now() / 1000) * 0.04).toFixed(2)}°/s` },
        camera: { ...prev.camera, latency: `${Math.floor(10 + Math.random() * 5)} ms` }
      }));

      // 5. Obstacle distance oscillation
      setObstacles(prev => [
        {
          ...prev[0],
          distance: Number((18.0 + Math.sin(Date.now() / 2000) * 1.5).toFixed(1))
        },
        {
          ...prev[1],
          distance: Number((32.0 + Math.cos(Date.now() / 3500) * 2.1).toFixed(1))
        },
        prev[2]
      ]);

      // 6. Update Telemetry Chart History
      setTelemetryHistory(prev => {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newPoint = {
          time: timeNow,
          speed: Number((41.5 + Math.sin(Date.now() / 3000) * 3).toFixed(1)),
          acceleration: Number((0.6 + Math.cos(Date.now() / 2500) * 0.4).toFixed(2)),
          voltage: Number((398 + Math.sin(Date.now() / 2000) * 2).toFixed(1)),
          current: Number((42 + Math.cos(Date.now() / 2000) * 4).toFixed(1)),
          temperature: Number((31.0 + Math.sin(Date.now() / 6000) * 0.6).toFixed(1))
        };
        return [...prev.slice(1), newPoint];
      });

    }, 1800);

    return () => clearInterval(interval);
  }, [isLiveSimulation, activeCharging.isActive, activeCharging.targetSoc, activeCharging.powerKW]);

  // Derived values
  const estimatedRangeKm = Math.round(battery.soc * ((vehicle.batteryCapacityKWh || 75) / 75) * 3.67);

  // Dynamic Battery Health Status
  const getBatteryHealthStatus = () => {
    if (battery.temperature > 45 || battery.soc < 10) return { label: 'Critical', color: 'red' };
    if (battery.temperature > 38 || battery.soc < 20 || battery.soh < 85) return { label: 'Warning', color: 'amber' };
    if (battery.soh > 92 && battery.temperature <= 35) return { label: 'Excellent', color: 'green' };
    return { label: 'Good', color: 'cyan' };
  };

  return (
    <SimulationContext.Provider
      value={{
        isLiveSimulation,
        setIsLiveSimulation,
        vehicle,
        sensors,
        battery,
        obstacles,
        chargingStations,
        chargingHistory,
        activeCharging,
        telemetryHistory,
        eventLogs,
        estimatedRangeKm,
        batteryHealth: getBatteryHealthStatus(),
        updateVehicleInfo,
        toggleDrivingMode,
        startCharging,
        stopCharging,
        addEventLog
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
