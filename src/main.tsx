// Shim process for libraries that expect it (Vite 6 / React 19 compatibility)
if (typeof window !== 'undefined') {
  (window as any).process = (window as any).process || {};
  (window as any).process.env = (window as any).process.env || {};
  (window as any).process.env.NODE_ENV = (window as any).process.env.NODE_ENV || 'development';
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

// Global error logger for production debugging
const isProd = typeof (import.meta as any).env !== 'undefined' ? (import.meta as any).env.PROD : false;

if (isProd) {
  window.onerror = function(message, source, lineno, colno, error) {
    console.error("Linky Global Crash Hook:", { message, source, lineno, colno, error });
    return false;
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
