import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './scenes/Dashboard/Dashboard';
import Signin from './scenes/Signin-Signup/Signin';
import Signup from './scenes/Signin-Signup/Signup';
import Missing_Names from './scenes/Signin-Signup/missing-names';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { get_user_info } from './services/user-info-service';


import Calendar from './scenes/Calendar/Calendar';
import Navbar from './components/navbar/navbar';
import './index.css';
import Settings from './scenes/settings/settings';
import JoinTeam from './scenes/Join-Club/Join-Team';

const App = () => {
  const [isOpen, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isOpen);
  };

  useEffect(() => {
    const startup = async () => {
      await get_user_info();
    }

    startup();
  }
  , []);

  return (
    <Router>
      <div className="main-page-wrapper">
        <Routes>
          <Route path="/" element={<>{<Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />}<Dashboard /></>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/calendar" element={<>{isOpen && <Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />}<Calendar isCollapsed={isOpen} /></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update-names" element={<Missing_Names />} />
          <Route path="/settings" element={<>{isOpen && <Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />}<Settings  isCollapsed={isOpen} /></>} />
          <Route path="/join-team" element={<JoinTeam />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App; 