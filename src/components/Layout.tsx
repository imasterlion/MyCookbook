import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.5rem',
              '&:hover': {
                color: 'primary.main' // Logo 悬停时保持原色
              }
            }}
          >
            My Cookbook
          </Typography>
          {isHomePage && (
            <Button
              variant="contained"
              component={Link}
              to="/upload"
              startIcon={<AddIcon />}
              sx={{
                px: 3,
                py: 1,
                boxShadow: 2
              }}
            >
              发布菜品
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container 
        component="main" 
        sx={{ 
          flex: 1, 
          py: 4,
          minHeight: 'calc(100vh - 64px - 100px)' // 减去头部和底部的高度
        }}
      >
        {children}
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="sm">
          <Typography 
            variant="body2" 
            align="center"
            color="text.secondary"
          >
            © {new Date().getFullYear()} My Cookbook. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;