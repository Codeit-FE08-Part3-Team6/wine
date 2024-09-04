import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import ProfileCard from "@/components/myprofile/ProfileCard";
import ReviewList from "@/components/myprofile/ReviewList";
import TopBar from "@/components/myprofile/TopBar";
import WineList from "@/components/myprofile/WineList";
import { useAuth } from "@/contexts/AuthProvider";
import getReviewData from "@/libs/axios/user/getReviewData";
import getWineData from "@/libs/axios/user/getWineData";
import { ReviewData } from "@/types/review";
import { WineData } from "@/types/wine";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MyProfilePage() {
  const { user, isPending, updateMe } = useAuth(true);
  const router = useRouter();
  const [wineData, setWineData] = useState<WineData | undefined>(undefined);
  const [reviewData, setReviewData] = useState<ReviewData | undefined>(
    undefined,
  );
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");

  const renderContent = () => {
    if (activeTab === "reviews" && reviewData) {
      return <ReviewList reviewData={reviewData} />;
    }
    if (activeTab === "wines" && wineData) {
      return <WineList wineData={wineData} />;
    }
    return null;
  };

  // 사용자 인증 상태 체크
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  // 와인 및 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (user) {
        try {
          const wines = await getWineData();
          setWineData(wines);
        } catch (error) {
          console.error("와인 데이터 불러오기 실패:", error);
        }

        try {
          const reviews = await getReviewData();
          setReviewData(reviews);
        } catch (error) {
          console.error("리뷰 데이터 불러오기 실패:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  // 이미 리디렉션했으므로 아무것도 렌더링하지 않음
  if (isPending || !user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-[40px]">
      <div className="h-[70px] w-[1140px]">
        <GlobalNavBar />
      </div>
      <div className="flex w-[1140px] flex-row gap-[60px]">
        {user && <ProfileCard user={user} updateMe={updateMe} />}
        <div className="flex w-[800px] flex-col gap-[40px]">
          <TopBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviewCount={reviewData ? reviewData.list.length : 0}
            wineCount={wineData ? wineData.list.length : 0}
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
