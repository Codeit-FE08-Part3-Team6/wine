export enum Wine {
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
export interface PostWine {
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: Wine;
}

export interface Wines {
  id: number;
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: Wine;
  avgRating: number | null;
  revirewCount: number | null;
  recentReview: RecentReview | null;
}

export interface WinesProps {
  wines: Wines[];
}

export interface WineProps {
  wine: Wines;
}
