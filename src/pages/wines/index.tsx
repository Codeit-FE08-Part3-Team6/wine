import WineItemList from "@/components/wines/WineItemList";
import getWineRecommends from "@/libs/axios/wine/getWineRecommends";
import getWines from "@/libs/axios/wine/getWines";
import postWines from "@/libs/axios/wine/postWines";

import { PostWineDetails, Wine, WineEnum } from "@/types/wines";
import { useEffect, useState } from "react";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const [wineValue, setWineValue] = useState<PostWineDetails>({
    name: "인재",
    region: "대구",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png",
    price: 10,
    type: WineEnum.Red,
  });

  async function fetchWines() {
    const getWineList: Wine[] = await getWines(); // 와인 목록 조회
    const wineRecommendList: Wine[] = await getWineRecommends(); // 추천 와인 목록 조회
    setWineList(getWineList);
    console.log(wineRecommendList);
  }

  useEffect(() => {
    fetchWines()
      .then(() => {
        // 성공적으로 데이터 로드
      })
      .catch((error) => {
        console.error("Error during fetching data:", error);
      });
  }, []);

  // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   try {
  //       const result = await postWines(wineValue);
  //       if (!result) {
  //           console.log("wine 등록 중 오류 발생");
  //       }
  //   } catch (error) {
  //       console.error("비동기 작업 중 오류 발생:", error);
  //   }
  // };

  return (
    <div className="flex w-[1920px] justify-center">
      <div className="max-w-[1140px]">
        <div>이번달 추천 와인</div>
        {/* <button type="button" onClick={handleSubmit}>wine 등록</button> */}
        <div className="flex">
          <div className="w-[284px]">WineTypes</div>
          <WineItemList wines={wineList} />
        </div>
      </div>
    </div>
  );
}
