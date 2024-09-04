import { WineReview } from "@/types/wines";
import axiosInstance from "../axiosInstance"

export default async function getWineByReview (reviewid: string):Promise<WineReview> {
  try {
    const response = await axiosInstance.get(`reviews/${reviewid}`);
    return response.data as WineReview;
  } catch (e) {
    console.error('데이터를 불러오는데 오류가 있습니다:', e);
    throw e;
  }
}