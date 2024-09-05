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

interface WineCardProps {
  wine: Wine;
}

export default function WineCard({ wine }: WineCardProps) {
  return (
    <div className="relative flex h-[270px] w-full flex-col-reverse">
      <div className="h-[228px] w-full rounded-[16px] border border-solid border-light-gray-300 pb-[30px] pl-[140px] pr-[40px] pt-[24px]">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex h-[111px] w-[300px] flex-col gap-[20px]">
            <div className="text-3xl font-semibold text-light-gray-800">
              {wine.name}
            </div>
            <div className="text-lg-16px-regular text-light-gray-500">
              {wine.region}
            </div>
          </div>
          <div className="flex h-[37px] w-[114px] items-center justify-center rounded-[12px] bg-light-purple-10 text-2lg-18px-bold text-light-purple-100">
            ₩ {wine.price}
          </div>
        </div>
      </div>
    </div>
  );
}
