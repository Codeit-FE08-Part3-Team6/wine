import Image from "next/image";

export default function MobileMain() {
  return (
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
  );
}
