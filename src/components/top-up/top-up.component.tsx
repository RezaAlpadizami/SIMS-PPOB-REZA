import { useState } from "react";

import { Button, Form, Input } from "antd";
import { WalletOutlined } from "@ant-design/icons";

// import { thousandSeparator } from "../../utils/helper";
import ModalConfirmation from "../modal/modal.component";

interface ValueState {
  displayValue: string;
  actualNumberValue: number;
}

const TopUp = () => {
  const [form] = Form.useForm();
  const [valueInput, setValueInput] = useState<ValueState>({
    displayValue: "",
    actualNumberValue: 0,
  });

  console.log("valueInput", valueInput.displayValue);

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

  const handleButtonClick = (newValue: string) => {
    form.setFieldsValue({
      top_up_amount: newValue,
    });

    setValueInput({
      displayValue: form.getFieldValue("top_up_amount"),
      actualNumberValue: Number(newValue),
    });
  };

  const onTopUp = (values: number) => {
    console.log("Submitted values:", values);
  };

  return (
    <div className="container mx-auto px-20">
      <div className="my-8">
        <p className="mt-6 mb-1">Silahkan masukan</p>
        <h1 className="font-bold text-3xl">Nominal Top Up</h1>
      </div>
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-4">
          <Form
            name="top-up"
            form={form}
            onFinish={onTopUp}
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
                      return Promise.reject(
                        "Nominal minimum top-up Rp 10.000."
                      );
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
                placeholder="masukkan nominal Top Up"
                type="number"
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item className="my-4">
              <ModalConfirmation
                buttonName="Top Up"
                nominal={valueInput.displayValue}
                title="Anda yakin Top Up sebesar"
                isNotification
              />
            </Form.Item>
          </Form>
        </div>
        <div className="col-span-2">
          <div className="flex gap-x-4 gap-y-6 flex-wrap">
            <Button
              type="primary"
              className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
              onClick={() => handleButtonClick("10000")}
            >
              Rp10.000
            </Button>
            <Button
              type="primary"
              className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
              onClick={() => handleButtonClick("25000")}
            >
              Rp25.000
            </Button>
            <Button
              type="primary"
              className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
              onClick={() => handleButtonClick("50000")}
            >
              Rp50.000
            </Button>
            <Button
              type="primary"
              className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
              onClick={() => handleButtonClick("100000")}
            >
              Rp100.000
            </Button>
            <Button
              type="primary"
              className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
              onClick={() => handleButtonClick("250000")}
            >
              Rp250.000
            </Button>

            <Button
              type="primary"
              className="text-black border w-[25%] border-gray-300 rounded-[4px] h-10"
              onClick={() => handleButtonClick("500000")}
            >
              Rp500.000
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
