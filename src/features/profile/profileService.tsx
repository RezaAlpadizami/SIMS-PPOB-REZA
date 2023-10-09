import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const getProfile = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/profile`, config);

  return response.data;
};

const profileService = {
  getProfile,
};

export default profileService;
