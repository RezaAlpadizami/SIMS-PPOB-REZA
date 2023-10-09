import React from "react";
import CategoriesService from "../categories-service/categories-service.component";

interface IItems {
  service_code: string;
  service_icon: string;
  service_name: string;
  service_tariff: number;
}

interface DirectoryItemsProps {
  items: IItems[];
}

const DirectoryListService: React.FC<DirectoryItemsProps> = ({ items }) => {
  return (
    <div className="flex gap-16 my-8">
      {items.map((item) => (
        <CategoriesService key={item.service_code} {...item} />
      ))}
    </div>
  );
};

export default DirectoryListService;
