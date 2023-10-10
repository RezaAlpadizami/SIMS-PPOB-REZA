import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import LoadingLottie from "../../components/spinner-lottie/spinner-lottie.component";
import DirectoryListBanner from "../../components/directory/directory-list-banner.component";
import DirectoryListService from "../../components/directory/directory-list-service.component";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [dataBanner, setDataBanner] = useState<any[]>([]);
  const [dataService, setDataService] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    getAllBanner();
    getAllService();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBanner = async () => {
    setIsLoading(true);
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`${API_URL}/banner`, {
        headers,
      });
      setIsLoading(false);
      setDataBanner(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching banners:", error);
    }
  };

  const getAllService = async () => {
    setIsLoading(true);
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`${API_URL}/services`, {
        headers,
      });
      setIsLoading(false);
      setDataService(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching banners:", error);
    }
  };

  return (
    <div>
      {isLoading && <LoadingLottie />}
      <div className="container mx-auto px-20 my-8">
        <div className="flex flex-col gap-8">
          <DirectoryListService items={dataService} />
          <DirectoryListBanner listBanner={dataBanner} />
        </div>
      </div>
    </div>
  );
};

export default Home;
