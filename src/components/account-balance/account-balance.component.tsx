import { useState } from "react";
import imgProfile from "../../assets/img/img-profile.png";

const AccountBalance = () => {
  const [isShowBalance, setShowBalance] = useState(false);

  const balance = "127.500";

  const handleShowHideBalance = () => {
    setShowBalance(!isShowBalance);
  };
  return (
    <div className="flex container mx-auto px-20 my-10 gap-48 justify-between">
      <div className="flex flex-col">
        <img src={imgProfile} alt="PNG" width={50} />
        <p className="mt-6 mb-1">Selamat Datang,</p>
        <h1 className="font-bold text-3xl">Kristanto Wibowo</h1>
      </div>
      <div className="bg-saldo bg-cover rounded-3xl w-[670px] h-[161px]">
        <div className="flex flex-col">
          <div className="p-8 text-white flex flex-col justify-center gap-4 -my-1">
            <p>Saldo Anda</p>
            <h2 className="text-2xl font-bold">
              Rp {isShowBalance ? balance : "••••••••"}
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
