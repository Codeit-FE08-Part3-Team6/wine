import { InputHTMLAttributes, useState } from "react";
import Input from "./Input";
import Image from "next/image";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function InputPassword({ ...props }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const eyeImageSrc = isPasswordVisible
    ? "/images/EyeIcon.png"
    : "/images/EyeIconSlashed.png";

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative w-full">
      <Input type={isPasswordVisible ? "text" : "password"} {...props} />
      <Image
        width={24}
        height={24}
        className="absolute right-5 top-3 cursor-pointer"
        src={eyeImageSrc}
        alt="비밀번호 보이기"
        onClick={toggleVisibility}
      />
    </div>
  );
}
