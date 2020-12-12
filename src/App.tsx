import React, { FC, ReactElement, useState } from "react";
import "./App.css";
import CalendarView from "./Components/CalendarView";
import Home from "./Components/Home";
import MyEvents from "./Components/MyEvents";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Registration from "./Components/Registration";
import Tasks from "./Components/Tasks";
import { NavbarConstants } from "./NavbarConstants";

const App: FC = (): ReactElement => {
  const [selectedNavbarItem, setNavbarItem] = useState(NavbarConstants.home);

  const handleClick = (selectedItem: string) => {
    setNavbarItem(selectedItem);
  };

  const userId = "5fd3e6d2003e8e0ec0f94273";

  return (
    <div className="App container">
      <Navbar selectedItem={selectedNavbarItem} onClick={handleClick} />
      {selectedNavbarItem === NavbarConstants.home && <Home />}
      {selectedNavbarItem === NavbarConstants.calendar && <CalendarView />}
      {selectedNavbarItem === NavbarConstants.myProfile && <Profile userId={userId} />}
      {selectedNavbarItem === NavbarConstants.registration && <Registration />}
      {selectedNavbarItem === NavbarConstants.tasks && <Tasks />}
      {selectedNavbarItem === NavbarConstants.myEvents && <MyEvents userId={userId} />}
    </div>
  );
};

export default App;