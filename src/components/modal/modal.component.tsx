import { useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { CheckCircleFilled } from "@ant-design/icons";
import { thousandSeparator } from "../../utils/helper";

import Logo from "../../assets/logo/Logo.png";

type ModalConfirmationProps = {
  buttonName: string;
  isNotification?: boolean;
  isFailed?: boolean;
  nominal?: string;
  title?: string;
};

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  buttonName,
  isNotification,
  isFailed,
  nominal,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f04545",
            colorBgTextActive: "#f04545",
            colorPrimaryHover: "#fffff",
            borderRadius: 2,
          },
          components: {
            Modal: {
              borderRadius: 20,
            },
          },
        }}
      >
        <Button
          onClick={showModal}
          htmlType="submit"
          type="primary"
          className="w-full bg-red-600 rounded-sm h-10"
        >
          {buttonName}
        </Button>
        <Modal
          closable
          open={isModalOpen}
          okType="primary"
          style={{ top: 250 }}
          onCancel={handleCancel}
          width={300}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          footer={
            <div className="flex flex-col gap-2">
              {isNotification ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleOk}
                    className="text-md text-red-500 font-semibold"
                  >
                    Ya, lanjutkan Top Up
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-md text-gray-400"
                  >
                    Batalkan
                  </button>
                </div>
              ) : isFailed ? (
                <div>
                  <button
                    onClick={handleOk}
                    className="text-md text-red-500 font-semibold"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleOk}
                  className="text-md text-red-500 font-semibold"
                >
                  Kembali ke Beranda
                </button>
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
