import React from "react";
import ListBanner from "../list-banner/list-banner.component";

type IBanner = {
  banner_name: string;
  banner_image: string;
  description: string;
};

interface ListBannerProps {
  listBanner: IBanner[];
}

const DirectoryListBanner: React.FC<ListBannerProps> = ({ listBanner }) => {
  return (
    <div className="my-4">
      <h3 className="font-bold my-4">Temukan promo menarik</h3>
      <div className="flex gap-2 overflow-y-auto no-scrollbar">
        {listBanner.map((banner) => (
          <div key={banner.banner_name} className="min-w-[25%]">
            <ListBanner {...banner} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectoryListBanner;
