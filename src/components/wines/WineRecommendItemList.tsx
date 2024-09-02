import Image from "next/image";
import { useRef } from "react";

function WineRecommendCard() {
  return (
    <div className="box-border flex h-[185px] w-[232px] shrink-0 rounded-2xl bg-light-white px-6 pt-6">
      <div className="w-2/5">이미지</div>
      <div className="flex w-3/5 flex-col gap-2">
        <p className="text-4xl">4.8</p>
        <p className="text-xs-12px-regular text-light-gray-500">
          Palazzo della Torre 2017
        </p>
      </div>
    </div>
  );
}

export default function WineRecommendItemList() {
  const containerRef = useRef<HTMLDivElement>(null);

  const wineCards = Array(10).fill(null);

  const handleRightClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 900;
    }
  };

  const handleLeftClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 780;
    }
  };

  return (
    <div className="flex h-[299px] w-[1140px] flex-col rounded-2xl bg-light-gray-100">
      <div className="flex flex-col gap-6 py-4">
        <span className="px-6 text-xl-20px-bold text-light-gray-800">
          이번 달 추천 와인
        </span>
        <div className="relative">
          <button
            type="button"
            className="absolute left-4 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full border border-solid border-light-gray-300 bg-light-white"
            onClick={handleLeftClick}
          >
            {"<-"}
          </button>

          {containerRef.current?.scrollLeft}
          <div
            className="flex gap-5 overflow-x-scroll px-6"
            ref={containerRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {wineCards.map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <WineRecommendCard key={index} />
            ))}
          </div>

          <button
            type="button"
            className="absolute right-4 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full border border-solid border-light-gray-300 bg-light-white"
            onClick={handleRightClick}
          >
            <Image
              src="/images/vector.svg"
              alt="arrowIcon"
              width={16}
              height={16}
              style={{ width: "auto", height: "auto" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
