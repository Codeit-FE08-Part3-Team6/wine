import { ReviewData } from "@/types/review";
import axiosInstance from "../axiosInstance";

export default async function getReviewData() {
  const res = await axiosInstance.get<ReviewData>("users/me/reviews", {
    params: {
      limit: 10,
    },
  });
  return res.data;
}
