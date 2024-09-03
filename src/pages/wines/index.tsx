import WineFilter from "@/components/wines/WineFilter";
import WineItemList from "@/components/wines/WineItemList";
import WineRecommendItemList from "@/components/wines/WineRecommendItemList";
import getWineRecommends from "@/libs/axios/wine/getWineRecommends";
import getWines from "@/libs/axios/wine/getWines";
import postWines from "@/libs/axios/wine/postWines";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import {
  PostWineDetails,
  Wine,
  WineEnum,
  WineFilterProps,
} from "@/types/wines";
import { useEffect, useState } from "react";
import Button from "@/components/@shared/Button";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const [wineValue, setWineValue] = useState<PostWineDetails>({
    name: "",
    region: "",
    image: "",
    price: 0,
    type: WineEnum.Red,
  });

  async function fetchWines() {
    const getWineList: Wine[] = await getWines(10); // 와인 목록 조회
    const wineRecommendList: Wine[] = await getWineRecommends(); // 추천 와인 목록 조회
    setWineList(getWineList);
    console.log(wineRecommendList);
  }

  const [wineFilterValue, setWineFilterValue] = useState<WineFilterProps>({
    wineType: null,
    winePrice: { min: 0, max: 0 },
    wineRating: "",
  });

  const handleFilterChange = (newFilterValue: WineFilterProps) => {
    setWineFilterValue(newFilterValue);
    console.log(newFilterValue);
  };

  useEffect(() => {
    fetchWines()
      .then(() => {
        // 성공적으로 데이터 로드
      })
      .catch((error) => {
        console.error("Error during fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setWineValue({
        name: "인재",
        region: "대구",
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png",
        price: 10,
        type: WineEnum.Red,
      });
      const result = await postWines(wineValue);
      if (!result) {
        console.log("wine 등록 중 오류 발생");
      }
    } catch (error) {
      console.error("비동기 작업 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex w-[1920px] flex-col items-center justify-center py-10">
      <div className="max-w-[1140px flex flex-col gap-6">
        <GlobalNavBar />
        <WineRecommendItemList />
        <span>검색바</span>
        <div className="flex">
          <div className="flex w-[340px] flex-col gap-16">
            <WineFilter
              wineFilterValue={wineFilterValue}
              onFilterChange={handleFilterChange}
            />

            <div className="h-[50px] w-[284px]">
              <Button buttonStyle="purple" onClick={handleSubmit}>
                와인 등록 하기
              </Button>
            </div>
          </div>

          <WineItemList wines={wineList} />
        </div>
      </div>
    </div>
  );
}
