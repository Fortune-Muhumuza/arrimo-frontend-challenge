import { Modal, Form, Input, Button, Table } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  editUser,
  setEditIndex,
  fetchUsers,
} from "../../state/usersSlice";

function Users() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editIndex, setEditIndexState] = useState(-1);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

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
    setVisible(false);
    form.resetFields();
  };

  const handleDelete = (index, record) => {
    console.log("record", record);
    dispatch(deleteUser(index));
  };

  const handleEdit = (index) => {
    setEditIndexState(index);
    form.setFieldsValue(users[index]);
    setVisible(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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
          <Button type="link" onClick={() => handleEdit(index, record)}>
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
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ width: "100px", marginTop: "10px", marginBottom: "10px" }}
      >
        Add User
      </Button>
      <Table dataSource={users} columns={columns} />
      <Modal
        title={editIndex === -1 ? "Add User" : "Edit User"}
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Users;
