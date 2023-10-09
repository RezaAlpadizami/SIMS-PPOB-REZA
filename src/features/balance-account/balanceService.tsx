import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const getBalance = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/balance`, config);

  return response.data;
};

const balanceService = {
  getBalance,
};

export default balanceService;
