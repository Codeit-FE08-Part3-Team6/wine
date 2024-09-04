import { WineData } from "@/types/wine";
import WineCard from "./WineCard";

interface WineListProps {
  wineData: WineData;
}

export default function WineList({ wineData }: WineListProps) {
  return (
    <>
      {wineData.list.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </>
  );
}
