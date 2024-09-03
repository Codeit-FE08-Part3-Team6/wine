import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import WinesDetailCard from "@/components/wines/WineDetailCard";
import WinesReviewSection from "@/components/wines/WinesReviewSection";

export default function WineDetailPage() {
  return (
    <div className="mx-auto my-10 w-[1140px]">
      <GlobalNavBar />
      <WinesDetailCard />
      <WinesReviewSection />
    </div>
  );
}
