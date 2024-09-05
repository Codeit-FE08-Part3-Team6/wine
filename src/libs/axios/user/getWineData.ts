import { WineData } from "@/types/wine";
import axiosInstance from "../axiosInstance";

export default async function getWineData() {
  const res = await axiosInstance.get<WineData>("users/me/wines", {
    params: {
      limit: 10,
    },
  });
  return res.data;
}
