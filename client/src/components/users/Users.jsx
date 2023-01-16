import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Table } from "antd";
import {
  addUser,
  deleteUser,
  editUser,
  setEditIndex,
} from "../../state/usersSlice";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [form] = Form.useForm();
  const [editIndex, setEditIndexState] = useState(-1);

  useEffect(() => {
    dispatch(setEditIndex(editIndex));
  }, [dispatch, editIndex]);

  const onFinish = (values) => {
    if (editIndex === -1) {
      dispatch(addUser(values));
    } else {
      dispatch(editUser({ user: values, index: editIndex }));
      setEditIndexState(-1);
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  };

  const handleEdit = (index) => {
    setEditIndexState(index);
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
      render: (_, record, index) => (
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
