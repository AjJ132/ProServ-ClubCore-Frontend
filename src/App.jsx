import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './scenes/Dashboard/Dashboard';
import Signin from './scenes/Signin-Signup/Signin';
import Signup from './scenes/Signin-Signup/Signup';
import Missing_Names from './scenes/Signin-Signup/missing-names';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { check_session_storage, get_user_info } from './services/user-info-service';
import EventCalendar from '/src/scenes/Calendar/EventCalendar';
import { addDays, subDays } from "date-fns";


// import Calendar from './scenes/Calendar/Calendar';
import Messenger from './scenes/messenger/messenger';
import Navbar from './components/navbar/navbar';
import './index.css';
import Settings from './scenes/settings/settings';
import JoinTeam from './scenes/Join-Club/Join-Team';

const App = () => {
  const [isOpen, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isOpen);
  };

  const collapseNavbar = () => {
    console.log('collapseNavbar');
    if (isOpen) {
      setIsCollapsed(false);
    }
  }


  useEffect(() => {
     const checkSession = async () => {
          var valid = await check_session_storage();

        if (!valid) {
          var user_info = await get_user_info();
          console.log(user_info);
        } else {
          console.log('Valid');
        }
      };
    checkSession();
  }, []);

  return (
    <Router>
      <div className="main-page-wrapper">
        <Routes>
          <Route path="/" element={<>{<Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} collapseNavbar={collapseNavbar}/>}<Dashboard /></>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/calendar" element={<>{<Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} collapseNavbar={collapseNavbar} />}<EventCalendar /></>} />
          <Route path="/messages" element={<>{<Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} collapseNavbar={collapseNavbar}/>}<Messenger /></>} />
          
        
          <Route path="/signup" element={<Signup />} />
          <Route path="/update-names" element={<Missing_Names />} />
          <Route path="/settings" element={<>{<Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} collapseNavbar={collapseNavbar} />}<Settings /></>} />
          <Route path="/join-team" element={<JoinTeam />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App; 