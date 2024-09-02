import { Wine } from "@/types/wines";
import axiosInstance from "../axiosInstance";

export interface Response {
  list: Wine[];
}

export default async function getWines(): Promise<Wine[]> {
  try {
    const response = await axiosInstance.get<Response>(`/wines?limit=50`);

    const body = response.data.list ?? [];

    return body;
  } catch (error) {
    console.error("wines 데이터 가져오기 실패:", error);
    return [];
  }
}
