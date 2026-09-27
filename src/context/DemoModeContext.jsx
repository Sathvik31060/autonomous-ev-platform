import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DemoModeContext = createContext();

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'AV Dashboard & Autonomous Control',
    route: '/av-dashboard',
    badge: 'Module 1 / 5',
    headline: 'Perception, Sensor Fusion & Telemetry',
    description: 'Demonstrates real-time Autonomous/Manual mode switching, multi-sensor health telemetry (LiDAR, Radar, IMU, Camera array), dynamic obstacle detection, and live vehicular speed/acceleration graphing.',
    keyPoints: [
      'Interactive Mode Switch with Safety Interlock',
      'LiDAR 1.2M pts/s and 77GHz Radar tracking',
      'Dynamic top-down perception feed with lane markers',
      'Real-time vehicle event log stream'
    ]
  },
  {
    step: 2,
    title: 'EV Battery Management & Analytics',
    route: '/battery',
    badge: 'Module 2 / 5',
    headline: 'Electrochemical State & Thermal Intelligence',
    description: 'Displays comprehensive pack health with real-time SOC (State of Charge), SOH (State of Health), cell voltages, thermal regulation indicators, and degradation curves.',
    keyPoints: [
      'Precision SOC Gauge & Estimated Range (~286 km)',
      '6 Live Metric Parameter Cards (Voltage, Current, Temp)',
      'Dual-axis Voltage & Current charts via Recharts',
      'Autonomous thermal anomaly & safety thresholds'
    ]
  },
  {
    step: 3,
    title: 'Smart Charging Network',
    route: '/charging',
    badge: 'Module 3 / 5',
    headline: 'Station Discovery, Slot Booking & Live Charge Curves',
    description: 'End-to-end charging lifecycle management: interactive station locator, connector filtering, predictive slot reservation, and real-time charging curves that directly increment battery SOC.',
    keyPoints: [
      'Interactive high-power charging station directory',
      'Slot reservation system with instant confirmation',
      'Live DC Fast Charge session with animated progress',
      'Complete charging history and energy cost accounting'
    ]
  },
  {
    step: 4,
    title: 'EV Trip Planner & Waypoint Optimization',
    route: '/trip-planner',
    badge: 'Module 4 / 5',
    headline: 'Battery-Aware Routing & Energy Feasibility',
    description: 'Integrates vehicle battery telemetry with topological elevation and station network data to guarantee trip completion without range anxiety.',
    keyPoints: [
      'Dynamic route calculation linked to live SOC',
      'Interactive custom SVG route map visualization',
      'Automated proactive charging stop recommendation',
      'Three route alternatives: Fastest, Eco, Charging Optimized'
    ]
  },
  {
    step: 5,
    title: 'Platform Integration Architecture',
    route: '/architecture',
    badge: 'Module 5 / 5',
    headline: 'Unified Central Data Backbone',
    description: 'Shows how vehicle sensors, real-time data layers, central intelligence, and cloud synchronization interlink to enable cross-module autonomous decisions.',
    keyPoints: [
      'Full architectural flow with animated data pulses',
      'Battery state informs trip planning dynamically',
      'Charging availability directly influences routing',
      'Fleet cloud synchronization layer'
    ]
  }
];

export const DemoModeProvider = ({ children }) => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();

  const startDemo = () => {
    setIsDemoActive(true);
    setCurrentStepIndex(0);
    navigate(DEMO_STEPS[0].route);
  };

  const stopDemo = () => {
    setIsDemoActive(false);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      navigate(DEMO_STEPS[nextIndex].route);
    } else {
      // Completed demo
      setIsDemoActive(false);
      navigate('/takeaways');
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      navigate(DEMO_STEPS[prevIndex].route);
    }
  };

  const jumpToStep = (index) => {
    if (index >= 0 && index < DEMO_STEPS.length) {
      setCurrentStepIndex(index);
      navigate(DEMO_STEPS[index].route);
    }
  };

  const currentStep = DEMO_STEPS[currentStepIndex];

  return (
    <DemoModeContext.Provider
      value={{
        isDemoActive,
        currentStepIndex,
        currentStep,
        totalSteps: DEMO_STEPS.length,
        startDemo,
        stopDemo,
        nextStep,
        prevStep,
        jumpToStep
      }}
    >
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};
