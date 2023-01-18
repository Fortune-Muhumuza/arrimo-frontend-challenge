import { Form, Input, Button, message } from "antd";
import { formInputRules } from "../../../baseVariables";
import "../../styles/Auth.css";

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
        <h1>Arrimo</h1>

        <Form.Item
          label="Username"
          name="username"
          rules={formInputRules.missingUserName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={formInputRules.missingEmail}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={formInputRules.missingPassword}
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

export default Signup;
