import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: "disable" | "cancel" | "default"; // 버튼 스타일 지정해주세요.
  buttonType: "button" | "submit" | "reset"; // 버튼 타입 지정 지정해주세요.
  children: ReactNode;
}

export default function Button({
  buttonStyle = "default",
  buttonType = "button",
  children,
  ...props
}: ButtonProps) {
  switch (buttonStyle) {
    case "disable":
      return (
        <button
          type={buttonType}
          className="h-full w-full rounded-2xl border border-solid border-light-gray-300 bg-light-white px-5 py-4 text-center text-lg-16px-bold text-light-gray-500"
          {...props}
        >
          {children}
        </button>
      );

    case "cancel":
      return (
        <button
          type={buttonType}
          className="h-full w-full rounded-2xl bg-violet-100 px-5 py-4 text-center text-lg-16px-bold text-light-purple-100"
          {...props}
        >
          {children}
        </button>
      );

    default:
      return (
        <button
          type={buttonType}
          className="h-full w-full cursor-pointer rounded-2xl bg-light-purple-100 px-5 py-4 text-center text-lg-16px-bold text-light-white"
          {...props}
        >
          {children}
        </button>
      );
  }
}
