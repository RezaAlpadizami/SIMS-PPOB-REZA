import DirectoryListService from "../../components/directory/directory-list-service.component";
import DirectoryListBanner from "../../components/directory/directory-list-banner.component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingLottie from "../../components/spinner-lottie/spinner-lottie.component";

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

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [dataBanner, setDataBanner] = useState<any[]>([]);
  const [dataService, setDataService] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    getAllBanner();
    getAllService();
  }, []);

  const getAllBanner = async () => {
    setIsLoading(true);
    const tokenString = localStorage.getItem("user");
    const tokenObject = tokenString ? JSON.parse(tokenString) : null;
    const token = tokenObject?.data?.token;

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
    const tokenString = localStorage.getItem("user");
    const tokenObject = tokenString ? JSON.parse(tokenString) : null;
    const token = tokenObject?.data?.token;

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
