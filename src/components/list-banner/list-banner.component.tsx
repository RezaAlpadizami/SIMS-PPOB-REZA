type IBanner = {
  banner_image: String;
};

const ListBanner = (banner: IBanner) => {
  return (
    <div className="cursor-pointer">
      <img
        src={`${banner.banner_image}`}
        alt="banner.png"
        className="w-[90%]"
      />
    </div>
  );
};

export default ListBanner;
