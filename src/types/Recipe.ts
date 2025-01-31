export interface Recipe {
  id: string;
  name: string;
  images: string[];
  cookingDate: Date;
  rating: number;
  cookingMethod?: string;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}