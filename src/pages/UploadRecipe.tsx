import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Stack,
  IconButton,
  ImageList,
  ImageListItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { zhCN } from 'date-fns/locale';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveRecipe } from '../services/mockData';

const UploadRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [cookingDate, setCookingDate] = useState<Date>(new Date());
  const [rating, setRating] = useState<number | null>(null);
  const [cookingMethod, setCookingMethod] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      const isValidType = file.type.startsWith('image/');
      return isValidSize && isValidType;
    });

    if (validFiles.length + images.length > 9) {
      setErrors(prev => ({ ...prev, images: '最多只能上传9张图片' }));
      return;
    }

    setImages(prev => [...prev, ...validFiles]);
    const newUrls = validFiles.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newUrls]);
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = '请输入菜品名称';
    } else if (name.length > 100) {
      newErrors.name = '菜品名称不能超过100个字';
    } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9\s]+$/.test(name)) {
      newErrors.name = '菜品名称不能包含特殊符号';
    }

    if (images.length === 0) {
      newErrors.images = '请至少上传一张图片';
    }

    if (cookingMethod.length > 10000) {
      newErrors.cookingMethod = '制作方法不能超过10000个字';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // 直接使用 saveRecipe，删除未使用的 recipe 变量
    saveRecipe({
      name,
      images: imageUrls,
      cookingDate: cookingDate.toISOString(),
      rating: rating || 0,
      cookingMethod
    });

    // 跳转到首页
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          上传菜品
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="菜品名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
            fullWidth
          />

          <Box>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                上传图片
              </Button>
            </label>
            {errors.images && (
              <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                {errors.images}
              </Typography>
            )}
            {imageUrls.length > 0 && (
              <ImageList sx={{ mt: 2 }} cols={3} rowHeight={164}>
                {imageUrls.map((url, index) => (
                  <ImageListItem key={url}>
                    <img src={url} alt={`菜品图片 ${index + 1}`} loading="lazy" />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        bgcolor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.9)'
                        }
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
            <DatePicker
              label="制作日期"
              value={cookingDate}
              onChange={(newValue) => newValue && setCookingDate(newValue)}
            />
          </LocalizationProvider>

          <Box>
            <Typography component="legend">评分</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              precision={0.5}
              size="large"
            />
          </Box>

          <TextField
            label="制作方法"
            multiline
            rows={6}
            value={cookingMethod}
            onChange={(e) => setCookingMethod(e.target.value)}
            error={!!errors.cookingMethod}
            helperText={errors.cookingMethod}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
          >
            发布
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default UploadRecipe;