import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Form, Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { thousandSeparator } from "../../utils/helper";

// interface ValueState {
//   displayValue: string;
//   actualNumberValue: number;
// }

const Payment = () => {
  const [form] = Form.useForm();
  const location = useLocation();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { service_icon, service_name, service_tariff } = location.state || {};

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onPayment = (values: number) => {
    console.log("Submitted values:", values);
  };
  return (
    <div className="container mx-auto px-20">
      <div className="my-8">
        <p className="mt-6 mb-1">Pembayaran</p>
        <div className="flex gap-1">
          <img src={`${service_icon}`} width={12} alt="" />
          <h1 className="font-bold text-xs">{service_name}</h1>
        </div>
      </div>
      <Form
        name="top-up"
        form={form}
        onFinish={onPayment}
        initialValues={{
          remember: true,
          top_up_amount: thousandSeparator(service_tariff),
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
                  isFocused || service_tariff > 0
                    ? "text-gray-600"
                    : "text-gray-300"
                } w-full`}
              />
            }
            value={service_tariff}
            className="rounded-[3px] h-10"
            type="number"
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item className="my-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-red-600 rounded-sm h-10"
            disabled={service_tariff < 10000 || isNaN(service_tariff)}
          >
            Bayar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Payment;
