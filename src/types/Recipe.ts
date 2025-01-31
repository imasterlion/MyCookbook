export interface Recipe {
  id: string;
  name: string;
  images: string[];
  cookingDate: string;  // 改为 string 类型
  rating: number;
  cookingMethod?: string;
  reviews: Review[];
  createdAt: string;    // 改为 string 类型
  updatedAt: string;    // 改为 string 类型
}

export interface Review {
  id: string;
  content: string;
  createdAt: string;    // 改为 string 类型
  updatedAt: string;    // 改为 string 类型
}