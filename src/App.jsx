import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import ChooseAccess from './pages/ChooseAccess';
import Onboarding from './pages/Onboarding';

// import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<div>Welcome page coming soon!</div>} />
      </Routes>
    </Router>
  );
}

export default App;