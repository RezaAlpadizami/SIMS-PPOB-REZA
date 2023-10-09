import { useEffect, useState } from "react";
import imgProfile from "../../assets/img/img-profile.png";
import axios from "axios";
import { thousandSeparator } from "../../utils/helper";
import { getProfile, reset } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const AccountBalance: React.FC = () => {
  const [isBalance, setIsBalance] = useState(0);
  const [isShowBalance, setShowBalance] = useState(false);
  const { isError, profile, message } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();

  const firstName = profile?.data.first_name || ""; // Ensure it's a string, handle possible null values
  const lastName = profile?.data.last_name || "";

  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProfile());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    fetchAccountBalance();
  }, []);

  const fetchAccountBalance = async () => {
    const tokenString = localStorage.getItem("user");
    const tokenObject = tokenString ? JSON.parse(tokenString) : null;
    const token = tokenObject?.data?.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${API_URL}/balance`, {
        headers,
      });
      setIsBalance(response.data.data.balance);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleShowHideBalance = () => {
    setShowBalance(!isShowBalance);
  };
  return (
    <div className="flex container mx-auto px-20 my-10 gap-48 justify-between">
      <div className="flex flex-col">
        <img src={imgProfile} alt="PNG" width={50} />
        <p className="mt-6 mb-1">Selamat Datang,</p>
        <h1 className="font-bold text-3xl">
          {capitalizedFirstName} {capitalizedLastName}
        </h1>
      </div>
      <div className="bg-saldo bg-cover rounded-3xl w-[670px] h-[161px]">
        <div className="flex flex-col">
          <div className="p-8 text-white flex flex-col justify-center gap-4 -my-1">
            <p>Saldo Anda</p>
            <h2 className="text-2xl font-bold">
              Rp {isShowBalance ? thousandSeparator(isBalance) : "••••••••"}
            </h2>
            <p
              className="text-xs cursor-pointer w-20"
              onClick={handleShowHideBalance}
            >
              Lihat Saldo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
