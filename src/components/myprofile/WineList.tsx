import { Dispatch, SetStateAction } from "react";
import WineCard from "./WineCard";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
}

interface WineData {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}

interface WineListProps {
  wineData: WineData;
  setWineData: Dispatch<SetStateAction<WineData | undefined>>;
}

export default function WineList({ wineData, setWineData }: WineListProps) {
  const handleUpdateWine = (updatedWine: Wine) => {
    setWineData((prev) => {
      if (!prev) {
        return {
          totalCount: 0,
          nextCursor: 0,
          list: [updatedWine],
        };
      }

      return {
        ...prev,
        list: prev.list.map((wine) =>
          wine.id === updatedWine.id ? updatedWine : wine,
        ),
      };
    });
  };

  if (wineData.list.length === 0) {
    return <div>등록된 와인이 없습니다.</div>;
  }
  return (
    <>
      {wineData.list.map((wine) => (
        <WineCard key={wine.id} wine={wine} onUpdate={handleUpdateWine} />
      ))}
    </>
  );
}
