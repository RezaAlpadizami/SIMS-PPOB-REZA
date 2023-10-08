import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React from "react";

interface PasswordInputProps {
  placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder }) => {
  return (
    <Input.Password
      prefix={<LockOutlined className="text-gray-300 h-10 w-full" />}
      placeholder={placeholder}
    />
  );
};

export default PasswordInput;
