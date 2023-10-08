import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

type FormInputProps = {
  login?: boolean;
  desc: String;
  account?: boolean;
  onFinish?: (values: any) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  login,
  desc,
  account,
  onFinish,
}) => {
  // const navigate = useNavigate();

  // const onFinishLogin = (values: any) => {
  //   console.log(values);
  //   navigate("/");
  // };
  // const onFinishRegister = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };
  return (
    <div className="grid grid-cols-2 min-h-[100vh]">
      <div className="w-[50%] flex flex-col justify-center container mx-auto">
        <div className="flex gap-2 justify-center">
          <img src={require("../../assets/logo/Logo.png")} alt="logo.png" />
          <h2 className="font-semibold text-xl">SIMS PPOB</h2>
        </div>
        <div className="flex justify-center my-6">
          <h1 className="text-2xl text-center font-semibold w-60">{desc}</h1>
        </div>
        <div className="flex justify-center">
          {login ? (
            <Form
              name="login-field"
              className="w-[385px]"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={"@"}
                  className="text-gray-300 h-12 "
                  placeholder="masukan email anda"
                />
              </Form.Item>
              <Form.Item
                name="password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please input your Password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="buat password"
                />
              </Form.Item>
              <Form.Item className="my-10">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-red-600 rounded-sm"
                >
                  Log in
                </Button>
              </Form.Item>
              <span className="flex justify-center">
                belum punya akun? registrasi
                <Link to="/signup" className="mx-1 text-red-600">
                  di sini!
                </Link>
              </span>
            </Form>
          ) : account ? (
            <Form
              name="register-field"
              className="w-[385px]"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={"@"}
                  className="text-gray-300 h-12 "
                  placeholder="masukan email anda"
                />
              </Form.Item>
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="nama depan"
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="nama belakang"
                />
              </Form.Item>
              <Form.Item className="my-10">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-red-600 rounded-sm"
                >
                  Simpan
                </Button>
              </Form.Item>
              <span className="flex justify-center">
                sudah punya akun? login
                <Link to="/login" className="mx-1 text-red-600">
                  di sini!
                </Link>
              </span>
            </Form>
          ) : (
            <Form
              name="register-field"
              className="w-[385px]"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={"@"}
                  className="text-gray-300 h-12 "
                  placeholder="masukan email anda"
                />
              </Form.Item>
              <Form.Item
                name="first_name"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="nama depan"
                />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="nama belakang"
                />
              </Form.Item>
              <Form.Item
                name="password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please input your Password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="buat password"
                />
              </Form.Item>
              <Form.Item
                name="confirm_password"
                dependencies={["password"]}
                className="text-right"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Password tidak sama"));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="text-gray-300 h-10 w-full" />
                  }
                  placeholder="konfirmasi password"
                />
              </Form.Item>

              <Form.Item className="my-10">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-red-600 rounded-sm"
                >
                  Log in
                </Button>
              </Form.Item>
              <span className="flex justify-center">
                sudah punya akun? login
                <Link to="/login" className="mx-1 text-red-600">
                  di sini!
                </Link>
              </span>
            </Form>
          )}
        </div>
      </div>
      <div className="bg-banner bg-cover bg-center"></div>
    </div>
  );
};

export default FormInput;
