import Image from "next/image";
import { useState } from "react";
import updateReview from "@/libs/axios/review/patchReview";
import Dropdown from "../@shared/DropDown";
import Modal from "../@shared/Modal";
import Button from "../@shared/Button";
import { WineFlavorInputRange } from "../wines/WineFlavorInputRange";
import WineFlavorList from "../wines/WineFlavorList";
import RatingInput from "../@shared/RatingInput";
import { translateAroma, translateAromaReverse } from "../wines/TranslateAroma";

interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
}

interface ReviewCardProps {
  review: Review;
  onUpdate: (updatedReview: Review) => void;
}

function formatTimeAgo(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30; // 평균적으로 한 달을 30일로 계산

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}초 전`;
  }
  if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}분 전`;
  }
  if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}시간 전`;
  }
  if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}일 전`;
  }

  const months = Math.floor(diffInSeconds / secondsInMonth);
  return `${months}개월 전`;
}

export default function ReviewCard({ review, onUpdate }: ReviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [ratingValue, setRatingValue] = useState(review.rating);
  const [lightBold, setLightBold] = useState(review.lightBold);
  const [smoothTannic, setSmoothTannic] = useState(review.smoothTannic);
  const [drySweet, setDrySweet] = useState(review.drySweet);
  const [softAcidic, setSoftAcidic] = useState(review.softAcidic);
  const [aroma, setAroma] = useState(review.aroma);
  const [content, setContent] = useState(review.content);

  const handleRatingChange = (value: number) => setRatingValue(value);
  const handleLightBoldChange = (value: number) => setLightBold(value);
  const handleSmoothTannicChange = (value: number) => setSmoothTannic(value);
  const handleDrySweetChange = (value: number) => setDrySweet(value);
  const handleSoftAcidicChange = (value: number) => setSoftAcidic(value);
  const handleAromaChange = (value: string[]) => setAroma(value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setActiveButton(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveButton(false);
  };

  const handleUpdateReview = async () => {
    const reviewData = {
      rating: ratingValue,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma: translateAroma(aroma),
      content,
    };

    try {
      const updatedReview = await updateReview(review.id, reviewData);
      const completeReview: Review = {
        ...updatedReview,
        id: review.id,
        createdAt: review.createdAt,
        updatedAt: new Date().toISOString(), // 현재 시간을 updatedAt으로 사용
        user: review.user,
      };
      onUpdate(completeReview);
      handleCloseModal();
    } catch (error) {
      console.error("리뷰 수정하기 오류:", error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="flex w-full flex-col gap-[30px] rounded-[16px] border border-solid border-light-gray-300 px-[40px] pb-[30px] pt-[24px]">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row gap-[15px]">
            <div className="flex h-[42px] w-[80px] items-center justify-center gap-[2px] rounded-[12px] bg-light-purple-10 text-2lg-18px-bold text-light-purple-100">
              <Image
                width={20}
                height={20}
                src="images/icons/select_star.svg"
                alt="별점"
              />
              {review.rating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center text-lg-16px-regular text-light-gray-500">
              {formatTimeAgo(review.createdAt)}
            </div>
          </div>
          <Dropdown
            buttonChildren={
              <div className="relative flex h-[26px] w-[26px] items-center justify-center">
                <Image
                  fill
                  src="images/icons/hamburger.svg"
                  alt="햄버거 버튼"
                />
              </div>
            }
            width="w-[126px]"
          >
            <button
              type="button"
              onClick={handleOpenModal}
              style={
                activeButton
                  ? { backgroundColor: "#f1edfc", color: "#6a42db" }
                  : undefined
              }
            >
              수정하기
            </button>
            <button type="button">삭제하기</button>
          </Dropdown>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="max-h-[90vh] w-[528px] overflow-y-auto rounded-2xl bg-light-white p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl-24px-bold text-light-gray-800">수정하기</h1>
            <div>
              <button type="button" onClick={handleCloseModal}>
                <Image
                  width={34}
                  height={34}
                  src="images/icons/close.svg"
                  alt="닫기"
                />
              </button>
            </div>
          </div>
          <div className="mt-12">
            <div className="flex items-center gap-4">
              <Image
                height={68}
                width={68}
                src="/images/icons/review_modal_wine.svg"
                alt="와인 이미지"
              />
              <div className="flex flex-col gap-2">
                <div className="text-2lg-18px-semibold text-light-gray-800">
                  Sentinel Carbernet Sauvignon 2016
                </div>
                <RatingInput
                  rating={ratingValue}
                  name="rating"
                  onChange={handleRatingChange}
                  width={160}
                  height={32}
                />
              </div>
            </div>
          </div>
          <textarea
            placeholder="후기를 작성해 주세요"
            className="mt-6 h-[120px] w-[480px] cursor-default rounded-2xl border border-solid border-light-gray-300 bg-light-white px-5 py-[14px]"
            value={content}
            onChange={handleContentChange}
          />
          <h2 className="mt-10 text-xl-20px-bold text-light-gray-800">
            와인의 맛은 어땠나요?
          </h2>
          <div className="mt-6 flex flex-col gap-[18px]">
            <WineFlavorInputRange
              flavor="바디감"
              typeOne="가벼워요"
              typeTwo="진해요"
              value={lightBold}
              onChange={handleLightBoldChange}
            />
            <WineFlavorInputRange
              flavor="타닌"
              typeOne="부드러워요"
              typeTwo="떫어요"
              value={smoothTannic}
              onChange={handleSmoothTannicChange}
            />
            <WineFlavorInputRange
              flavor="당도"
              typeOne="드라이해요"
              typeTwo="달아요"
              value={drySweet}
              onChange={handleDrySweetChange}
            />
            <WineFlavorInputRange
              flavor="산미"
              typeOne="안셔요"
              typeTwo="많이셔요"
              value={softAcidic}
              onChange={handleSoftAcidicChange}
            />
          </div>
          <h2 className="mt-10 text-xl-20px-bold text-light-gray-800">
            기억에 남는 향이 있나요?
          </h2>
          <WineFlavorList
            aroma={translateAromaReverse(aroma)}
            onChange={handleAromaChange}
          />
          <div className="mt-10 h-[54px]">
            <Button buttonStyle="purple" onClick={handleUpdateReview}>
              수정하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
