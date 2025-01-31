import Masonry from 'react-masonry-css';
import { Box, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Recipe';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface RecipeMasonryProps {
  recipes: Recipe[];
}

const RecipeMasonry = ({ recipes }: RecipeMasonryProps) => {
  const navigate = useNavigate();
  
  const breakpointColumns = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {recipes.map((recipe) => (
          <Card 
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={recipe.images[0]}
              alt={recipe.name}
              onError={(e: any) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {format(new Date(recipe.cookingDate), 'yyyy年MM月dd日', { locale: zhCN })}
              </Typography>
              <Rating
                value={recipe.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
};

export default RecipeMasonry;