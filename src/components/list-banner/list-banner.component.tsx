type IBanner = {
  imgUrl: String;
};

const ListBanner = (banner: IBanner) => {
  return (
    <div className="cursor-pointer">
      <img
        src={require(`../../assets/banner/${banner.imgUrl}`)}
        alt="banner.png"
        className="w-[90%]"
      />
    </div>
  );
};

export default ListBanner;
