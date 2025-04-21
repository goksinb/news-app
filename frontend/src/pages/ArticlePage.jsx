import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Header from "../components/Header.jsx";
import bannerImg from "../assets/images/articleImg.webp";

const ArticlePage = () => {
  const {id} = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5001/articles`);
        const data = await response.json();
        const found = data.find((item) => item._id === id);
        if (!found) {
          throw new Error("Article not found");
        }
        setArticle(found);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color: "red"}}>{error}</p>;

  return (
    <div className="article-page">
      <Header />
      <div className="article-page-details">
        <div className="article-page-meta">
          <h1>{article.title}</h1>
          <p>
            {article.author} · {article.category}
          </p>
        </div>
        <div className="article-detail-image">
          <img src={bannerImg} alt="Banner" className="banner-image" />
        </div>
      </div>

      <p className="article-content" style={{marginTop: "1rem"}}>
        {article.content}
      </p>
    </div>
  );
};

export default ArticlePage;
