import React from "react";
import { Button } from "antd";

const PrimaryButton = ({ onClick, title }) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
