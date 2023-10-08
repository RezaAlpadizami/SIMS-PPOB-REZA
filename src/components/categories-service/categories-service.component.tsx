type TItem = {
  service_icon: String;
  service_name: String;
};

const CategoriesService = (item: TItem) => {
  const { service_icon, service_name } = item;
  return (
    <div className="w-full flex justify-around">
      <div className="flex flex-col cursor-pointer">
        <img src={`${service_icon}`} alt="icon" />
        <p className="text-center text-xs">{service_name}</p>
      </div>
    </div>
  );
};

export default CategoriesService;
