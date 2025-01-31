import { Recipe } from '../types/Recipe';

const defaultRecipes: Recipe[] = [
  {
    id: '1',
    name: '示例菜品',
    images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7ngrnlh7vliqDovb3lm77niYc8L3RleHQ+PC9zdmc+'],
    cookingDate: new Date(),  // Changed from string to Date
    rating: 4.5,
    cookingMethod: '这是一个示例菜品的制作方法...',
    reviews: [],
    createdAt: new Date(),    // Changed from string to Date
    updatedAt: new Date()     // Changed from string to Date
  }
];

export const getRecipes = (): Recipe[] => {
  try {
    const stored = localStorage.getItem('recipes');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load recipes:', error);
  }
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