import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { formInputRules } from "../../../baseVariables";
import "../../styles/Auth.css";
import Signup from "../signup/Signup";

function Login({ setIsLoggedIn, setCurrentPage }) {
  const [showSignup, setShowSignup] = useState(false);

  const onFinish = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.username === values.username
    );
    if (existingUser && existingUser.password === values.password) {
      message.success("Login successful!");
      setIsLoggedIn(true);
      setCurrentPage("home");
    } else {
      message.error("Invalid username or password.");
    }
  };

  return (
    <>
      {!showSignup ? (
        <div className="signup-form-container">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <h1>Arrimo</h1>
            <Form.Item name="username" rules={formInputRules.missingUserName}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={formInputRules.missingPassword}>
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <a href="#" onClick={() => setShowSignup(true)}>
                Don't have an account?
              </a>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Signup setShowSignup={setShowSignup} />
      )}
    </>
  );
}

export default Login;
