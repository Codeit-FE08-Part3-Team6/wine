import Link from "next/link";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import Button from "@/components/@shared/Button";
import HeroImg from "@/components/landing/HeroImg";
import MobileMain from "@/components/landing/MobileMain";
import DefaultMain from "@/components/landing/DefaultMain";

export default function HomePage() {
  return (
    <div className="bg-light-default pb-20 pt-6">
      <header className="mx-4 max-w-[1140px] md:mx-5 xl:mx-auto">
        <GlobalNavBar />
      </header>
      <main className="mx-4 mt-6 max-w-[1140px] md:mx-5 xl:mx-auto xl:mb-[104px] xl:mt-20">
        <HeroImg />
        <DefaultMain />
        <MobileMain />
        <Link href="/wines" className="mx-auto block h-[50px] w-[279px]">
          <Button buttonStyle="purple">와인 보러가기</Button>
        </Link>
      </main>
    </div>
  );
}
