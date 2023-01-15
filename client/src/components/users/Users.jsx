import { Button, Table } from "antd";
import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

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
      <Button type="primary">Add User</Button>
      <Table dataSource={users} columns={columns} />
    </>
  );
}

export default Users;
