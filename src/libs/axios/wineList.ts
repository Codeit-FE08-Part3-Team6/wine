import { PostWine, Wines } from "@/types/wines";
import axiosInstance from "./axiosInstance";

export async function getWines() {
  const response = await axiosInstance.get(`wines?limit=50`);

  const body = response.data.list ?? [];

  console.log(body);

  return body;
}

export async function getWineRecommends() {
  const response = await axiosInstance.get(`wines/recommended?limit=50`);

  const body = response.data.list ?? [];

  return body;
}

export async function postWines({
  name,
  region,
  image,
  price,
  type,
}: PostWine) {
  const response = await axiosInstance.post(
    "wines",
    { name, region, image, price, type },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body = response.data;

  return body;
}
