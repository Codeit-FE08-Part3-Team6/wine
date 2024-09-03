import Link from "next/link";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import Button from "@/components/@shared/Button";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-light-default pb-20 pt-6">
      <header className="mx-4 max-w-[1140px] md:mx-5 xl:mx-auto">
        <GlobalNavBar />
      </header>
      <main className="mx-4 mt-6 max-w-[1140px] md:mx-5 xl:mx-auto xl:mb-[104px] xl:mt-20">
        <section className="mx-auto">
          <div className="relative hidden md:block md:pb-[47%] xl:h-[535px] xl:w-[1140px] xl:pb-0">
            <Image
              fill
              src="/images/landing/lg_main_hero.png"
              alt="메인 히어로 이미지"
            />
          </div>
          <div className="relative block pb-[117%] md:hidden">
            <Image
              fill
              src="/images/landing/sm_main_hero.png"
              alt="메인 히어로 이미지"
            />
          </div>
        </section>
        <section className="hidden flex-col justify-center gap-24 md:mx-auto md:mb-20 md:mt-20 md:flex md:w-[699px] xl:mb-24 xl:mt-40">
          <Image
            width={699}
            height={320}
            src="/images/landing/lg_main_recommend.png"
            alt="와인 추천 소개 이미지"
          />
          <Image
            width={640}
            height={320}
            src="/images/landing/lg_main_filter.png"
            alt="필터 기능 소개 이미지"
          />
          <Image
            width={640}
            height={320}
            src="/images/landing/lg_main_review.png"
            alt="리뷰 시스템 소개 이미지"
          />
        </section>
        <section className="mb-16 mt-12 block md:hidden">
          <div className="relative pb-[123%]">
            <Image
              fill
              src="/images/landing/sm_main_recommend.png"
              alt="와인 추천 소개 이미지"
            />
          </div>
          <div className="relative pb-[123%]">
            <Image
              fill
              src="/images/landing/sm_main_filter.png"
              alt="필터 기능 소개 이미지"
            />
          </div>
          <div className="relative pb-[123%]">
            <Image
              fill
              src="/images/landing/sm_main_review.png"
              alt="리뷰 시스템 소개 이미지"
            />
          </div>
        </section>
        <Link href="/wines" className="mx-auto block h-[50px] w-[279px]">
          <Button buttonStyle="purple">와인 보러가기</Button>
        </Link>
      </main>
    </div>
  );
}
