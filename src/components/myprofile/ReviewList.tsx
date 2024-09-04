import { ReviewData } from "@/types/review";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviewData: ReviewData;
}

export default function ReviewList({ reviewData }: ReviewListProps) {
  return (
    <>
      {reviewData.list.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  );
}
