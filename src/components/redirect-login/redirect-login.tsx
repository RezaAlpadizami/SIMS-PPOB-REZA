import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { isExpired } from "../../features/auth/authSlice";

const RedirectToLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const isValid = await dispatch(isExpired());
      if (!isValid) {
        navigate("/login");
      }
    };

    checkTokenExpiration();
  }, [dispatch, navigate]);

  return null;
};

export default RedirectToLogin;
