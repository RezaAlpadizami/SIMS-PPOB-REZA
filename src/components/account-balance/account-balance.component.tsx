import { useEffect, useState } from "react";
import imgProfile from "../../assets/img/img-profile.png";
import { thousandSeparator } from "../../utils/helper";
import { getProfile, reset } from "../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getBalance,
  reset as resetBalance,
} from "../../features/balance-account/balanceSlice";

const AccountBalance: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowBalance, setShowBalance] = useState(false);

  const { profile } = useAppSelector((state) => state.profile);
  const { balance } = useAppSelector((state) => state.balance);

  const firstName = profile?.data?.first_name || "";
  const lastName = profile?.data?.last_name || "";

  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  useEffect(() => {
    dispatch(getProfile());

    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getBalance());

    dispatch(resetBalance());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowHideBalance = () => {
    setShowBalance(!isShowBalance);
  };
  return (
    <div className="flex container mx-auto px-20 my-10 gap-48 justify-between">
      <div className="flex flex-col">
        <div className="w-24 h-24 rounded-full bg-red-200 overflow-hidden">
          <img
            src={
              profile?.data.profile_image
                ? profile?.data.profile_image
                : imgProfile
            }
            alt="PNG"
            width={50}
            className="w-full h-62 object-cover"
          />
        </div>
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
              Rp{" "}
              {isShowBalance
                ? thousandSeparator(balance?.data?.balance || 0)
                : "••••••••"}
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
