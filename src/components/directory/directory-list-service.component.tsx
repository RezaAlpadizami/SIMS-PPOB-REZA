import React from "react";
import CategoriesService from "../categories-service/categories-service.component";

interface IItems {
  id: number;
  imgUrl: String;
  title: String;
}

interface DirectoryItemsProps {
  items: IItems[];
}

const DirectoryListService: React.FC<DirectoryItemsProps> = ({ items }) => {
  return (
    <div className="flex gap-16 my-8">
      {items.map((item) => (
        <CategoriesService key={item.id} {...item} />
      ))}
    </div>
  );
};

export default DirectoryListService;
