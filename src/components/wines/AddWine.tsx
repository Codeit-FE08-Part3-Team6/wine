import React, { useEffect, useState } from "react";
import { PostWineDetails, WineEnum } from "@/types/wines";
import postWines from "@/libs/axios/wine/postWines";
import Input from "../@shared/Input";
import Button from "../@shared/Button";
import InputSelect from "../@shared/InputSelect";
import Dropdown from "../@shared/DropDown";

interface Props {
  onClose: () => void;
}

export default function AddWine({ onClose }: Props) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [wineValue, setWineValue] = useState<PostWineDetails>({
    name: "",
    region: "",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png",
    price: 0,
    type: WineEnum.Red,
  });

  const wineTypes = [
    { id: 1, value: WineEnum.Red },
    { id: 2, value: WineEnum.White },
    { id: 3, value: WineEnum.Sparkling },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await postWines(wineValue);
      if (!result) {
        console.log("wine 등록 중 오류 발생");
      }
    } catch (error) {
      console.error("비동기 작업 중 오류 발생:", error);
    }
    onClose();
  };

  const handleWineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setWineValue((prevWineValue) => ({
      ...prevWineValue,
      [id]: id === "price" ? Number(value) : value,
    }));
  };

  const handleWineTypeChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: WineEnum,
  ) => {
    e.preventDefault();
    setWineValue((prevWineValue) => ({
      ...prevWineValue,
      type,
    }));
  };

  const handelCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    const { name, price, region } = wineValue;
    if (name !== "" && price !== 0 && region !== "") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [wineValue]);

  return (
    <div className="z-50 h-[871px] w-[460px] rounded-3xl bg-light-white p-6">
      <article className="flex flex-col gap-10">
        <span className="text-2xl-24px-bold">와인 등록</span>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <label htmlFor="name" className="text-lg-16px-medium">
                와인 이름
              </label>
              <Input
                id="name"
                placeholder="와인 이름 입력"
                onChange={handleWineValueChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="price" className="text-lg-16px-medium">
                가격
              </label>
              <Input
                id="price"
                placeholder="가격 입력"
                type="number"
                onChange={handleWineValueChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="region" className="text-lg-16px-medium">
                원산지
              </label>
              <Input
                id="region"
                placeholder="원산지 입력"
                onChange={handleWineValueChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="type" className="text-lg-16px-medium">
                타입
              </label>

              <Dropdown
                width="w-full mx-auto"
                buttonChildren={<InputSelect placeholder={wineValue.type} />}
                childType="wine"
              >
                {wineTypes.map((wineType) => (
                  <button
                    key={wineType.id}
                    value={wineType.value}
                    onClick={(e) => handleWineTypeChange(e, wineType.value)}
                  >
                    {wineType.value}
                  </button>
                ))}
              </Dropdown>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="image" className="text-lg-16px-medium">
                이미지
              </label>
              <Input id="image" placeholder="임시 이미지 input" />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="h-[54px] w-[108px]">
              <Button buttonStyle="light" onClick={handelCancelClick}>
                취소
              </Button>
            </div>
            <div className="h-[54px] w-[294px]">
              <Button
                buttonStyle={submitDisabled ? "gray" : "purple"}
                type="submit"
                disabled={submitDisabled}
              >
                와인 등록하기
              </Button>
            </div>
          </div>
        </form>
      </article>
    </div>
  );
}
