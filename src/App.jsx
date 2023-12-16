import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './scenes/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Calendar from './scenes/Calendar/Calendar';
import Navbar from './components/navbar/navbar';
import './index.css';

const App = () => {
  const [isOpen, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isOpen);
  };

  return (
    <Router>
      <div className="main-page-wrapper">
        <Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />
        <Routes>
            <Route path="/" element={<Dashboard isCollapsed={isOpen} />} />
            <Route path="/calendar" element={<Calendar isCollapsed={isOpen} />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App; 