import { useState } from "react";

import axios from "axios";
import { Form, Input, message } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { getBalance } from "../../features/balance-account/balanceSlice";

import ModalConfirmation from "../modal/modal.component";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import LoadingLottie from "../spinner-lottie/spinner-lottie.component";
import AmountButton from "../button-amount-topup/button-amount-topup.component";

interface ValueState {
  displayValue: string;
  actualNumberValue: number;
}

const TopUp = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<ValueState>({
    displayValue: "",
    actualNumberValue: 0,
  });
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalFailed, setShowModalFailed] = useState<boolean>(false);

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

  const showMessage = (type: "success" | "error", content: string) => {
    message.open({
      type,
      content,
    });
  };

  const handlePaymentTransaction = () => {
    setIsLoading(true);
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const topUpData = {
      top_up_amount: valueInput.actualNumberValue,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/topup`, topUpData, {
        headers,
      })
      .then((res) => {
        setIsLoading(false);
        dispatch(getBalance());
        setShowModalSuccess(!showModalSuccess);
        showMessage("success", res?.data?.message);
      })
      .catch((error: any) => {
        setIsLoading(false);
        showMessage("error", error?.response?.data?.message);
        setShowModalFailed(!showModalFailed);
      });
  };

  return (
    <div className="container mx-auto px-20">
      {isLoading && <LoadingLottie />}
      <div className="my-8">
        <p className="mt-6 mb-1">Silahkan masukan</p>
        <h1 className="font-bold text-3xl">Nominal Top Up</h1>
      </div>
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-4">
          <Form
            name="top-up"
            form={form}
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
                onSubmit={handlePaymentTransaction}
                showButtonModal
              />
            </Form.Item>
          </Form>
        </div>
        <div className="col-span-2">
          <div className="flex gap-x-4 gap-y-6 flex-wrap">
            <AmountButton
              amount="Rp10.000"
              onClick={() => handleButtonClick("10000")}
            />
            <AmountButton
              amount="Rp25.000"
              onClick={() => handleButtonClick("25000")}
            />
            <AmountButton
              amount="Rp50.000"
              onClick={() => handleButtonClick("50000")}
            />
            <AmountButton
              amount="Rp100.000"
              onClick={() => handleButtonClick("100000")}
            />
            <AmountButton
              amount="Rp250.000"
              onClick={() => handleButtonClick("250000")}
            />
            <AmountButton
              amount="Rp500.000"
              onClick={() => handleButtonClick("500000")}
            />
          </div>
        </div>
      </div>
      {showModalSuccess && (
        <ModalConfirmation
          nominal={valueInput.displayValue}
          title={`Top Up sebesar`}
          isSuccess
        />
      )}
      {showModalFailed && (
        <ModalConfirmation
          nominal={valueInput.displayValue}
          title={`Top Up sebesar`}
          isFailed
        />
      )}
    </div>
  );
};

export default TopUp;
