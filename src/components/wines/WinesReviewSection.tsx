import { useState } from "react";
import Image from "next/image";
import Profiles from "../../../public/images/img_pfp_default.svg";
import UnselectLike from "../../../public/images/icon/unselect_like.svg";
import SelectLike from "../../../public/images/icon/select_like.svg";
import DropdownButton from "../../../public/images/icon/dropdown_button.svg";
import DownArrow from "../../../public/images/icon/down_arrow.svg";
import WineFlavorRange from "@/components/wines/WineFlavorRange";
import SelectStar from "../../../public/images/icon/select_star.svg";
import UpArrow from "../../../public/images/icon/up_arrow.svg";
import Dropdown from "@/components/@shared/DropDown";
import Link from "next/link";

export default function WinesReviewSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikeButton = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <h2 className="mt-[60px] inline-block text-xl-20px-bold text-light-gray-800">
        리뷰 목록
      </h2>
      <div className="mt-[22px] max-w-[800px] rounded-2xl border border-gray-300 px-10 pt-[16.5px]">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Image src={Profiles} alt="프로필 사진" width={64} height={64} />
            <div className="flex flex-col justify-center gap-1">
              <p className="text-2lg-18px-semibold text-light-gray-800">
                와인러버
              </p>
              <p className="text-lg-16px-regular text-light-gray-500">
                10시간 전
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Image
              role="button"
              src={UnselectLike}
              alt="좋아요"
              width={38}
              height={38}
              onClick={handleLikeButton}
              className={`${isLiked ? "hidden" : ""}`}
            />
            <Image
              role="button"
              src={SelectLike}
              alt="좋아요"
              width={38}
              height={38}
              onClick={handleLikeButton}
              className={`${isLiked ? "" : "hidden"}`}
            />
            <Dropdown
              width="w-[101px] md:w-[126px]"
              buttonChildren={
                <Image
                  role="button"
                  src={DropdownButton}
                  alt="메뉴 열기"
                  width={38}
                  height={38}
                />
              }
            >
              <button type="button">수정하기</button>
              <button type="button">삭제하기</button>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mt-5 flex gap-2.5">
            <div className="inline-block rounded-[100px] border border-gray-300 px-[15px] py-2">
              체리
            </div>
            <div className="inline-block rounded-[100px] border border-gray-300 px-[15px] py-2">
              오크
            </div>
          </div>
          <div className="mt-5 inline-flex items-center gap-[2px] rounded-xl bg-light-purple-10 px-[15px] py-2 text-2lg-18px-bold text-light-purple-100">
            <Image src={SelectStar} alt="별점" width={20} height={20} />
            5.0
          </div>
        </div>
        <p
          className={`mt-6 text-lg-16px-regular text-light-gray-800 ${isExpanded ? "" : "hidden"}`}
        >
          Deep maroon color, tasting notes of blackberry, dark chocolate, plum.
          Super jammy and bold with some smoky after notes. Big flavor. Amazing
          value (would pay three times the price for it), well balanced flavor.
          Could drink all day everyday with or without food. I need more
          immediately.
        </p>
        <div
          className={`mt-5 flex flex-col gap-[18px] ${isExpanded ? "" : "hidden"}`}
        >
          <WineFlavorRange
            flavor="바디감"
            typeOne="가벼워요"
            typeTwo="진해요"
          />
          <WineFlavorRange
            flavor="타닌"
            typeOne="부드러워요"
            typeTwo="떫어요"
          />
          <WineFlavorRange
            flavor="당도"
            typeOne="드라이해요"
            typeTwo="달아요"
          />
          <WineFlavorRange flavor="산미" typeOne="안셔요" typeTwo="많이셔요" />
        </div>
        <Image
          role="button"
          src={DownArrow}
          alt="더보기"
          className={`mx-auto my-3.5 flex ${isExpanded ? "hidden" : ""}`}
          onClick={handleToggle}
        />
        <Image
          role="button"
          src={UpArrow}
          alt="작게보기"
          className={`mx-auto my-3.5 flex ${isExpanded ? "" : "hidden"}`}
          onClick={handleToggle}
        />
      </div>
    </>
  );
}
