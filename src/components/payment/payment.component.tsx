import { useState } from "react";

import { Button, Form, Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";

// import { thousandSeparator } from "../../utils/helper";

interface ValueState {
  displayValue: string;
  actualNumberValue: number;
}

const Payment = () => {
  const [form] = Form.useForm();
  const [valueInput, setValueInput] = useState<ValueState>({
    displayValue: "",
    actualNumberValue: 0,
  });

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strNumber = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setValueInput({
      displayValue: strNumber,
      actualNumberValue: Number(strNumber.replace(/,/g, "")),
    });
  };

  const onPayment = (values: number) => {
    console.log("Submitted values:", values);
  };
  return (
    <div className="container mx-auto px-20">
      <div className="my-8">
        <p className="mt-6 mb-1">Pembayaran</p>
        <div className="flex gap-1">
          <img
            src={require("../../assets/logo/Listrik.png")}
            width={12}
            alt=""
          />
          <h1 className="font-bold text-xs">Listrik Prabayar</h1>
        </div>
      </div>
      <Form
        name="top-up"
        form={form}
        onFinish={onPayment}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="top_up_amount"
          rules={[
            { required: true, message: "Nominal minimum top-up Rp 10.000" },
            {
              validator: (_, value) => {
                const numericValue = parseFloat(value);
                if (numericValue < 10000) {
                  return Promise.reject("Nominal minimum top-up Rp 10.000.");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            prefix={
              <WalletOutlined
                className={`${
                  isFocused || valueInput.actualNumberValue > 0
                    ? "text-gray-600"
                    : "text-gray-300"
                } w-full`}
              />
            }
            value={valueInput.actualNumberValue}
            className="rounded-[3px] h-10"
            type="number"
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item className="my-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-red-600 rounded-sm h-10"
            disabled={
              valueInput.actualNumberValue < 10000 ||
              isNaN(valueInput.actualNumberValue)
            }
          >
            Bayar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Payment;
