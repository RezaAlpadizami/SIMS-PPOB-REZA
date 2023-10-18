import axios from "axios";

const getProfile = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/profile`,
    config
  );

  return response.data;
};

const profileService = {
  getProfile,
};

export default profileService;
