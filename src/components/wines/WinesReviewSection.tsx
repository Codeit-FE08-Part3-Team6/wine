import { WineFlavorRange } from "@/components/wines/WineFlavorInputRange";
import Dropdown from "@/components/@shared/DropDown";
import { WineData, WineReview } from "@/types/wines";
import getWineById from "@/libs/axios/wine/getWineById";
import getWineByReview from "@/libs/axios/wine/getWineByReview";
import timeAgo from "@/components/wines/TimeAgo";
import { translateAromaReverse } from "@/components/wines/TranslateAroma";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import Profiles from "../../../public/images/img_pfp_default.svg";
import UnselectLike from "../../../public/images/icon/unselect_like.svg";
import SelectLike from "../../../public/images/icon/select_like.svg";
import DropdownButton from "../../../public/images/icon/dropdown_button.svg";
import DownArrow from "../../../public/images/icon/down_arrow.svg";
import SelectStar from "../../../public/images/icon/select_star.svg";
import UpArrow from "../../../public/images/icon/up_arrow.svg";

export default function WinesReviewSection() {
  const [likedReviews, setLikedReviews] = useState<Record<number, boolean>>({});
  const [reviews, setReviews] = useState<WineReview[]>([]); // 변수 이름 변경
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});
  const router = useRouter();
  const { id } = router.query;

  const handleToggle = (reviewId: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const handleLikeButton = (reviewId: number) => {
    setLikedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  useEffect(() => {
    const getData = async () => {
      if (typeof id === "string") {
        try {
          const wineData: WineData = await getWineById(id);

          if (wineData.reviews.length > 0) {
            const reviewPromises = wineData.reviews.map((review) =>
              getWineByReview(review.id.toString()),
            );
            const reviewsData: WineReview[] = await Promise.all(reviewPromises);
            setReviews(reviewsData);
          } else {
            console.error("리뷰 ID를 찾을 수 없습니다.");
          }
        } catch (e) {
          console.error("데이터를 불러오는데 오류가 있습니다:", e);
        }
      }
    };

    getData();
  }, [id]);

  return (
    <>
      <h2 className="mt-[60px] inline-block text-xl-20px-bold text-light-gray-800">
        리뷰 목록
      </h2>
      {reviews.map((review) => {
        const translatedAromas = translateAromaReverse(review.aroma);
        const isExpanded = expandedReviews[review.id] || false;
        return (
          <div
            key={review.id} // 리뷰의 고유 ID를 키로 사용
            className="mt-[22px] max-w-[800px] rounded-2xl border border-gray-300 px-10 pt-[16.5px]"
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Image
                  src={
                    review.user.image
                      ? review.user.image
                      : (Profiles as StaticImageData)
                  }
                  alt="프로필 사진"
                  width={64}
                  height={64}
                />
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-2lg-18px-semibold text-light-gray-800">
                    {review.user.nickname}
                  </p>
                  <p className="text-lg-16px-regular text-light-gray-500">
                    {timeAgo(review.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Image
                  role="button"
                  src={UnselectLike as StaticImageData}
                  alt="좋아요"
                  width={38}
                  height={38}
                  onClick={() => handleLikeButton(review.id)}
                  className={`${likedReviews[review.id] ? "hidden" : ""}`}
                />
                <Image
                  role="button"
                  src={SelectLike as StaticImageData}
                  alt="좋아요"
                  width={38}
                  height={38}
                  onClick={() => handleLikeButton(review.id)}
                  className={`${likedReviews[review.id] ? "" : "hidden"}`}
                />
                <Dropdown
                  width="w-[101px] md:w-[126px]"
                  buttonChildren={
                    <Image
                      role="button"
                      src={DropdownButton as StaticImageData}
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
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {translatedAromas.map((flavor) => (
                  <div
                    key={flavor}
                    className="inline-block rounded-[100px] border border-gray-300 px-[15px] py-2"
                  >
                    {flavor}
                  </div>
                ))}
              </div>
              <div className="mt-5 inline-flex max-h-[42px] min-w-[80px] items-center gap-[2px] rounded-xl bg-light-purple-10 px-[15px] py-2 text-2lg-18px-bold text-light-purple-100">
                <Image
                  src={SelectStar as StaticImageData}
                  alt="별점"
                  width={20}
                  height={20}
                />
                {review.rating !== null ? review.rating.toFixed(1) : 0}
              </div>
            </div>
            <p
              className={`mt-6 text-lg-16px-regular text-light-gray-800 ${isExpanded ? "" : "hidden"}`}
            >
              {review.content}
            </p>
            <div
              className={`mt-5 flex flex-col gap-[18px] ${isExpanded ? "" : "hidden"}`}
            >
              <WineFlavorRange
                flavor="바디감"
                typeOne="가벼워요"
                typeTwo="진해요"
                value={review.lightBold}
              />
              <WineFlavorRange
                flavor="타닌"
                typeOne="부드러워요"
                typeTwo="떫어요"
                value={review.smoothTannic}
              />
              <WineFlavorRange
                flavor="당도"
                typeOne="드라이해요"
                typeTwo="달아요"
                value={review.drySweet}
              />
              <WineFlavorRange
                flavor="산미"
                typeOne="안셔요"
                typeTwo="많이셔요"
                value={review.softAcidic}
              />
            </div>
            <Image
              role="button"
              src={DownArrow as StaticImageData}
              alt="더보기"
              className={`mx-auto my-3.5 flex ${isExpanded ? "hidden" : ""}`}
              onClick={() => handleToggle(review.id)}
            />
            <Image
              role="button"
              src={UpArrow as StaticImageData}
              alt="작게보기"
              className={`mx-auto my-3.5 flex ${isExpanded ? "" : "hidden"}`}
              onClick={() => handleToggle(review.id)}
            />
          </div>
        );
      })}
    </>
  );
}
