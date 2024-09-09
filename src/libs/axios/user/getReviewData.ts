import axiosInstance from "../axiosInstance";

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

export default async function getReviewData() {
  const res = await axiosInstance.get<ReviewData>("users/me/reviews", {
    params: {
      limit: 10,
    },
  });
  return res.data;
}
