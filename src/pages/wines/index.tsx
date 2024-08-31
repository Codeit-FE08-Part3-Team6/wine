import {
  getWineRecommends,
  getWines,
  postWines,
} from "@/libs/axios/wine/wineList";
import { Wine, Wines } from "@/types/wines";
import { useEffect, useState } from "react";

export default function WineListPage() {
  const [wineListTest, setWineListTest] = useState([]);

  const [wineValue, setWineValue] = useState<Wines>({
    name: "",
    region: "",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png",
    price: 0,
    type: Wine.Red,
  });

  async function fetchWines() {
    const wineList = await getWines(); //와인 목록 조회
    const wineRecommendList = await getWineRecommends(); //추천 와인 목록 조회
    setWineListTest(wineList);
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
    <div>
      와인 목록 페이지
      <button onClick={handleSubmit}>wine 등록</button>
    </div>
  );
}
