import { Form, Input, Modal } from "antd";
import React from "react";

function AddUserForm({ setVisible, onFinish, visible, editIndex, form }) {
  return (
    <>
      <Modal
        title={editIndex === -1 ? "Add User" : "Edit User"}
        open={visible}
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

export default AddUserForm;
