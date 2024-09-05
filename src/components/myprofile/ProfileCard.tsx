import Image from "next/image";
import User, { UpdateUserForm } from "@/types/user";
import { useRef, useState } from "react";
import axiosInstance from "@/libs/axios/axiosInstance";
import Button from "../@shared/Button";
import Input from "../@shared/Input";

interface ProfileCardProps {
  user: User;
  updateMe: (formData: UpdateUserForm) => void;
}

export default function ProfileCard({ user, updateMe }: ProfileCardProps) {
  const [nickname, setNickname] = useState(user.nickname);
  const [imagePreview, setImagePreview] = useState(
    user.image || "/images/img_pfp_default.svg",
  );
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    const file = imageRef.current?.files?.[0];

    if (file) {
      formData.append("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
    formData.append("nickname", nickname);

    try {
      await axiosInstance.patch("users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateMe({ nickname, image: imagePreview });
    } catch (error) {
      console.error("프로필 카드 업데이트 에러:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="h-[530px] w-[280px] rounded-[16px] border border-solid border-light-gray-300 px-[20px] py-[28px]">
      <div className="flex w-[240px] flex-col items-center gap-[48px]">
        <div className="flex w-[164px] flex-col items-center gap-[32px]">
          <button
            type="button"
            className="relative h-[164px] w-[164px] cursor-pointer rounded-[9999px] border border-solid border-light-gray-300"
            onClick={() => imageRef.current?.click()}
          >
            <Image
              fill
              src={imagePreview}
              alt="프로필 이미지"
              className="rounded-[9999px]"
            />
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={() => {
                const file = imageRef.current?.files?.[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </button>
          <div className="flex w-[155px] flex-col items-center gap-[16px]">
            <div className="flex items-center justify-center text-2xl-24px-bold text-light-gray-800">
              {user.nickname}
            </div>
            <div className="flex items-center justify-center text-lg-16px-regular text-light-gray-500">
              wanda95@email.com
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[8px]">
          <div className="flex h-[84px] w-full flex-col gap-[10px]">
            <div className="flex items-center text-lg-16px-medium text-light-gray-800">
              닉네임
            </div>
            <Input
              placeholder={user.nickname}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex flex-row-reverse">
            <div className="h-[42px] w-[96px]">
              <Button buttonStyle="purple" onClick={handleUpdate}>
                변경하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
