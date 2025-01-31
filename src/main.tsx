import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'  // 添加 createTheme
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import './index.css'

const theme = createTheme()  // 临时创建主题

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
