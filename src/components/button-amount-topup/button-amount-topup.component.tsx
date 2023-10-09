import React from "react";
import { Button } from "antd";

type AmountButtonProps = {
  amount: string;
  onClick: () => void;
};

const AmountButton: React.FC<AmountButtonProps> = ({ amount, onClick }) => {
  return (
    <Button
      type="primary"
      className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
      onClick={onClick}
    >
      {amount}
    </Button>
  );
};

export default AmountButton;
