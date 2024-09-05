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
}

export default function ReviewList({ reviewData }: ReviewListProps) {
  if (reviewData.list.length === 0) {
    return <div>등록된 리뷰가 없습니다.</div>;
  }
  return (
    <>
      {reviewData.list.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  );
}
