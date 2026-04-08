import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext.jsx';

import Inbox from './pages/Inbox.jsx';
import Stats from './pages/Stats.jsx';
import Settings from './pages/Settings.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Deletion from './pages/Deletion.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

/**
 * Wraps routes that require authentication.
 * Unauthenticated users are redirected to /login.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        color: '#a78bfa',
        fontSize: '1.1rem',
        fontFamily: 'Inter, system-ui, sans-serif',
        gap: '12px',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" />
        </svg>
        Loading Jinn…
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

/**
 * Redirects already-authenticated users away from login/register.
 */
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/privacy"  element={<Privacy />} />
      <Route path="/terms"    element={<Terms />} />
      <Route path="/deletion" element={<Deletion />} />

      {/* Protected routes */}
      <Route path="/"         element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
      <Route path="/stats"    element={<ProtectedRoute><Stats /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
