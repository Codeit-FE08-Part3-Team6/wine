import axiosInstance from "../axiosInstance";
import { PostWineDetails } from "@/types/wines";

export async function postWines({
  name,
  region,
  image,
  price,
  type,
}: PostWineDetails) {
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
