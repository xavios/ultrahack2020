import React, { FC, ReactElement, useState } from 'react';
import './App.css';
import Calendar from './Components/Calendar';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import { NavbarConstants } from './NavbarConstants';

const App : FC = (): ReactElement => {    
  const [selectedNavbarItem, setNavbarItem] = useState(NavbarConstants.home);

  const handleClick = (selectedItem: string) => {
    setNavbarItem(selectedItem);
  }

  return (
    <div className="App">
      <Navbar selectedItem={selectedNavbarItem} onClick={handleClick}  />
        {selectedNavbarItem === NavbarConstants.home && <Home /> }
        {selectedNavbarItem === NavbarConstants.calendar && <Calendar /> }
        {selectedNavbarItem === NavbarConstants.myProfile && <Profile /> }

    </div>
  );
}

export default App;
