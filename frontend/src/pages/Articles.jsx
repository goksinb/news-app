import React, {useState, useEffect} from "react";
import "/global.css";
import {Link} from "react-router-dom";
import Banner from "../components/Banner.jsx";

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
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-serif">
      {/* Header */}
      <div
        className=" sticky
        top-0
        left-0
        w-screen
        text-white
        text-center
       
        z-50"
      >
        <Banner />
      </div>
      <header className="border-b border-gray-300 py-4 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Daily Articles
          </h1>
          <Link
            to="/create-article"
            className="text-sm text-blue-700 hover:underline font-sans"
          >
            Create New Article
          </Link>
        </div>
      </header>

      {/* Articles */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No articles available.
          </p>
        ) : (
          <ul className="space-y-10">
            {articles.map((article) => (
              <li key={article._id} className="border-b pb-6">
                <h2 className="text-2xl font-semibold mb-1">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-3 font-sans">
                  By {article.author} · {article.category}
                </p>
                <p className="text-base text-gray-800 leading-relaxed">
                  {article.content}
                </p>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="mt-4 text-red-600 hover:underline text-sm font-sans"
                >
                  Remove article
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-12 py-4 border-t">
        ------------------------
      </footer>
    </div>
  );
}

export default Articles;
