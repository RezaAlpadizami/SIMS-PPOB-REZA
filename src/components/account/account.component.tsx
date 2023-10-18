import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import imgProfile from "../../assets/img/img-profile.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logut, reset } from "../../features/auth/authSlice";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);

  const firstName = profile?.data?.first_name || "";
  const lastName = profile?.data?.last_name || "";

  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  const onLogut = () => {
    dispatch(logut());
    dispatch(reset());
    navigate("/login");
  };

  const handleEditProfileClick = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <div className="grid place-items-center min-h-[500px]">
        <div className="flex flex-col gap-2 my-6 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={
                profile?.data?.profile_image.includes("null")
                  ? imgProfile
                  : profile?.data?.profile_image
              }
              alt="PNG"
              width={50}
              className="w-full h-62 object-cover"
            />
          </div>
          <h2 className="font-semibold text-2xl">
            {capitalizedFirstName} {capitalizedLastName}
          </h2>
        </div>
        <div className="my-4">
          <Form
            layout="vertical"
            className="min-w-[685px]"
            initialValues={{
              email: profile?.data?.email,
              first_name: capitalizedFirstName,
              last_name: capitalizedLastName,
              remember: true,
            }}
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
                className="text-gray-300 h-12 "
                placeholder="masukan email anda"
                disabled
              />
            </Form.Item>
            <Form.Item label="Nama Depan" name="first_name">
              <Input
                prefix={<UserOutlined className="text-gray-300 h-10 w-full" />}
                placeholder="nama depan"
                disabled
              />
            </Form.Item>
            <Form.Item label="Nama Belakang" name="last_name">
              <Input
                prefix={<UserOutlined className="text-gray-300 h-10 w-full" />}
                placeholder="nama belakang"
                disabled
              />
            </Form.Item>
            <Form.Item className="mt-10">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full text-white bg-red-500"
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </Button>
            </Form.Item>
            <Form.Item className="mb-10">
              <Button
                className="w-full text-red-300 border-red-300"
                onClick={onLogut}
              >
                Logut
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Account;
