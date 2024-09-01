import axiosInstance from "../axiosInstance";

export async function getWineRecommends() {
  const response = await axiosInstance.get(`wines/recommended?limit=50`);

  const body = response.data.list ?? [];

  return body;
}
