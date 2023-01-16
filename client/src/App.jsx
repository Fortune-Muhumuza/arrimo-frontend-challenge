import "./App.css";
import { Layout } from "antd";
import { useState } from "react";
import AppMenu from "./components/Menu";
import { Login, Signup } from "./components/auth/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  if (!isLoggedIn && currentPage !== "login" && currentPage !== "signup") {
    setCurrentPage("login");
  }

  return (
    <Layout>
      <AppMenu
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      {isLoggedIn ? (
        <>
          {currentPage === "home" && <div>Home Page</div>}
          {currentPage === "calendar" && <UserCalendar />}
        </>
      ) : (
        currentPage === "login" && (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setCurrentPage={setCurrentPage}
          />
        )
      )}
    </Layout>
  );
}

export default App;
