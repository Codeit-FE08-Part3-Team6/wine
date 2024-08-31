export enum Wine {
  Red = "RED",
  White = "WHITE",
  Sparkling = "SPARKLING",
}

export interface Wines {
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: Wine;
}
