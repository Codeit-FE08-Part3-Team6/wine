import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import ProfileCard from "@/components/myprofile/ProfileCard";
import ReviewList from "@/components/myprofile/ReviewList";
import TopBar from "@/components/myprofile/TopBar";
import WineList from "@/components/myprofile/WineList";
import { useAuth } from "@/contexts/AuthProvider";
import axiosInstance from "@/libs/axios/axiosInstance";
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

  // 사용자 인증 상태 체크
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  // 와인 및 리뷰 데이터 가져오기
  useEffect(() => {
    const getWineData = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get<WineData>("users/me/wines", {
          params: {
            limit: 10,
          },
        });
        const nextWineData = res.data;
        setWineData(nextWineData);
      } catch (error) {
        console.error("와인 데이터 불러오기 실패:", error);
      }
    };

    const getReviewData = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get<ReviewData>("users/me/reviews", {
          params: {
            limit: 10,
          },
        });
        const nextReviewData = res.data;
        setReviewData(nextReviewData);
      } catch (error) {
        console.error("리뷰 데이터 불러오기 실패:", error);
      }
    };

    if (user) {
      getWineData();
      getReviewData();
    }
  }, [user]);

  if (isPending) {
    return <div>로딩중...</div>;
  }

  // 이미 리디렉션했으므로 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-[40px]">
      <div className="h-[70px] w-[1140px]">
        <GlobalNavBar />
      </div>
      <div className="flex w-[1140px] flex-row gap-[60px]">
        <ProfileCard user={user} updateMe={updateMe} />
        <div className="flex w-[800px] flex-col gap-[40px]">
          <TopBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviewCount={reviewData ? reviewData.list.length : 0}
            wineCount={wineData ? wineData.list.length : 0}
          />
          {activeTab === "reviews" &&
          reviewData &&
          reviewData.list.length === 0 ? (
            <div>등록된 리뷰가 없습니다.</div>
          ) : (
            activeTab === "reviews" &&
            reviewData && <ReviewList reviewData={reviewData} />
          )}
          {activeTab === "wines" && wineData && wineData.list.length === 0 ? (
            <div>등록된 와인이 없습니다.</div>
          ) : (
            activeTab === "wines" &&
            wineData && <WineList wineData={wineData} />
          )}
        </div>
      </div>
    </div>
  );
}
