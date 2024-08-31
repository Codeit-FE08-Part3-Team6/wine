import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * 중복으로 사용될 CSS 속성들을 묶은 CommonButton 컴포넌트의 프롭스
 * @interface CommonButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @property {string} additionalStyle - 추가적인 CSS 스타일을 지정해요
 * @property {ReactNode} children - 버튼의 내부에 렌더링될 내용을 지정해요
 */
interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  additionalStyle: string;
  children: ReactNode;
}

/**
 * 페이지에서 사용될 Button 컴포넌트의 프롭스
 * @interface ButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @property {"gray" | "light" | "purple"} buttonStyle - 버튼의 스타일을 지정해요
 * @property {ReactNode} children - 버튼의 내부에 렌더링될 내용을 지정해요.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: "gray" | "light" | "purple"; // 버튼 스타일 지정해주세요.
  children: ReactNode;
}

/**
 * 기본 스타일을 적용하는 CommonButton 컴포넌트
 * @param {CommonButtonProps} props - CommonButton의 프롭스
 * @returns {JSX.Element} 버튼 요소
 */
function CommonButton({
  additionalStyle,
  children,
  ...props
}: CommonButtonProps) {
  return (
    <button
      className={`${additionalStyle} flex h-full w-full items-center justify-center rounded-2xl text-lg-16px-bold`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * 다양한 스타일을 가진 버튼을 생성하는 Button 컴포넌트
 * @param {ButtonProps} props - Button의 프롭스
 * @returns {JSX.Element} 스타일에 맞는 버튼 요소
 */
export default function Button({
  buttonStyle,
  children,
  ...props
}: ButtonProps) {
  switch (buttonStyle) {
    case "gray":
      return (
        <CommonButton
          additionalStyle="border border-solid border-light-gray-300 bg-light-white text-light-gray-500"
          {...props}
        >
          {children}
        </CommonButton>
      );
    case "light":
      return (
        <CommonButton
          additionalStyle="bg-violet-100 text-lg-16px-bold text-light-purple-100"
          {...props}
        >
          {children}
        </CommonButton>
      );
    default:
      return (
        <CommonButton
          additionalStyle="bg-light-purple-100 text-light-white"
          {...props}
        >
          {children}
        </CommonButton>
      );
  }
}
