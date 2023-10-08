import { Button, Form, Input } from "antd";
import { UserOutlined, EditFilled } from "@ant-design/icons";
import ImageUpload from "../image-upload/image-upload.component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logut, reset } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";

// interface UserData {
//   status: number;
//   message: string;
//   data: null;
// }
// interface AuthState {
//   user: UserData | null;
//   isError: boolean;
//   isSuccess: boolean;
//   isLoading: boolean;
//   message: string;
// }
const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onLogut = () => {
    dispatch(logut());
    dispatch(reset());
    navigate("/login");
  };

  const handleEditProfileClick = () => {
    navigate("/edit-profile");
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div className="grid place-items-center min-h-[500px]">
        <div className="flex flex-col gap-2 my-6 items-center">
          <div className="relative">
            <ImageUpload />
            <EditFilled className="absolute text-gray-600 -bottom-1 right-3 p-1 border rounded-full bg-white" />
          </div>
          <h2 className="font-semibold text-2xl">Kristanto Wibowo</h2>
        </div>
        <div className="my-4">
          <Form
            name="register-field"
            layout="vertical"
            className="min-w-[685px]"
            initialValues={{ remember: true }}
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
                className="text-gray-300 h-12 "
                placeholder="masukan email anda"
              />
            </Form.Item>
            <Form.Item name="firstname" label="Nama Depan">
              <Input
                prefix={<UserOutlined className="text-gray-300 h-10 w-full" />}
                placeholder="nama depan"
              />
            </Form.Item>
            <Form.Item name="lastname" label="Nama Belakang">
              <Input
                prefix={<UserOutlined className="text-gray-300 h-10 w-full" />}
                placeholder="nama belakang"
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
                type="primary"
                htmlType="submit"
                className="w-full text-white bg-red-500"
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
