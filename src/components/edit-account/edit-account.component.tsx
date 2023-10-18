import { useState } from "react";

import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, EditFilled } from "@ant-design/icons";

import ImageUpload from "../image-upload/image-upload.component";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProfile } from "../../features/profile/profileSlice";
import LoadingLottie from "../spinner-lottie/spinner-lottie.component";

const EditAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { profile } = useAppSelector((state) => state.profile);

  const lastName = profile?.data?.last_name || "";
  const firstName = profile?.data?.first_name || "";

  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  const showMessage = (type: "success" | "error", content: string) => {
    message.open({
      type,
      content,
    });
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios
      .put(`${process.env.REACT_APP_API_URL}/profile/update`, values, {
        headers,
      })
      .then((res) => {
        setIsLoading(false);
        showMessage("success", `edit profile, ${res?.data?.message}`);
        dispatch(getProfile());
      })
      .catch((err) => {
        setIsLoading(false);
        showMessage("error", err?.response?.data?.message);
      });
  };

  return (
    <div className="">
      {isLoading && <LoadingLottie />}
      <div className="grid place-items-center min-h-[500px]">
        <div className="flex flex-col gap-2 my-6 items-center">
          <div className="relative">
            <ImageUpload />
            <EditFilled className="absolute text-gray-600 -bottom-1 right-3 p-1 border rounded-full bg-white" />
          </div>
          <h2 className="font-semibold text-2xl">
            {capitalizedFirstName} {capitalizedLastName}
          </h2>
        </div>
        <div className="my-4">
          <Form
            name="register-field"
            layout="vertical"
            className="min-w-[685px]"
            initialValues={{
              email: profile?.data?.email || "",
              first_name: capitalizedFirstName || "",
              last_name: capitalizedLastName || "",
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                prefix={"@"}
                disabled
                className="text-gray-300 h-12 "
                placeholder="masukan email anda"
              />
            </Form.Item>
            <Form.Item name="first_name" label="Nama Depan">
              <Input
                prefix={<UserOutlined className="text-gray-300 h-10 w-full" />}
                placeholder="nama depan"
              />
            </Form.Item>
            <Form.Item name="last_name" label="Nama Belakang">
              <Input
                prefix={<UserOutlined className="text-gray-300 h-10 w-full" />}
                placeholder="nama belakang"
              />
            </Form.Item>
            <Form.Item className="mt-10">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-red-600 rounded-sm"
              >
                Simpan
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
