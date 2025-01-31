import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import RecipeMasonry from '../components/RecipeMasonry';
import { Recipe } from '../types/Recipe';
import { getRecipes } from '../services/mockData';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = getRecipes();
        setRecipes(data);
      } catch (err) {
        setError('获取菜品列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        最新菜品
      </Typography>
      <RecipeMasonry recipes={recipes} />
    </Box>
  );
};

export default Home;