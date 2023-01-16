import { Form, Input, Button, Table } from "antd";
import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (editIndex === -1) {
      setUsers([...users, values]);
    } else {
      const newUsers = [...users];
      newUsers[editIndex] = values;
      setUsers(newUsers);
      setEditIndex(-1);
    }
  };

  const handleDelete = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    form.setFieldsValue(users[index]);
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
      render: (text, record, index) => (
        <>
          <Button type="link" onClick={() => handleEdit(index)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(index)}>
            Delete
          </Button>
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
            {editIndex === -1 ? "Add User" : "Save"}
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={users} columns={columns} />
    </>
  );
}

export default Users;
