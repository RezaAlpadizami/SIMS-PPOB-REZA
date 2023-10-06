type TItem = {
  imgUrl: String;
  title: String;
};

const CategoriesService = (item: TItem) => {
  const { imgUrl, title } = item;
  return (
    <div className="w-full flex justify-around">
      <div className="flex flex-col cursor-pointer">
        <img src={require(`../../assets/logo/${imgUrl}`)} alt="logo" />
        <p className="text-center text-xs">{title}</p>
      </div>
    </div>
  );
};

export default CategoriesService;
