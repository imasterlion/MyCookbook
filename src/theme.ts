import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6000',
      light: '#FF8533',
      dark: '#E65600',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#4ECDC4',
      light: '#71DAD3',
      dark: '#37B8B0'
    },
    background: {
      default: '#F7F7F7',
      paper: '#FFFFFF'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#FF8533',
            color: '#FFFFFF'
          }
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#FF8533',
          }
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: '#FF8533',
            color: '#FFFFFF'
          }
        },
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: '#FF8533',
            color: '#FFFFFF',
            borderColor: '#FF8533'
          }
        }
      }
    }
  }
});