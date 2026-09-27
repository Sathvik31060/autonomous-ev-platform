import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'ev_platform_auth_v1';
const USERS_STORAGE_KEY = 'ev_platform_registered_users_v1';

export const DEMO_USER = {
  name: 'Sathvik',
  email: 'demo@evplatform.com',
  role: 'EV Platform User',
  vehicle: 'Autonomous EV-01',
  vehicleType: 'Autonomous Electric SUV',
  vehicleModel: 'CyberCruiser L4 Pro',
  vin: 'EV-992-AUTONOMOUS-X',
  plate: 'KA-01-EV-2026',
  driveConfig: 'Dual-Motor AWD (320 kW)',
  batteryCapacity: '75 kWh',
  firmware: 'v4.8.2-auto',
  status: 'Active',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  joinedDate: 'September 2026'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [authNotification, setAuthNotification] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Demo Login
  const loginWithDemo = () => {
    setUser(DEMO_USER);
    setAuthNotification({
      type: 'success',
      message: 'Logged in as Sathvik (Demo Mode)'
    });
    return true;
  };

  // Standard Login
  const login = (email, password) => {
    // Check if demo user
    if (email.toLowerCase() === DEMO_USER.email.toLowerCase()) {
      setUser(DEMO_USER);
      return { success: true };
    }

    // Check registered prototype users
    try {
      const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const found = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        if (found.password === password) {
          const authUser = {
            name: found.name,
            email: found.email,
            role: 'EV Platform User',
            vehicle: found.vehicle || 'Autonomous EV-01',
            vehicleType: found.vehicleType || 'Autonomous Electric SUV',
            vehicleModel: found.vehicleModel || found.vehicle || 'CyberCruiser L4 Pro',
            batteryCapacity: found.batteryCapacity || '75 kWh',
            vin: found.vin || 'EV-992-AUTONOMOUS-X',
            plate: found.plate || 'KA-01-EV-2026',
            driveConfig: found.driveConfig || 'Dual-Motor AWD (320 kW)',
            firmware: found.firmware || 'v4.8.2-auto',
            status: 'Active'
          };
          setUser(authUser);
          return { success: true };
        } else {
          return { success: false, message: 'Invalid password. Please try again.' };
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Fallback prototype login
    if (password.length >= 6) {
      const fallbackUser = {
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'EV Platform User',
        vehicle: 'Autonomous EV-01',
        vehicleType: 'Autonomous Electric SUV',
        vehicleModel: 'CyberCruiser L4 Pro',
        batteryCapacity: '75 kWh',
        vin: 'EV-992-AUTONOMOUS-X',
        plate: 'KA-01-EV-2026',
        driveConfig: 'Dual-Motor AWD (320 kW)',
        firmware: 'v4.8.2-auto',
        status: 'Active'
      };
      setUser(fallbackUser);
      return { success: true };
    }

    return { success: false, message: 'Password must be at least 6 characters.' };
  };

  // Update Vehicle Information
  const updateVehicle = (vehicleData) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        ...vehicleData,
        vehicle: vehicleData.vehicle || vehicleData.name || prev.vehicle,
        vehicleType: vehicleData.vehicleType || vehicleData.type || prev.vehicleType,
        vehicleModel: vehicleData.vehicleModel || vehicleData.model || prev.vehicleModel,
        batteryCapacity: vehicleData.batteryCapacity || prev.batteryCapacity,
        vin: vehicleData.vin || prev.vin,
        plate: vehicleData.plate || prev.plate,
        driveConfig: vehicleData.driveConfig || prev.driveConfig,
        firmware: vehicleData.firmware || prev.firmware
      };

      try {
        const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
        const idx = storedUsers.findIndex(u => u.email.toLowerCase() === prev.email.toLowerCase());
        if (idx !== -1) {
          storedUsers[idx] = { ...storedUsers[idx], ...updated };
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));
        }
      } catch (e) {
        console.error(e);
      }

      return updated;
    });

    setAuthNotification({
      type: 'success',
      message: 'Vehicle configuration updated and synchronized successfully!'
    });
  };

  // Registration
  const register = (userData) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const exists = storedUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      const newUser = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        vehicle: userData.vehicle || 'Autonomous EV-01',
        vehicleType: userData.vehicleType || 'Autonomous Electric SUV',
        vehicleModel: userData.vehicleModel || userData.vehicle || 'CyberCruiser L4 Pro',
        batteryCapacity: userData.batteryCapacity || '75 kWh',
        vin: userData.vin || `EV-${Math.floor(100 + Math.random() * 900)}-AUTO`,
        plate: userData.plate || 'KA-01-EV-2026',
        driveConfig: userData.driveConfig || 'Dual-Motor AWD (320 kW)',
        firmware: 'v4.8.2-auto',
        createdAt: new Date().toISOString()
      };

      storedUsers.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Failed to save account locally.' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setAuthNotification(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithDemo,
        login,
        register,
        updateVehicle,
        logout,
        authNotification,
        setAuthNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
