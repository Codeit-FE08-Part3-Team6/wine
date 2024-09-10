import { Wine, WineFilterProps } from "@/types/wines";
import axiosInstance from "../axiosInstance";

export interface Response {
  list: Wine[];
  nextCursor: number | null;
}

export default async function getWines(
  limit: number,
  wineFilter: WineFilterProps,
  wineCursor: number | null,
): Promise<Response> {
  try {
    const { wineType, winePrice, wineName, wineRating } = wineFilter;

    console.log(wineCursor);
    const response = await axiosInstance.get<Response>(
      `/wines?limit=${limit}&type=${wineType}&minPrice=${winePrice.min}&maxPrice=${winePrice.max}&name=${wineName}&rating=${wineRating}&cursor=${wineCursor}`,
    );

    const list = response.data.list ?? [];
    const nextCursor = response.data.nextCursor ?? null;

    return {
      list,
      nextCursor,
    };
  } catch (error) {
    console.error("wines 데이터 가져오기 실패:", error);
    return {
      list: [],
      nextCursor: null,
    };
  }
}
