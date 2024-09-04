import { Review } from "@/types/review";
import Image from "next/image";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="flex w-full flex-col gap-[30px] rounded-[16px] border border-solid border-light-gray-300 px-[40px] pb-[30px] pt-[24px]">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row gap-[15px]">
            <div className="flex h-[42px] w-[80px] items-center justify-center rounded-[12px] bg-light-purple-10 text-2lg-18px-bold text-light-purple-100">
              ★ {review.rating}
            </div>
            <div className="flex items-center justify-center text-lg-16px-regular text-light-gray-500">
              {review.createdAt}
            </div>
          </div>
          <div className="relative flex h-[26px] w-[26px] items-center justify-center">
            <Image fill src="/icons/hamburger.svg" alt="햄버거 버튼" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-[10px]">
          <div className="text-lg-16px-medium text-light-gray-500">
            Palazzo della Torre 2017
          </div>
          <div className="text-lg-16px-regular text-light-gray-800">
            {review.content}
          </div>
        </div>
      </div>
    </div>
  );
}
