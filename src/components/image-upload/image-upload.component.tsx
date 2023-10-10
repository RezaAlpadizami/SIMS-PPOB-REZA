import React, { useState } from "react";
import LogoAccount from "../../assets/img/img-profile.png";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";

const API_URL = "https://take-home-test-api.nutech-integrasi.app";

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }

    const token = user?.data.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios
      .put(`${API_URL}/profile/image`, file, { headers })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log("err", err));
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
