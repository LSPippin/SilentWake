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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/SplashScreen" element={<SplashScreen />} />
        <Route path="/Welcome" element={<div>Welcome page coming soon!</div>} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/ChooseAccess" element={<ChooseAccess />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/InfoCenter" element={<InfoCenter />} />


{/* Guest and User can see Explore Cases */}
    
        <Route
          path="/ExploreCases"
          element={
            <ProtectedRoute allowedModes={['user']}>
              <ExploreCases />
            </ProtectedRoute>
          }
        />


{/* Only logged-in users can submit reports*/}
        <Route
          path="/SubmitReport"
          element={
            <ProtectedRoute allowedModes={['user']}>
              <SubmitReport />
            </ProtectedRoute>
         }
      />


{/* Only logged-in users can access forum*/}
        <Route
          path="/Forum"
          element={
            <ProtectedRoute allowedModes={['user']}>
              <Forum />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;