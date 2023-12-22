import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './scenes/Dashboard/Dashboard';
import Signin from './scenes/Signin-Signup/Signin';
import Signup from './scenes/Signin-Signup/Signup';
import Missing_Names from './scenes/Signin-Signup/missing-names';
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
        <Routes>
          
          <Route path="/" element={<>{isOpen && <Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />}<Dashboard isCollapsed={isOpen} /></>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/calendar" element={<>{isOpen && <Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />}<Calendar isCollapsed={isOpen} /></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update-names" element={<Missing_Names />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App; 