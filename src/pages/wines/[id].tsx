import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import WinesDetailCard from "@/components/wines/WinesDetailCard";

export default function WineDetailPage() {
  return (
    <div className="mx-auto mt-10 w-[1140px]">
      <GlobalNavBar />
      <WinesDetailCard />
    </div>
  );
}
