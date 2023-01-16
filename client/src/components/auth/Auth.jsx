import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import "./Auth.css";

const Login = ({ setIsLoggedIn, setCurrentPage }) => {
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
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
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
};

function Signup({ setShowSignup }) {
  const [form] = Form.useForm();

  const onFinishSignup = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    localStorage.setItem("users", JSON.stringify(storedUsers));
    message.success("Signup successful!");
    setShowSignup(false);
  };

  return (
    <div className="signup-form-container">
      <Form form={form} onFinish={onFinishSignup}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="signup-form-actions">
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
          <Button type="link" onClick={() => setShowSignup(false)}>
            Back to login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export { Login, Signup };
