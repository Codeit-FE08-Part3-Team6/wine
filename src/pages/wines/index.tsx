import WineFilter from "@/components/wines/WineFilter";
import WineItemList from "@/components/wines/WineItemList";
import WineRecommendItemList from "@/components/wines/WineRecommendItemList";
import getWines from "@/libs/axios/wine/getWines";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import {
  PostWineDetails,
  Wine,
  WineEnum,
  WineFilterProps,
} from "@/types/wines";
import React, { useEffect, useState } from "react";
import Button from "@/components/@shared/Button";
import Input from "@/components/@shared/Input";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/@shared/Modal";
import AddWine from "@/components/wines/AddWine";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const [wineValue, setWineValue] = useState<PostWineDetails>({
    name: "",
    region: "",
    image: "",
    price: 0,
    type: WineEnum.Red,
  });

  const [wineFilterValue, setWineFilterValue] = useState<WineFilterProps>({
    wineType: WineEnum.Red,
    winePrice: { min: 0, max: 100000 },
    wineRating: "",
    wineName: "",
  });

  const [isAddWineModalOpen, toggleIsAddWineModalOpen] = useToggle(false);

  async function fetchWines() {
    const getWineList: Wine[] = await getWines(10, wineFilterValue); // 와인 목록 조회
    setWineList(getWineList);
  }

  const handleFilterChange = (newFilterValue: WineFilterProps) => {
    setWineFilterValue(newFilterValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWineFilterValue((prevValue) => ({
      ...prevValue,
      wineName: e.target.value,
    }));
  };

  useEffect(() => {
    fetchWines()
      .then(() => {
        // 성공적으로 데이터 로드
      })
      .catch((error) => {
        console.error("Error during fetching data:", error);
      });
  }, [wineFilterValue]);

  return (
    <div className="flex max-w-[1920px] flex-col items-center justify-center py-10">
      <div className="flex max-w-[1140px] flex-col gap-6">
        <GlobalNavBar />
        <WineRecommendItemList />

        <div className="flex justify-end">
          <label className="relative block w-[800px]" htmlFor="search-input">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Image
                src="/images/ic_search.svg"
                alt="searchIcon"
                width={20}
                height={20}
              />
            </span>
            <Input
              id="search-input"
              className="pl-10"
              placeholder="와인을 검색해보세요"
              onChange={handleSearchChange}
            />
          </label>
        </div>

        <div className="flex">
          <div className="flex w-[340px] flex-col gap-16">
            <WineFilter
              wineFilterValue={wineFilterValue}
              onFilterChange={handleFilterChange}
            />

            <div className="h-[50px] w-[284px]">
              <Button
                onClick={() => toggleIsAddWineModalOpen()}
                buttonStyle="purple"
              >
                와인 등록 하기
              </Button>
            </div>
            <Modal
              isOpen={isAddWineModalOpen}
              onClose={() => toggleIsAddWineModalOpen()}
            >
              <AddWine onClose={() => toggleIsAddWineModalOpen()} />
            </Modal>
          </div>

          <WineItemList wines={wineList} />
        </div>
      </div>
    </div>
  );
}
