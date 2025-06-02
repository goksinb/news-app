import Homepage from "./pages/Homepage.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateArticle from "./pages/CreateArticle.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
