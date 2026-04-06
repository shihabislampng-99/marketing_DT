import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Inbox from './pages/Inbox.jsx';
import Stats from './pages/Stats.jsx';
import Settings from './pages/Settings.jsx';
import Privacy from './pages/Privacy.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* We redirect missing routes to inbox since the design is standalone */}
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
