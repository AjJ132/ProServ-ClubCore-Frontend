import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './scenes/Dashboard/Dashboard';
import Navbar from './components/navbar/navbar';
import './index.css';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <Navbar isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} />
      <Dashboard isCollapsed={isCollapsed} />
    </div>
  );
};

export default App;