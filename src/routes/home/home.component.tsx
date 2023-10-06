import DirectoryListService from "../../components/directory/directory-list-service.component";
import DirectoryListBanner from "../../components/directory/directory-list-banner.component";

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
  return (
    <div>
      <div className="container mx-auto px-20 my-8">
        <div className="flex flex-col gap-8">
          <DirectoryListService items={items} />
          <DirectoryListBanner listBanner={listBanner} />
        </div>
      </div>
    </div>
  );
};

export default Home;
