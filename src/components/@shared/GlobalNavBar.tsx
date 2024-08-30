import Image from "next/image";
import { useRouter } from "next/router";

export default function GlobalNavBar() {
  const { pathname } = useRouter();
  const logoImg = undefined;

  return (
    <header className="flex h-[50px] w-full items-center justify-between rounded-2xl bg-light-black px-5 text-md-14px-medium text-light-white md:h-[70px] md:px-[60px] md:text-lg-16px-medium">
      <Image
        width={52}
        height={15}
        src="/images/logo_white.png"
        alt="로고 이미지"
      />
      <div className="flex gap-5 md:gap-10">
        {localStorage.getItem("accessToken") ? (
          <>
            <Image
              className="block md:hidden"
              width={30}
              height={30}
              src={logoImg ?? "/images/img_pfp_default.svg"}
              alt="프로필 이미지"
            />
            <Image
              className="hidden md:block"
              width={40}
              height={40}
              src={logoImg ?? "/images/img_pfp_default.svg"}
              alt="프로필 이미지"
            />
          </>
        ) : (
          <>
            <div>로그인</div>
            {pathname === "/" && <div>회원가입</div>}
          </>
        )}
      </div>
    </header>
  );
}
