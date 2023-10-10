import { useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { Input, message } from "antd";
import { WalletOutlined } from "@ant-design/icons";

import { thousandSeparator } from "../../utils/helper";
import ModalConfirmation from "../modal/modal.component";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import LoadingLottie from "../spinner-lottie/spinner-lottie.component";
import { getBalance } from "../../features/balance-account/balanceSlice";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const Payment: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalFailed, setShowModalFailed] = useState<boolean>(false);
  const { service_icon, service_name, service_tariff, service_code } =
    location.state || {};

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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

    const transactionData = {
      service_code: service_code,
    };

    axios
      .post(`${API_URL}/transaction`, transactionData, {
        headers,
      })
      .then(() => {
        setIsLoading(false);
        dispatch(getBalance());
        setShowModalSuccess(!showModalSuccess);
      })
      .catch((error: any) => {
        setIsLoading(false);
        showMessage("error", error?.response?.data?.message);
        setShowModalFailed(true);
      });
  };

  console.log(showModalSuccess);
  return (
    <div className="container mx-auto px-20">
      {isLoading && <LoadingLottie />}
      <div className="my-8">
        <p className="mt-6 mb-1">Pembayaran</p>
        <div className="flex gap-1">
          <img src={`${service_icon}`} width={20} alt="" />
          <h1 className="font-bold text-lg">{service_name}</h1>
        </div>
      </div>
      <div>
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
          value={thousandSeparator(service_tariff)}
          className="rounded-[3px] h-10 my-4"
          type="number"
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <ModalConfirmation
          buttonName="Bayar"
          nominal={service_tariff}
          title={`Bayar ${service_name} senilai`}
          disabled={service_tariff < 10000 || isNaN(service_tariff)}
          onSubmit={handlePaymentTransaction}
          isNotification
          showButtonModal
        />
      </div>
      {showModalSuccess && (
        <ModalConfirmation
          nominal={service_tariff}
          title={`Bayar ${service_name} senilai`}
          isSuccess
        />
      )}
      {showModalFailed && (
        <ModalConfirmation
          nominal={service_tariff}
          title={`Bayar ${service_name} senilai`}
          isFailed
        />
      )}
    </div>
  );
};

export default Payment;
