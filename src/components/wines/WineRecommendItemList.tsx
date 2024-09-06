import Image from "next/image";
import { Wine } from "@/types/wines";
import getWineRecommends from "@/libs/axios/wine/getWineRecommends";
import { useRef, useState, useEffect } from "react";
import MEDIA_QUERY_BREAK_POINT from "@/constants/mediaQueryBreakPoint";
import Rating from "../@shared/Rating";

interface WineProps {
  wine: Wine;
}

function WineRecommendCard({ wine }: WineProps) {
  return (
    <div className="box-border flex h-[185px] w-[232px] shrink-0 rounded-2xl bg-light-white px-6 pt-6 max-md:w-[193px]">
      <div className="w-2/5">이미지</div>
      <div className="flex w-3/5 flex-col gap-2">
        <p className="text-4xl">
          {wine.avgRating ? wine.avgRating.toFixed(1) : 0}
        </p>
        <Rating
          rating={wine.avgRating}
          width={90}
          height={18}
          className="cursor-default"
        />
        <p className="text-xs-12px-regular text-light-gray-500">{wine.name}</p>
      </div>
    </div>
  );
}

export default function WineRecommendItemList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const [scrollRange, setScrollRange] = useState(900);
  const [wineRecommends, setWineRecommends] = useState<Wine[]>([]);

  async function fetchWines() {
    const wineRecommendList: Wine[] = await getWineRecommends(); // 추천 와인 목록 조회
    setWineRecommends(wineRecommendList);
  }

  useEffect(() => {
    fetchWines()
      .then(() => {
        // 성공적으로 데이터 로드
      })
      .catch((error) => {
        console.error("Error during fetching data:", error);
      });

    const handleScroll = () => {
      if (containerRef.current) {
        setCurrentScrollValue(containerRef.current.scrollLeft);
      }
    };
    const currentRef = containerRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.TABLET_MIN_WIDTH) {
        setScrollRange(210);
      } else if (
        window.innerWidth < MEDIA_QUERY_BREAK_POINT.DESKTOP_MIN_WIDTH
      ) {
        setScrollRange(500);
      } else {
        setScrollRange(900);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (direction: string) => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.scrollLeft -= scrollRange;
      } else if (direction === "right") {
        containerRef.current.scrollLeft += scrollRange;
      }
    }
  };

  return (
    <div className="flex h-[299px] w-full flex-col rounded-2xl bg-light-gray-100">
      <div className="flex flex-col gap-6 py-4">
        <span className="px-6 text-xl-20px-bold text-light-gray-800">
          이번 달 추천 와인
        </span>
        <div className="relative">
          {currentScrollValue > 0 && (
            <button
              type="button"
              className="absolute left-4 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-solid border-light-gray-300 bg-light-white"
              onClick={() => handleClick("left")}
            >
              <Image
                className="rotate-180"
                src="/images/ic_x_scroll_right.svg"
                alt="arrowIcon"
                width={16}
                height={16}
              />
            </button>
          )}

          <div
            className="flex gap-5 overflow-x-hidden px-6"
            ref={containerRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {wineRecommends.map((wine) => (
              // eslint-disable-next-line react/no-array-index-key
              <WineRecommendCard key={wine.id} wine={wine} />
            ))}
          </div>
          {containerRef.current &&
            containerRef.current.scrollWidth >
              containerRef.current.clientWidth + currentScrollValue + 1 && (
              <button
                type="button"
                className="absolute right-4 top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full border border-solid border-light-gray-300 bg-light-white"
                onClick={() => handleClick("right")}
              >
                <Image
                  src="/images/ic_x_scroll_right.svg"
                  alt="arrowIcon"
                  width={16}
                  height={16}
                />
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
