import { useEffect, useState } from "react";
import Image from "next/image";

interface WineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

export default function WinesDetailCard() {
  const [data, setData] = useState<WineData | null>(null);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://winereview-api.vercel.app/8-6/wines/201",
        );
        const result: WineData = await response.json();
        setData(result);
      } catch (e) {
        console.error("데이터를 불러오는데 오류가 있습니다:", e);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mt-5 h-[302px] w-full pt-[42px]">
      <div className="flex h-[260px] w-full rounded-2xl border border-light-gray-300">
        <div className="flex h-full w-[244px] items-end justify-center">
          <Image src={data.image} alt="와인 이미지" width={58} height={260} />
        </div>
        <div>
          <div className="mt-[52px] flex h-[111px] w-[300px] flex-col gap-5">
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <p className="text-lg-16px-regular text-light-gray-500">
              {data.region}
            </p>
          </div>
          <div className="mt-5 inline-flex h-[37px] items-center rounded-xl bg-light-purple-10 px-[15px] py-2 text-2lg-18px-bold text-light-purple-100">
            ₩ {data.price}
          </div>
        </div>
      </div>
    </div>
  );
}
