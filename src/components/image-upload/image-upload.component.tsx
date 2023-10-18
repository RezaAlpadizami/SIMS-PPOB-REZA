import React, { useState } from "react";
import imgProfile from "../../assets/img/img-profile.png";
import { Modal } from "antd";
import { getProfile } from "../../features/profile/profileSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import axios from "axios";
import { message } from "antd";

const ImageUpload: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showMessage = (type: "success" | "error", content: string) => {
    message.open({
      type,
      content,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      showModal();
    }
  };

  const changeProfileImage = async () => {
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (selectedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/profile/image`,
          formData,
          {
            headers,
          }
        );
        setIsLoading(false);
        dispatch(getProfile());
        showMessage("success", response?.data?.message);
      } catch (err) {
        setIsLoading(false);
        console.error("Error:", err);
      }
    }
    setOpen(false);
  };

  return (
    <>
      <div>
        <div className="relative">
          <div className="rounded-full w-24 h-24 overflow-hidden">
            <img
              src={
                profile?.data?.profile_image.includes("null")
                  ? imgProfile
                  : profile?.data?.profile_image
              }
              alt="profile.png"
              className="w-full h-62 object-cover"
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
      <Modal
        title="Profile Image"
        open={open}
        width={300}
        centered={true}
        onOk={changeProfileImage}
        okButtonProps={{
          className: "bg-red-400",
        }}
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <p>{`Yakin mengganti profile dengan ini ${selectedFile?.name}`}</p>
      </Modal>
    </>
  );
};

export default ImageUpload;
