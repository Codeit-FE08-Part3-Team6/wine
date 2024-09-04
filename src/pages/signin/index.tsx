import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/@shared/Input";
import Button from "@/components/@shared/Button";
import AuthLabel from "@/components/auth/AuthLabel";
import InputPassword from "@/components/@shared/InputPassword";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user, login } = useAuth();

  const handleFormChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormChange(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(formData);
    router.push("/");
  };

  useEffect(() => {
    if (user) router.push("/myprofile");
  }, [user]);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
      <form
        className="flex w-[496px] flex-col items-center rounded-2xl border border-solid border-gray-300 bg-white px-5 py-14 md:px-12 md:py-16 xl:py-20"
        onSubmit={handleSubmit}
      >
        <Link href="/">
          <Image
            src="/images/logo_black.png"
            width={104}
            height={30}
            alt="홈으로"
          />
        </Link>
        <AuthLabel className="mb-2.5 mt-14 w-full md:mt-16" label="이메일">
          <Input
            name="email"
            placeholder="이메일 입력"
            onChange={handleInputChange}
            value={formData.email}
          />
        </AuthLabel>
        <AuthLabel className="mb-10 w-full md:mb-14" label="비밀번호">
          <InputPassword
            name="password"
            placeholder="비밀번호 입력"
            onChange={handleInputChange}
            value={formData.password}
          />
        </AuthLabel>
        <div className="mb-6 flex w-full flex-col gap-3.5 md:mb-8">
          <Button style={{ height: "50px" }} buttonStyle="purple" type="submit">
            로그인
          </Button>
          <div className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-solid border-gray-300">
            <Image
              src="/images/google_icon.png"
              width={24}
              height={24}
              alt="구글"
            />
            <p className="text-lg-16px-medium text-gray-800">
              Google로 시작하기
            </p>
          </div>
          <div className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-solid border-gray-300">
            <Image
              src="/images/kakao_icon.png"
              width={24}
              height={24}
              alt="카카오"
            />
            <p className="text-lg-16px-medium text-gray-800">
              kakao로 시작하기
            </p>
          </div>
        </div>
        <div className="flex gap-3.5">
          <span className="text-md-14px-regular text-gray-500 md:text-lg-16px-regular">
            계정이 없으신가요?
          </span>
          <Link href="/signup">
            <span className="text-md-14px-medium text-light-purple-100 underline md:text-lg-16px-medium">
              회원가입하기
            </span>
          </Link>
        </div>
      </form>
    </main>
  );
}
