import { Form, Input, Button, message } from "antd";
import { useState } from "react";

const Login = ({ setIsLoggedIn, setCurrentPage }) => {
  const onFinish = (values) => {
    if (values.username === "admin" && values.password === "admin") {
      message.success("Login successful!");
      setIsLoggedIn(true);
      setCurrentPage("home");
    } else {
      message.error("Invalid username or password.");
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

function Signup() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    message.success("Signup successful!");
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
}

export { Login, Signup };
