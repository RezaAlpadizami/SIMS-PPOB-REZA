import { Input } from "antd";
import React from "react";

interface CustomInputProps {
  placeholder: string;
  icon: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, icon }) => {
  return (
    <Input
      prefix={icon}
      className="text-gray-300 h-12 "
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
