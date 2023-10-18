import { useState } from "react";

import { Modal, Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

import { CloseCircleFilled } from "@ant-design/icons";
import { CheckCircleFilled } from "@ant-design/icons";
import { thousandSeparator } from "../../utils/helper";

import Logo from "../../assets/logo/Logo.png";

type ModalConfirmationProps = {
  buttonName?: string;
  isNotification?: boolean;
  isFailed?: boolean;
  isSuccess?: boolean;
  nominal?: string;
  title?: string;
  disabled?: boolean;
  confirmation?: boolean;
  showButtonModal?: boolean;
  onSubmit?: (() => void) | undefined;
};

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  buttonName,
  isNotification,
  isFailed,
  isSuccess,
  nominal,
  title,
  disabled,
  showButtonModal = false,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonBackToBeranda = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleButtonClick = () => {
    if (onSubmit) {
      setIsModalOpen(false);
      onSubmit();
    }
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f04545",
            colorBorder: "none",
          },
        }}
      >
        {showButtonModal && (
          <Button
            onClick={showModal}
            type="primary"
            className="w-full bg-red-600 rounded-sm h-10"
            disabled={disabled}
          >
            {buttonName}
          </Button>
        )}
        <Modal
          open={isFailed || isSuccess ? !isModalOpen : isModalOpen}
          okType="primary"
          style={{ top: 250 }}
          onCancel={handleCancel}
          width={300}
          closable={false}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          footer={
            <div className="flex flex-col gap-2">
              {isNotification ? (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleButtonClick}
                    htmlType="submit"
                    className="text-md text-red-500 border-none font-semibold"
                  >
                    {`Ya, lanjutkan ${
                      buttonName === "Bayar" ? "Bayar" : "Top Up"
                    }`}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="text-md text-gray-400 border-none"
                  >
                    Batalkan
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleButtonBackToBeranda}
                  className="text-md text-red-500 border-none font-semibold"
                >
                  Kembali ke Beranda
                </Button>
              )}
            </div>
          }
        >
          <div className="w-full text-center">
            <div className="flex justify-center my-4 w-full">
              {isNotification ? (
                <img src={Logo} alt="logo" />
              ) : isFailed ? (
                <CloseCircleFilled className="text-red-500 text-[28px]" />
              ) : (
                <CheckCircleFilled className="text-green-600 text-[28px]" />
              )}
            </div>
            <p>{title}</p>
            <h4 className="font-semibold text-lg">
              Rp{thousandSeparator(nominal)}
            </h4>
            <p>{isFailed ? "gagal" : isNotification ? "" : "berhasil"}</p>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default ModalConfirmation;
