import Dropdown from "@/components/@shared/DropDown";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="bg-light-default text-4xl">홈페이지</h1>
      <Link href="/myprofile">내 프로필 페이지</Link>
      <br />
      <Link href="/signin">로그인 페이지</Link>
      <br />
      <Link href="/signup">회원가입 페이지</Link>
      <br />
      <Link href="/wines">와인 목록 페이지</Link>
      <br />
      <Link href="/wines/1">와인 상세 페이지</Link>
      <br />
      <Link href="/oauth/signup/google">구글 간편 회원가입 페이지</Link>
      <br />
      <Link href="/oauth/signup/kakao">카카오 간편 회원가입 페이지</Link>
      <br />
    </div>
  );
}
