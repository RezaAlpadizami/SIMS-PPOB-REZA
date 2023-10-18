import axios from "axios";

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
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/registration`,
    userData
  );

  return response.data;
};

const login = async (userData: ILoginData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/login`,
    userData
  );

  console.log("res", response.data.data.token);

  if (response.data) {
    const userDataItem = {
      email: userData.email,
      data: {
        token: response.data?.data?.token,
        timestamp: new Date().getTime(),
      },
    };
    localStorage.setItem("user", JSON.stringify(userDataItem));
  }

  return response.data;
};

const logut = () => {
  localStorage.removeItem("user");
};

const isTokenValid = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const userDataItem = JSON.parse(userData);
    const tokenTimestamp = userDataItem.data.timestamp;
    const currentTime = new Date().getTime();
    const expirationTime = 12 * 60 * 60 * 1000;

    if (currentTime - tokenTimestamp > expirationTime) {
      // Token has expired, remove it from localStorage
      localStorage.removeItem("user");
      return false;
    }

    return true;
  }
  return false;
};

const authService = {
  register,
  logut,
  login,
  isTokenValid,
};

export default authService;
