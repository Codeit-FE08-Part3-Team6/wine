import { Wines } from "@/types/wines";
import axiosInstance from "../axiosInstance";

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

export async function postWines({ name, region, image, price, type }: Wines) {
  const response = await axiosInstance.post(
    "wines",
    { name, region, image, price, type },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0LCJ0ZWFtSWQiOiI4LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcyNTA5NTI4NiwiZXhwIjoxNzI1MDk3MDg2LCJpc3MiOiJzcC1lcGlncmFtIn0.ziAzwFjjxbd0H1F-n1_cPEoQtPVmqDIwIOdhhTYqvT8",
      },
    },
  );
  const body = response.data;

  return body;
}
