export interface WineData {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  avgRatings: Record<string, number>;
  reviews: WineReview[];
}

export interface WineReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string | null;
  };
  wineId: number;
}

export interface WineFlavorInputRangeProps {
  flavor: string;
  typeOne: string;
  typeTwo: string;
  onChange?: (value: number) => void | undefined;
}

export interface WineFlavorRangeProps {
  flavor: string;
  typeOne: string;
  typeTwo: string;
  value?: number;
}
