import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Header from "../components/Header.jsx";

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
    <div style={{padding: "1rem"}}>
      <Header />
      <h2>{article.title}</h2>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Category:</strong> {article.category}
      </p>
      <p style={{marginTop: "1rem"}}>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
