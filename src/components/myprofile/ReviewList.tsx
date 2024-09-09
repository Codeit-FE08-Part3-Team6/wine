import { Dispatch, SetStateAction } from "react";
import ReviewCard from "./ReviewCard";

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

interface ReviewData {
  totalCount: number;
  nextCursor: number;
  list: Review[];
}

interface ReviewListProps {
  reviewData: ReviewData;
  setReviewData: Dispatch<SetStateAction<ReviewData | undefined>>;
}

export default function ReviewList({
  reviewData,
  setReviewData,
}: ReviewListProps) {
  const handleUpdateReview = (updatedReview: Review) => {
    setReviewData((prev) => {
      if (!prev) {
        return {
          totalCount: 0,
          nextCursor: 0,
          list: [updatedReview],
        };
      }

      return {
        ...prev,
        list: prev.list.map((review) =>
          review.id === updatedReview.id ? updatedReview : review,
        ),
      };
    });
  };

  if (reviewData.list.length === 0) {
    return <div>등록된 리뷰가 없습니다.</div>;
  }

  // 리뷰를 최신순으로 정렬
  const sortedReviews = [...reviewData.list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      {sortedReviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onUpdate={handleUpdateReview}
        />
      ))}
    </>
  );
}
