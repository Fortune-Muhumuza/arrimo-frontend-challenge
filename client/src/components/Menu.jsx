import React, { useState } from "react";
import { Menu } from "antd";
import Users from "./users/Users";
import UserCalendar from "./calendar/Calendar";

const AppMenu = ({ setCurrentPage, isLoggedIn, setIsLoggedIn }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("users");

  // handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  return (
    <>
      <Menu
        mode="horizontal"
        onClick={({ key }) => {
          if (key === "logout") {
            handleLogout();
          } else {
            setSelectedMenuItem(key);
          }
        }}
        selectedKeys={[selectedMenuItem]}
      >
        {isLoggedIn && <Menu.Item key="users">Users</Menu.Item>}
        {isLoggedIn && <Menu.Item key="calendar">Calendar</Menu.Item>}
        {isLoggedIn && <Menu.Item key="logout">Logout</Menu.Item>}
      </Menu>
      {isLoggedIn && selectedMenuItem === "users" && <Users />}
      {isLoggedIn && selectedMenuItem === "calendar" && <UserCalendar />}
    </>
  );
};

export default AppMenu;
