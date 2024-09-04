import Rating from "@/components/@shared/Rating";
import Button from "@/components/@shared/Button";
import Modal from "@/components/@shared/Modal";
import RatingInput from "@/components/@shared/RatingInput";
import WineFlavorRange from "@/components/wines/WineFlavorRange";
import WineFlavorList from "@/components/wines/WineFlavorList";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import CloseIcon from "../../../public/images/icon/close.svg";
import ReviewModalWine from "../../../public/images/icon/review_modal_wine.svg";

const ratings = {
  5: 3000,
  4: 1500,
  3: 500,
  2: 300,
  1: 167,
};

function RatingBar({ rating, count }: { rating: number; count: number }) {
  const widthPercentage = (count / 5446) * 100;
  return (
    <div className="mb-2 flex items-center whitespace-nowrap">
      <p className="text-lg-16px-medium text-light-gray-500">{rating}점</p>
      <div className="h-1.5 w-full rounded-[50px] bg-light-gray-100">
        <div
          className="ml-4 h-1.5 rounded-[50px] bg-light-purple-100"
          style={{ width: `${widthPercentage}%` }}
        />
      </div>
    </div>
  );
}

function RatingChart({
  ratings: ratingData,
}: {
  ratings: Record<number, number>;
}) {
  return (
    <div>
      {Object.entries(ratingData)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([rating, count]) => (
          <RatingBar
            key={rating}
            rating={Number(rating)}
            count={Number(count)}
          />
        ))}
    </div>
  );
}

interface WineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

export default function WineRatingStats() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<WineData | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [ratingValue, setRatingValue] = useState(3);
  const [lightBold, setLightBold] = useState(0);
  const [smoothTannic, setSmoothTannic] = useState(0);
  const [drySweet, setDrySweet] = useState(0);
  const [softAcidic, setSoftAcidic] = useState(0);
  const [aroma, setAroma] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const handleRatingChange = (value: number) => setRatingValue(value);
  const handleLightBoldChange = (value: number) => setLightBold(value);
  const handleSmoothTannicChange = (value: number) => setSmoothTannic(value);
  const handleDrySweetChange = (value: number) => setDrySweet(value);
  const handleSoftAcidicChange = (value: number) => setSoftAcidic(value);
  const handleAromaChange = (value: string[]) => setAroma(value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    const reviewData = {
      rating: ratingValue,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma,
      content,
      wineId: data?.id,
    };

    try {
      const response = await axios.post(
        "https://winereview-api.vercel.app/8-6/reviews",
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("리뷰를 전송하는데 성공했습니다:", response.data);
      handleModal();
    } catch (e) {
      console.error("리뷰를 전송하는데 실패했습니다:", e);
    }
  };

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      if (typeof id === "string") {
        try {
          const response = await axios.get<WineData>(
            `${process.env.NEXT_PUBLIC_WINE_DETAIL_API_URL}/${id}`,
          );
          setData(response.data);
        } catch (e) {
          console.error("데이터를 불러오는데 오류가 있습니다:", e);
        }
      }
    };

    fetchData();
  }, [id]);

  // 코드 리팩토링 진행 시에 로딩바 애니메이션 추가 예정
  // 시간이 몇 초 이상 걸리면 에러 페이지로 넘기는 방법도 괜찮을듯
  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="absolute right-0 mt-[60px] w-[280px]">
      <div className="inline-flex items-center">
        <p className="text-[54px] font-extrabold text-light-gray-800">4.8</p>
        <div className="ml-[30px] flex flex-col">
          <Rating
            rating={4.8}
            width={112}
            height={24}
            className="cursor-default"
          />
          <p className="text-md-14px-regular text-light-gray-500">
            5,446개의 후기
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <RatingChart ratings={ratings} />
      </div>
      <div className="mt-[30px] h-[42px] w-[113px]">
        <Button buttonStyle="purple" onClick={handleModal}>
          리뷰 남기기
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={handleModal}>
        <div className="max-h-[90vh] w-[528px] overflow-y-auto rounded-2xl bg-light-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl-24px-bold text-light-gray-800">
              리뷰 등록
            </h2>
            <Image
              role="button"
              src={CloseIcon as StaticImageData}
              alt="닫기"
              onClick={handleModal}
            />
          </div>
          <div className="mt-12">
            <div className="flex items-center gap-4">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-lg bg-light-gray-100">
                <Image src={ReviewModalWine as StaticImageData} alt="와인" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2lg-18px-semibold text-light-gray-800">
                  {data.name}
                </p>
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
          <p className="mt-10 text-xl-20px-bold text-light-gray-800">
            와인의 맛은 어땠나요?
          </p>
          <div className="mt-6 flex flex-col gap-[18px]">
            <WineFlavorRange
              flavor="바디감"
              typeOne="가벼워요"
              typeTwo="진해요"
              onChange={handleLightBoldChange}
            />
            <WineFlavorRange
              flavor="타닌"
              typeOne="부드러워요"
              typeTwo="떫어요"
              onChange={handleSmoothTannicChange}
            />
            <WineFlavorRange
              flavor="당도"
              typeOne="드라이해요"
              typeTwo="달아요"
              onChange={handleDrySweetChange}
            />
            <WineFlavorRange
              flavor="산미"
              typeOne="안셔요"
              typeTwo="많이셔요"
              onChange={handleSoftAcidicChange}
            />
          </div>
          <p className="mt-10 text-xl-20px-bold text-light-gray-800">
            기억에 남는 향이 있나요?
          </p>
          <WineFlavorList onChange={handleAromaChange} />
          <div className="mt-10 h-[54px]">
            <Button buttonStyle="purple" onClick={handleSubmit}>
              리뷰 남기기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
