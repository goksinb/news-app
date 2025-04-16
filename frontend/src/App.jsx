import "./App.css";
import Articles from "./pages/Articles.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateArticle from "./pages/CreateArticle.jsx";
import Banner from "./components/Banner.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/create-article" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
