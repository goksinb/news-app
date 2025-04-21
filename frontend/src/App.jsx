import Homepage from "./pages/Homepage.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateArticle from "./pages/CreateArticle.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
