import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SimulationProvider } from './context/SimulationContext';
import { DemoModeProvider } from './context/DemoModeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SimulationProvider>
          <DemoModeProvider>
            <App />
          </DemoModeProvider>
        </SimulationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
