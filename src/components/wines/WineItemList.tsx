import Image from "next/image";
import MEDIA_QUERY_BREAK_POINT from "@/constants/mediaQueryBreakPoint";
import { Wine } from "@/types/wines";
import Link from "next/link";
import { useState, useEffect } from "react";
import Rating from "../@shared/Rating";

interface WinesProps {
  wines: Wine[];
}

interface WineProps {
  wine: Wine;
}

function WineItemCard({ wine }: WineProps) {
  const [displayName, setDisplayName] = useState(wine.name);
  const [displayWineRecentReview, setWineDisplayRecentReview] = useState(
    wine.recentReview?.content,
  );

  useEffect(() => {
    const handleResize = () => {
      setDisplayName(
        wine.name.length > 25 ? `${wine.name.slice(0, 25)}...` : wine.name,
      );
      if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.TABLET_MIN_WIDTH) {
        if (wine.recentReview?.content) {
          setWineDisplayRecentReview(
            wine.recentReview?.content.length > 80
              ? `${wine.recentReview?.content.slice(0, 80)}...`
              : wine.recentReview.content,
          );
        }
      } else if (wine.recentReview?.content) {
        setWineDisplayRecentReview(
          wine.recentReview?.content.length > 160
            ? `${wine.recentReview?.content.slice(0, 160)}...`
            : wine.recentReview.content,
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [wine.name]);
  return (
    <div className="flex h-[375px] w-full flex-col rounded-2xl border border-light-gray-300 bg-light-white">
      <div className="flex h-2/3 flex-row border-b px-12 max-md:px-5">
        <div className="flex w-1/5 items-end justify-center pr-4 max-md:w-1/3">
          <div className="relative h-5/6 w-[60px]">
            {wine.image && (
              <Image src={wine.image} alt="와인이미지" fill sizes="60px" />
            )}
          </div>
        </div>
        <div className="flex w-4/5 flex-row justify-between py-9 max-md:flex-col max-md:justify-around max-md:py-6">
          <div className="flex w-full flex-row justify-between max-md:flex-col max-md:gap-2">
            <div className="flex w-3/5 flex-col gap-2 max-md:w-full max-md:gap-0">
              <p className="overflow-hidden text-ellipsis text-3xl-32px-semibold text-light-gray-800 max-md:text-xl-20px-semibold">
                {displayName}
              </p>
              <p className="overflow-hidden text-ellipsis text-lg-16px-regular text-light-gray-500">
                {wine.region}
              </p>
              <div className="flex h-[42px] w-fit items-center justify-center rounded-xl bg-light-purple-10 px-4">
                <p className="text-2lg-18px-bold text-light-purple-100">
                  ₩ {wine.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="items-between flex w-1/5 flex-col justify-between max-md:w-full max-md:flex-row">
              <div className="flex flex-col gap-2 max-md:flex max-md:flex-row max-md:gap-5">
                <p className="text-[54px] font-extrabold text-light-gray-800 max-md:text-[28px] max-md:font-extrabold">
                  {wine.avgRating ? wine.avgRating.toFixed(1) : 0}
                </p>
                <div className="flex flex-col justify-center gap-2 max-md:gap-1">
                  <Rating
                    rating={wine.avgRating}
                    width={112}
                    height={24}
                    className="hidden cursor-default md:inline-block"
                  />
                  <Rating
                    rating={wine.avgRating}
                    width={70}
                    height={20}
                    className="inline-block cursor-default md:hidden"
                  />
                  <p className="text-lg-16px-regular text-light-gray-500 max-md:text-xs-12px-regular">
                    {wine.reviewCount ? `${wine.reviewCount}` : 0}
                    개의 후기
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Image
                  src="/images/ic_arrow_right.svg"
                  alt="arrowIcon"
                  width={36}
                  height={37}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-5 max-md:pt-2">
        <p className="text-lg-16px-semibold text-light-gray-800">최신후기</p>
        <p className="overflow-hidden text-ellipsis text-lg-16px-regular text-light-gray-500">
          {wine.recentReview?.content
            ? `${displayWineRecentReview}`
            : "작성된 후기가 없습니다."}
        </p>
      </div>
    </div>
  );
}

export default function WineItemList({ wines }: WinesProps) {
  return (
    <div className="flex w-[800px] flex-col gap-16 max-xl:w-full">
      {wines.map((wine) => (
        <Link key={wine.id} href={`/wines/${wine.id.toString()}`}>
          <WineItemCard wine={wine} />
        </Link>
      ))}
    </div>
  );
}
