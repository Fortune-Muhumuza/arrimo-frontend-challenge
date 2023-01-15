import "./App.css";
import AppMenu from "./components/Menu";
import { Layout } from "antd";
import Users from "./components/users/Users";
import UserCalendar from "./components/calendar/Calendar";

function App() {
  return (
    <Layout>
      <AppMenu />
      <Users />
      <UserCalendar />
    </Layout>
  );
}

export default App;
