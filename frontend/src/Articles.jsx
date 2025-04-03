import React, {useState, useEffect} from "react";
import "./styles/Articles.css";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the article");
        }
        // Remove article from state after successful deletion
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  console.log("Articles fetched:", articles);

  return (
    <div className="App">
      <div>
        <h1>Today's Articles</h1>
      </div>
      {articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <div key={article._id}>
              <li>
                <button onClick={() => handleDelete(article._id)}>
                  Remove article
                </button>
                <div className="article">
                  <h2>{article.title}</h2>
                  <p>Article by {article.author}</p>
                  <p>{article.content}</p>
                </div>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Articles;
