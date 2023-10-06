import React, { useState } from "react";
import LogoAccount from "../../assets/img/img-profile.png";

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="rounded-full w-32 h-32 overflow-hidden">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : LogoAccount}
            alt="profile.png"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
