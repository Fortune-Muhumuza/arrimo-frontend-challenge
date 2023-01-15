import React from "react";
import { Menu } from "antd";

const AppMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="users">Users</Menu.Item>
      <Menu.Item key="calendar">Calendar</Menu.Item>
    </Menu>
  );
};

export default AppMenu;
