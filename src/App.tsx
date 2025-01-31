// 删除这行
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 添加这行
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import UploadRecipe from './pages/UploadRecipe';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  console.log('App rendering'); // 添加调试日志
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
