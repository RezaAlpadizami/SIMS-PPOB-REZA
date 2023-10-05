import imgProfile from "../../assets/img/img-profile.png";
import DirectoryItem from "../../components/directory/directory-categories-item.component";
import DirectoryListBanner from "../../components/directory/directory-list-banner.component";
import { useState } from "react";

const items = [
  {
    id: 1,
    imgUrl: "PBB.png",
    title: "PBB",
  },
  {
    id: 2,
    imgUrl: "Listrik.png",
    title: "Listrik",
  },
  {
    id: 3,
    imgUrl: "Pulsa.png",
    title: "Pulsa",
  },
  {
    id: 4,
    imgUrl: "PDAM.png",
    title: "PDAM",
  },
  {
    id: 5,
    imgUrl: "PGN.png",
    title: "PGN",
  },
  {
    id: 6,
    imgUrl: "Televisi.png",
    title: "TV Langganan",
  },
  {
    id: 7,
    imgUrl: "Musik.png",
    title: "Musik",
  },
  {
    id: 8,
    imgUrl: "Game.png",
    title: "Voucher Game",
  },
  {
    id: 9,
    imgUrl: "VoucherMakanan.png",
    title: "Voucher Makanan",
  },
  {
    id: 10,
    imgUrl: "Kurban.png",
    title: "Kurban",
  },
  {
    id: 11,
    imgUrl: "Zakat.png",
    title: "Zakat",
  },
  {
    id: 12,
    imgUrl: "PaketData.png",
    title: "Paket Data",
  },
];

const listBanner = [
  {
    id: 1,
    imgUrl: "Banner1.png",
  },
  {
    id: 2,
    imgUrl: "Banner2.png",
  },
  {
    id: 3,
    imgUrl: "Banner3.png",
  },
  {
    id: 4,
    imgUrl: "Banner4.png",
  },
  {
    id: 5,
    imgUrl: "Banner5.png",
  },
];

const Home = () => {
  const [isShowBalance, setShowBalance] = useState(false);

  const handleShowHideBalance = () => {
    setShowBalance(!isShowBalance);
  };
  return (
    <div>
      <div className="container mx-auto px-20 my-8">
        <div className="flex flex-col gap-8">
          <div className="flex gap-48 justify-between">
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
                    Rp {isShowBalance ? "127.500" : "* * * * * *"}
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
          <DirectoryItem items={items} />
          <DirectoryListBanner listBanner={listBanner} />
        </div>
      </div>
    </div>
  );
};

export default Home;
