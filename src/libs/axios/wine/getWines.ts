import axiosInstance from "../axiosInstance";

export async function getWines() {
  const response = await axiosInstance.get(`wines?limit=50`);

  const body = response.data.list ?? [];

  console.log(body);

  return body;
}
