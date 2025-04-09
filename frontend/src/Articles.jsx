import React, {useState, useEffect} from "react";

import "/global.css";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/articles/${id}`, {
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
    <div className="width=100 mx-0 my-auto font-serif ">
      <header>
        <h1 className="bg">Today's Articles</h1>
      </header>
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
                <div className="flex-col border-b-1 border-gray-200 my-0 mx-20 text-justify">
                  <h2>{article.title}</h2>
                  <p>Article by {article.author}</p>
                  <p>Category: {article.category}</p>
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
