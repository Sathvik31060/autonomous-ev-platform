import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import DashboardOverview from './pages/DashboardOverview';
import AvDashboard from './pages/AvDashboard';
import BatteryAnalytics from './pages/BatteryAnalytics';
import SmartCharging from './pages/SmartCharging';
import TripPlanner from './pages/TripPlanner';
import Architecture from './pages/Architecture';
import LiteratureSurvey from './pages/LiteratureSurvey';
import KeyTakeaways from './pages/KeyTakeaways';
import Profile from './pages/Profile';

export const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PROTECTED ROUTES (WRAPPED IN APPLAYOUT & PROTECTEDROUTE) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/av-dashboard" element={<AvDashboard />} />
        <Route path="/battery" element={<BatteryAnalytics />} />
        <Route path="/charging" element={<SmartCharging />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/literature" element={<LiteratureSurvey />} />
        <Route path="/takeaways" element={<KeyTakeaways />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* FALLBACK REDIRECT */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
