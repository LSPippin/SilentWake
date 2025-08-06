// import other pages as needed

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

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
import Signup from './pages/Signup';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Legal } from './pages/Legal';
import { Partners } from './pages/Partners';
import { Impact } from './pages/Impact';


function App() {
  return (
    <Router>
      <Routes>

        {/* Guest Accessible */}
        <Route path="/SplashScreen" element={<ProtectedRoute guestAllowed={true}><SplashScreen /></ProtectedRoute>} />
        <Route path="/Welcome" element={<ProtectedRoute guestAllowed={true}><Welcome /></ProtectedRoute>} />
        <Route path="/Onboarding" element={<ProtectedRoute guestAllowed={true}><Onboarding /></ProtectedRoute>} />
        <Route path="/ChooseAccess" element={<ProtectedRoute guestAllowed={true}><ChooseAccess /></ProtectedRoute>} />
        <Route path="/InfoCenter" element={<ProtectedRoute guestAllowed={true}><InfoCenter /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute guestAllowed={true}><About /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute guestAllowed={true}><FAQ /></ProtectedRoute>} />
        <Route path="/legal" element={<ProtectedRoute guestAllowed={true}><Legal /></ProtectedRoute>} />
        <Route path="/partners" element={<ProtectedRoute guestAllowed={true}><Partners /></ProtectedRoute>} />
        <Route path="/impact" element={<ProtectedRoute guestAllowed={true}><Impact /></ProtectedRoute>} />
        <Route path="/Signup" element={<ProtectedRoute guestAllowed={true}><Signup /></ProtectedRoute>} />



      {/* User Only Access (default) */}
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/SubmitReport" element={<ProtectedRoute><SubmitReport /></ProtectedRoute>} />
        <Route path="/ExploreCases" element={<ProtectedRoute><ExploreCases /></ProtectedRoute>} />
        <Route path="/Forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;