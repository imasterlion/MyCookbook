import { Recipe } from '../types/Recipe';

// 从 localStorage 获取数据，如果没有则使用默认数据
export const getRecipes = (): Recipe[] => {
  const savedRecipes = localStorage.getItem('recipes');
  if (savedRecipes) {
    return JSON.parse(savedRecipes);
  }

  const defaultRecipes: Recipe[] = [
    {
      id: '1',
      name: '红烧肉',
      images: ['https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg'],
      cookingDate: new Date('2024-01-15'),
      rating: 4.5,
      cookingMethod: '步骤1...',
      reviews: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: '清炒小白菜',
      images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'],
      cookingDate: new Date('2024-01-14'),
      rating: 4,
      cookingMethod: '步骤1...',
      reviews: [],
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: '3',
      name: '番茄炒蛋',
      images: ['https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg'],
      cookingDate: new Date('2024-01-13'),
      rating: 5,
      cookingMethod: '步骤1...',
      reviews: [],
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13')
    },
    {
      id: '4',
      name: '水煮鱼',
      images: ['https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg'],
      cookingDate: new Date('2024-01-12'),
      rating: 4.5,
      cookingMethod: '步骤1...',
      reviews: [],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    }
  ];

  localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
  return defaultRecipes;
};

// 保存新的菜品
export const saveRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => {
  const recipes = getRecipes();
  const newRecipe: Recipe = {
    ...recipe,
    id: Date.now().toString(),
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  recipes.unshift(newRecipe); // 添加到列表开头
  localStorage.setItem('recipes', JSON.stringify(recipes));
  return newRecipe;
};