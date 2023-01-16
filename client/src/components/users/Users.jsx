import { Form, Input, Button, Table } from "antd";
import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setUsers([...users, values]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Button type="link">Edit</Button>
          <Button type="link">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={users} columns={columns} />
    </>
  );
}

export default Users;
