import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './scenes/Dashboard/Dashboard';
import Navbar from './components/navbar/navbar';
import './index.css';

const App = () => {
  const [isOpen, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isOpen);
  };

  return (
    <div className="main-page-wrapper">
      <Navbar isCollapsed={isOpen} toggleNavbar={toggleNavbar} />
      <Dashboard isCollapsed={isOpen} />
      {/* 
        Implement Dashboard swapper here. npm install react-router-dom
       */}
    </div>
  );
};

export default App;