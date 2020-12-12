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
import UserApiClient from "./Api/UserApiClient";
import Login from "./Components/Login";
import { Cookies } from "react-cookie";

interface IState {
  selectedNavbarItem: string;
  userIsLoggedIn: boolean;
  userId: string;
}

export default class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedNavbarItem: NavbarConstants.home,
      userIsLoggedIn: false,
      userId: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentDidMount() {
    let userApiClient = new UserApiClient();
    const userIsLoggedIn = await userApiClient.userIsLoggedIn();
    this.setState({
      selectedNavbarItem: this.state.selectedNavbarItem,
      userIsLoggedIn: userIsLoggedIn,
      userId: this.state.userId,
    });
  }

  handleClick(selectedItem: string): void {
    this.setState({
      selectedNavbarItem: selectedItem,
      userIsLoggedIn: this.state.userIsLoggedIn,
    });
  }

  handleLogin(userid: string) {
    this.setState({
      selectedNavbarItem: NavbarConstants.home,
      userIsLoggedIn: true,
      userId: userid,
    });
  }

  logout() {
    const cookies = new Cookies();
    cookies.remove("x-access-token");
    this.setState({
      selectedNavbarItem: NavbarConstants.login,
      userIsLoggedIn: false,
      userId: "",
    });
  }

  render() {
    return (
      <div className="App container">
        <Navbar
          selectedItem={this.state.selectedNavbarItem}
          onClick={this.handleClick}
          userIsLoggedIn={this.state.userIsLoggedIn}
          logout={this.logout}
        />
        {this.state.selectedNavbarItem === NavbarConstants.home && <Home />}
        {this.state.selectedNavbarItem === NavbarConstants.calendar && (
          <CalendarView />
        )}
        {this.state.selectedNavbarItem === NavbarConstants.myProfile && (
          <Profile userId={this.state.userId} logout={this.logout} />
        )}
        {this.state.selectedNavbarItem === NavbarConstants.registration && (
          <Registration />
        )}
        {this.state.selectedNavbarItem === NavbarConstants.login && (
          <Login login={this.handleLogin} />
        )}
        {this.state.selectedNavbarItem === NavbarConstants.tasks && <Tasks />}
        {this.state.selectedNavbarItem === NavbarConstants.myEvents && (
          <MyEvents userId={this.state.userId} />
        )}
      </div>
    );
  }
}
