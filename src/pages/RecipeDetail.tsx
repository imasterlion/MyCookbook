import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Rating,
  Paper,
  ImageList,
  ImageListItem,
  Button,
  TextField,
  Stack,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Recipe, Review } from '../types/Recipe';
import { getRecipes } from '../services/mockData';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [editingMethod, setEditingMethod] = useState(false);
  const [tempMethod, setTempMethod] = useState('');
  const [newReview, setNewReview] = useState('');
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [tempReview, setTempReview] = useState('');

  useEffect(() => {
    const recipes = getRecipes();
    const found = recipes.find(r => r.id === id);
    if (found) {
      setRecipe(found);
      setTempMethod(found.cookingMethod || '');
    }
  }, [id]);

  const handleMethodSave = () => {
    if (!recipe) return;
    if (tempMethod.length > 10000) {
      alert('制作方法不能超过10000字');
      return;
    }
    const recipes = getRecipes();
    const updatedRecipe = {
      ...recipe,
      cookingMethod: tempMethod,
      updatedAt: new Date().toISOString()  // Convert Date to string
    };
    const updatedRecipes = recipes.map(r => 
      r.id === recipe.id ? updatedRecipe : r
    );
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setRecipe(updatedRecipe);
    setEditingMethod(false);
  };

  const handleAddReview = () => {
    if (!recipe || !newReview.trim()) return;
    if (newReview.length > 1000) {
      alert('评价内容不能超过1000字');
      return;
    }
    const newReviewObj: Review = {
      id: Date.now().toString(),
      content: newReview.trim(),
      createdAt: new Date().toISOString(),  // Convert Date to string
      updatedAt: new Date().toISOString()   // Convert Date to string
    };
    const updatedRecipe = {
      ...recipe,
      reviews: [newReviewObj, ...recipe.reviews]
    };
    const recipes = getRecipes();
    const updatedRecipes = recipes.map(r => 
      r.id === recipe.id ? updatedRecipe : r
    );
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setRecipe(updatedRecipe);
    setNewReview('');
  };

  const handleEditReview = (reviewId: string) => {
    if (!recipe) return;
    const review = recipe.reviews.find(r => r.id === reviewId);
    if (review) {
      setEditingReview(reviewId);
      setTempReview(review.content);
    }
  };

  const handleSaveReview = (reviewId: string) => {
    if (!recipe) return;
    if (tempReview.length > 1000) {
      alert('评价内容不能超过1000字');
      return;
    }
    const updatedRecipe = {
      ...recipe,
      reviews: recipe.reviews.map(r => 
        r.id === reviewId 
          ? { ...r, content: tempReview, updatedAt: new Date().toISOString() }  // Convert Date to string
        : r
      )
    };
    const recipes = getRecipes();
    const updatedRecipes = recipes.map(r => 
      r.id === recipe.id ? updatedRecipe : r
    );
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setRecipe(updatedRecipe);
    setEditingReview(null);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!recipe) return;
    const updatedRecipe = {
      ...recipe,
      reviews: recipe.reviews.filter(r => r.id !== reviewId)
    };
    const recipes = getRecipes();
    const updatedRecipes = recipes.map(r => 
      r.id === recipe.id ? updatedRecipe : r
    );
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setRecipe(updatedRecipe);
  };

  if (!recipe) {
    return (
      <Container>
        <Typography>菜品不存在</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {recipe.name}
        </Typography>

        <ImageList 
          sx={{ 
            mt: 2,
            gap: '16px !important',
            '& .MuiImageListItem-root': {
              borderRadius: 2,
              overflow: 'hidden'
            }
          }} 
          cols={3} 
          rowHeight={200}
        >
          {recipe.images.map((image, index) => (
            <ImageListItem key={index}>
              <img src={image} alt={`${recipe.name} - 图片 ${index + 1}`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              制作日期：{format(new Date(recipe.cookingDate), 'yyyy年MM月dd日', { locale: zhCN })}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography component="legend">评分：</Typography>
              <Rating value={recipe.rating} precision={0.5} readOnly />
            </Box>
          </Box>

          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">制作方法</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setEditingMethod(true)}
              >
                编辑
              </Button>
            </Box>
            {editingMethod ? (
              <Box>
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  value={tempMethod}
                  onChange={(e) => setTempMethod(e.target.value)}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button onClick={() => setEditingMethod(false)}>取消</Button>
                  <Button variant="contained" onClick={handleMethodSave}>保存</Button>
                </Box>
              </Box>
            ) : (
              <Typography whiteSpace="pre-wrap">
                {recipe.cookingMethod || '暂无制作方法'}
              </Typography>
            )}
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>评价</Typography>
            <TextField
              fullWidth
              placeholder="添加评价..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleAddReview}>
                发布评价
              </Button>
            </Box>

            <Stack spacing={2} sx={{ mt: 3 }}>
              {recipe.reviews.map((review) => (
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.01)',
                      transition: 'background-color 0.3s ease'
                    }
                  }}
                >
                  {editingReview === review.id ? (
                    <Box>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={tempReview}
                        onChange={(e) => setTempReview(e.target.value)}
                      />
                      <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button onClick={() => setEditingReview(null)}>取消</Button>
                        <Button variant="contained" onClick={() => handleSaveReview(review.id)}>
                          保存
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Typography>{review.content}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(review.updatedAt), 'yyyy-MM-dd HH:mm')}
                        </Typography>
                        <Box>
                          <IconButton size="small" onClick={() => handleEditReview(review.id)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteReview(review.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
};

export default RecipeDetail;