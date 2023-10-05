import React from "react";
import CategoriesItem from "../categories-item/categories-item.component";

interface IItems {
  id: number;
  imgUrl: String;
  title: String;
}

interface DirectoryItemsProps {
  items: IItems[];
}

const DirectoryItem: React.FC<DirectoryItemsProps> = ({ items }) => {
  return (
    <div className="flex gap-16 my-8">
      {items.map((item) => (
        <CategoriesItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default DirectoryItem;
