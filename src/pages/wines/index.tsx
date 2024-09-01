import WineItemList from "@/components/wines/WineItemList";
import { getWineRecommends, getWines, postWines } from "@/libs/axios/wineList";
import { PostWine, Wine, Wines } from "@/types/wines";
import { useEffect, useState } from "react";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wines[]>([]);

  const [wineValue, setWineValue] = useState<PostWine>({
    name: "인재",
    region: "대구",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png",
    price: 10,
    type: Wine.Red,
  });

  async function fetchWines() {
    const wineList = await getWines(); //와인 목록 조회
    const wineRecommendList = await getWineRecommends(); //추천 와인 목록 조회
    setWineList(wineList);
  }

  useEffect(() => {
    fetchWines();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await postWines(wineValue);
    if (!result) {
      console.log("wine 등록 중 오류 발생");
    }
  };

  return (
    <div className="flex w-[1920px] justify-center">
      <div className="max-w-[1140px]">
        <div>이번달 추천 와인</div>
        <button onClick={handleSubmit}>wine 등록</button>
        <div className="flex">
          <div className="w-[284px]">WineTypes</div>
          <WineItemList wines={wineList} />
        </div>
      </div>
    </div>
  );
}
