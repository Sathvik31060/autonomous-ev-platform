# Real-Time Autonomous EV Intelligence Platform
### B.Tech Capstone Project Demonstration Web Application

An integrated intelligent EV platform combining **Autonomous Vehicle Control**, **EV Battery Analytics (BMS)**, **Smart Charging Infrastructure**, and **Energy-Aware Trip Planning** into a unified, synchronized software architecture.

---

## 🌟 Project Highlights

- **Unified Cockpit Architecture**: Connects edge autonomous perception, electrochemical battery state estimation, and grid reservation without siloed tools.
- **100 Hz Real-Time Simulation Engine**: Client-side reactive telemetry stream simulating smooth vehicle velocity, heading, acceleration, GPS progression, battery depletion/charging dynamics, and sensor jitter.
- **5-Step Guided Evaluator Demo Mode**: Built-in automated walkthrough specifically designed for capstone project defense and evaluator scoring.
- **Automotive Glassmorphic Aesthetic**: Designed with an ultra-modern dark automotive dashboard theme featuring electric cyan, EV green, warning amber accents, circular SVG gauges, and Recharts analytics.
- **Client-Side Authentication & Persistence**: Complete authentication flow with prototype user registration, password recovery, demo login (Sathvik), and `localStorage` session persistence.

---

## 🚀 Quick Start Guide

### 1. Installation & Local Development
```bash
# Navigate to project directory
cd F:\autonomous-ev-platform

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Production Build & Preview
```bash
# Build optimized production bundle with manual chunking
npm run build

# Preview production build locally
npm run preview
```

---

## 🔑 Authentication & Demo Credentials

The platform features a zero-backend client-side authentication system with session persistence via `localStorage`:

| Field | Value |
|---|---|
| **Demo User** | `Sathvik` |
| **Email** | `demo@evplatform.com` |
| **Role** | `EV Platform User` |
| **Assigned Vehicle** | `Autonomous EV-01` |
| **BMS Pack Capacity** | `75 kWh` |
| **One-Click Login** | Click **"Continue with Demo"** on `/signin` |

---

## 🧭 Core Application Routes

### Public Routes
- **`/`**: Futuristic Landing Page with hero section, EV schematic, 4 core module cards, statistics, and platform vision.
- **`/signin`**: Split-screen glassmorphic authentication with demo login and credential recovery.
- **`/signup`**: Client-validated account registration with instant local storage.
- **`/forgot-password`**: Prototype password reset dispatch simulation.

### Protected Dashboard Routes (Requires Sign In)
- **`/dashboard`**: Unified Cockpit Overview uniting all 4 subsystems, mode switcher, live perception feed, and battery gauge.
- **`/av-dashboard`**: Autonomous Vehicle control center with LiDAR, Radar, IMU, 4K camera arrays, top-down perception canvas, dynamic obstacle tracker, and velocity charts.
- **`/battery`**: EV Battery Management & Analytics (BMS) with circular SOC dial, 6 live parameters, dual-axis voltage/current charts, thermal tracking, SOH degradation trend, and automated anomaly insights.
- **`/charging`**: Smart Charging Network with interactive metropolitan radar locator, multi-attribute filtering, slot booking modal, live DC fast charge curves, and charging ledger.
- **`/trip-planner`**: Battery-aware corridor routing with topological elevation loss calculation, automated proactive charging stops, and route alternatives (Fastest, Eco, Charging-Optimized).
- **`/architecture`**: System Integration Architecture showing 5-layer pipeline from sensors to cloud sync with animated data flow relationships.
- **`/literature`**: Academic Research Foundations with domain synthesis table and 4 algorithmic deep-dive cards.
- **`/takeaways`**: Executive conclusions, 4 interactive takeaway pillars, and strategic platform vision.
- **`/profile`**: Driver credentials paired directly to vehicle telemetry and live simulation SOC/SOH.

---

## 🧪 Evaluation Test Matrix

| Test Step | Action | Expected Result | Status |
|---|---|---|---|
| **Test 1** | Open `/` | Landing page loads with futuristic hero & module cards | Passed |
| **Test 2** | Click "Launch Dashboard" while logged out | Seamless redirect to `/signin` | Passed |
| **Test 3** | Click "Continue with Demo" | Sets Sathvik session, saves to localStorage, routes to `/dashboard` | Passed |
| **Test 4** | Navigate through all 8 dashboard routes | Full interactivity, SVG canvas maps, Recharts render cleanly | Passed |
| **Test 5** | Browser refresh | User remains authenticated due to persistent storage | Passed |
| **Test 6** | Click Profile → Logout Session | Clears session and redirects to `/signin` | Passed |
| **Test 7** | Direct access to `/dashboard` while logged out | Protected route intercepts and redirects to `/signin` | Passed |
| **Test 8** | Register new account at `/signup` | Saves prototype user, redirects to `/signin` with confirmation | Passed |
| **Test 9** | Submit `/forgot-password` form | Displays confirmation notification | Passed |
| **Test 10** | Toggle "Demo Tour" in header | Guided 5-module walkthrough activates with Next/Prev controls | Passed |

---

## 🛠️ Technology Stack

- **Framework**: React 18.3 + Vite 5.4
- **Routing**: React Router 6.26 (Nested layouts, protected routes, declarative redirects)
- **Styling**: Tailwind CSS 3.4 + Custom Glassmorphism & Neon Glow utilities
- **Analytics & Graphs**: Recharts 2.12 (Area, Line, Bar, Dual-Axis, Reference Lines)
- **Visuals & Canvas**: HTML5 Canvas 2D + Custom SVG Topological Corridors
- **Icons**: Lucide React
