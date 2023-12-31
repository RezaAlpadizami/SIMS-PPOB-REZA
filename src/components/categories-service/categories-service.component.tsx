import { useNavigate } from "react-router-dom";

type TItem = {
  service_icon: String;
  service_name: String;
  service_tariff: number;
  service_code: string;
};

const CategoriesService = (item: TItem) => {
  const navigate = useNavigate();
  const { service_icon, service_name, service_tariff, service_code } = item;

  const handleClickService = () => {
    navigate("/payment", {
      state: { service_icon, service_name, service_tariff, service_code },
    });
  };
  return (
    <div
      className="w-full flex justify-around cursor-pointer"
      onClick={handleClickService}
    >
      <div className="flex flex-col justify-center items-center cursor-pointer">
        <img src={`${service_icon}`} alt="icon" className="w-14 h-14" />
        <p className="text-center text-xs">{service_name}</p>
      </div>
    </div>
  );
};

export default CategoriesService;
