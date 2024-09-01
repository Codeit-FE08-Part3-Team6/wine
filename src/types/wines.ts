export enum WineEnum {
  Red = "RED",
  White = "WHITE",
  Sparkling = "SPARKLING",
}

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface RecentReview {
  user: User;
  updatedAt: Date;
  createdAt: Date;
  content: String;
  aroma: String[];
  rating: number;
}

export interface PostWineDetails {
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: WineEnum;
}

export interface Wine extends PostWineDetails {
  id: number;
  type: WineEnum;
  avgRating: number | null;
  reviewerCount: number | null;
  recentReview: RecentReview | null;
}
