import FormInput from "../../components/form/form.component";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingLottie from "../../components/spinner-lottie/spinner-lottie.component";
import { message as antdMessage } from "antd";

interface UserData {
  status: number;
  message: string;
  data: null;
}
interface AuthState {
  user: UserData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
interface RootState {
  auth: AuthState;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const showMessage = (type: "success" | "error", content: string) => {
    antdMessage.open({
      type,
      content,
    });
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      showMessage("error", message);
    }

    if (isSuccess) {
      showMessage("success", message);
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
