import arrowIcon from "@/libs/axios/image/arrow.svg";
import Image from "next/image";
import { Wine } from "@/types/wines";

export interface WinesProps {
  wines: Wine[];
}

export interface WineProps {
  wine: Wine;
}

export default function WineItemList({ wines }: WinesProps) {
  return (
    <div className="flex w-[800px] flex-col gap-16">
      {wines.map((wine) => (
        <WineItemCard wine={wine} key={wine.id} />
      ))}
    </div>
  );
}

function WineItemCard({ wine }: WineProps) {
  return (
    <div className="flex h-[375px] w-full flex-col rounded-2xl border border-light-gray-300 bg-light-white">
      <div className="flex h-2/3 flex-row border-b">
        <div className="w-1/5">
          이미지 영역
          {/* {wine.image && <Image src={wine.image} alt="와인이미지" />} */}
        </div>
        <div className="flex w-4/5 flex-row justify-between py-9 pr-14">
          <div className="flex flex-col gap-2">
            <p className="text-3xl-32px-semibold text-light-gray-800">
              {wine.name}
            </p>
            <p className="text-lg-16px-regular text-light-gray-500">
              {wine.region}
            </p>
            <div className="flex h-[42px] w-[114px] items-center justify-center rounded-xl bg-light-purple-10">
              <p className="text-2lg-18px-bold text-light-purple-100">
                ₩ {wine.price.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-3xl-32px-semibold text-light-gray-800">4.8</p>
              <p className="text-lg-16px-regular text-light-gray-500">
                {wine.reviewerCount ? `${wine.reviewerCount}` : 0}개의 후기
              </p>
            </div>
            <div className="flex justify-end">
              <Image src={arrowIcon} alt="arrowIcon" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-5">
        <p className="text-lg-16px-semibold text-light-gray-800">최신후기</p>
        <p className="text-lg-16px-regular text-light-gray-500">
          Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone.
          Low acidity and medium tannins. Nice long velvety finish.
          {wine.recentReview?.content}
        </p>
      </div>
    </div>
  );
}
