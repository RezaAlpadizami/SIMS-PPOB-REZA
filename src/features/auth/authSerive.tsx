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
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logut = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logut,
  login,
};

export default authService;