import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';

import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import ChooseAccess from './pages/ChooseAccess';
import Dashboard from './pages/Dashboard';
import SubmitReport from './pages/SubmitReport';
import ExploreCases from './pages/ExploreCases';
import InfoCenter from './pages/InfoCenter';
import Forum from './pages/Forum';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import CaseDetails from './pages/CaseDetails';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Legal } from './pages/Legal';
import { Partners } from './pages/Partners';
import { Impact } from './pages/Impact';


function AppContent() {
  const location = useLocation();
  const { userMode } = useAuth();
  const isAuthenticated = userMode === 'user';

  // Hide NavBar on specific pages
  const hideNavbarOn = ['/SplashScreen'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {/* Conditional Navbar */}
      {!shouldHideNavbar && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={() => {
            localStorage.removeItem('userMode');
            window.location.href = '/ChooseAccess';
          }}
        />
      )}

      <Routes>

       <Route path="/" element={<Navigate to="/SplashScreen" replace />} />

        {/* Guest Accessible */}
        <Route path="/SplashScreen" element={<ProtectedRoute guestAllowed={true}><SplashScreen /></ProtectedRoute>} />
        <Route path="/Welcome" element={<ProtectedRoute guestAllowed={true}><Welcome /></ProtectedRoute>} />
        <Route path="/Onboarding" element={<ProtectedRoute guestAllowed={true}><Onboarding /></ProtectedRoute>} />
        <Route path="/ChooseAccess" element={<ProtectedRoute guestAllowed={true}><ChooseAccess /></ProtectedRoute>} />
        <Route path="/InfoCenter" element={<ProtectedRoute guestAllowed={true}><InfoCenter /></ProtectedRoute>} />
        <Route path="/About" element={<ProtectedRoute guestAllowed={true}><About /></ProtectedRoute>} />
        <Route path="/Faq" element={<ProtectedRoute guestAllowed={true}><FAQ /></ProtectedRoute>} />
        <Route path="/Legal" element={<ProtectedRoute guestAllowed={true}><Legal /></ProtectedRoute>} />
        <Route path="/Partners" element={<ProtectedRoute guestAllowed={true}><Partners /></ProtectedRoute>} />
        <Route path="/Impact" element={<ProtectedRoute guestAllowed={true}><Impact /></ProtectedRoute>} />
        <Route path="/CreateAccount" element={<ProtectedRoute guestAllowed={true}><CreateAccount /></ProtectedRoute>} />



      {/* User Only Access (default) */}
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/SubmitReport" element={<ProtectedRoute><SubmitReport /></ProtectedRoute>} />
        <Route path="/ExploreCases" element={<ProtectedRoute><ExploreCases /></ProtectedRoute>} />
        <Route path="/Forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/Cases/:id" element={<ProtectedRoute><CaseDetails /></ProtectedRoute>} />
      </Routes>
  </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}