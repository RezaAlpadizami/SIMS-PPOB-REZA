import FormInput from "../../components/form/form.component";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
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

const Register = () => {
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
      showMessage("success", "register success");
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (values: any) => {
    const userData = values;

    dispatch(register(userData));
  };

  return (
    <div>
      {isLoading && <LoadingLottie />}
      <FormInput
        desc={"Lengkapi data untuk membuat akun"}
        onFinish={onSubmit}
      />
    </div>
  );
};

export default Register;
