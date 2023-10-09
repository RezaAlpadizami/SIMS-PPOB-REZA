import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

interface IRegisterData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
interface ILoginData {
  email: string;
  password: string;
}

const register = async (userData: IRegisterData) => {
  const response = await axios.post(`${API_URL}/registration`, userData);

  return response.data;
};

const login = async (userData: ILoginData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    const expirationDate = new Date().getTime() + 12 * 60 * 60 * 1000;
    sessionStorage.setItem("user", JSON.stringify(response.data));
    sessionStorage.setItem("userExpiration", expirationDate.toString());
    // localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logut = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("userExpiration");
  // localStorage.removeItem("user");
};

const isSessionExpired = () => {
  const userExpiration = sessionStorage.getItem("userExpiration");
  if (!userExpiration) {
    return true;
  }

  const expirationTime = parseInt(userExpiration, 10);
  const currentTime = new Date().getTime();

  return currentTime > expirationTime;
};

const authService = {
  register,
  logut,
  login,
  isSessionExpired,
};

export default authService;
