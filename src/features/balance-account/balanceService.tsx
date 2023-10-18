import axios from "axios";

const getBalance = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/balance`,
    config
  );

  return response.data;
};

const balanceService = {
  getBalance,
};

export default balanceService;
