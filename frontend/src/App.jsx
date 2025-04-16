import "./App.css";
import Articles from "./pages/Articles.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateArticle from "./pages/CreateArticle.jsx";
import Banner from "./components/Banner.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
