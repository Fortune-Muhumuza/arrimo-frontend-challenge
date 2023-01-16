import React, { useState } from "react";
import { Menu } from "antd";
import Users from "./users/Users";
import UserCalendar from "./calendar/Calendar";

const AppMenu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("users");

  return (
    <>
      <Menu
        mode="horizontal"
        onClick={({ key }) => setSelectedMenuItem(key)}
        selectedKeys={[selectedMenuItem]}
      >
        <Menu.Item key="users">Users</Menu.Item>
        <Menu.Item key="calendar">Calendar</Menu.Item>
      </Menu>
      {selectedMenuItem === "users" && <Users />}
      {selectedMenuItem === "calendar" && <UserCalendar />}
    </>
  );
};

export default AppMenu;
