import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { message as antdMessage } from "antd";

import FormInput from "../../components/form/form.component";
import { login, reset } from "../../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import LoadingLottie from "../../components/spinner-lottie/spinner-lottie.component";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showMessage = (type: "success" | "error", content: string) => {
    antdMessage.open({
      type,
      content,
    });
  };

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      showMessage("error", message);
    }

    if (isSuccess) {
      showMessage("success", "Login Sukses");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onFinishLogin = (values: any) => {
    const userData = values;

    dispatch(login(userData));
  };
  return (
    <div>
      {isLoading && <LoadingLottie />}
      <FormInput
        desc={"Masuk atau buat akun untuk memulai"}
        onFinish={onFinishLogin}
        login
      />
    </div>
  );
};

export default Login;
