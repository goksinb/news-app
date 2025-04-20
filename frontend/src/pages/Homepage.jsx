import React, {useState, useEffect} from "react";
import "/global.css";
import "/src/styles/Homepage.css";
import {Link} from "react-router-dom";
import PrivacyBanner from "../components/PrivacyBanner.jsx";

function Homepage() {
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
    <div className="homepage-container">
      {/* Header */}
      <div className="privacy-banner">
        <PrivacyBanner />
      </div>
      <header className="header-container">
        <h1 className="site-title">THE ARTICLE</h1>

        <div className="header-links">
          <Link to="/" className="header-link">
            Home
          </Link>
          <Link to="/culture" className="header-link">
            Culture
          </Link>
          <Link to="/science" className="header-link">
            Science
          </Link>
          <Link to="/literature" className="header-link">
            Literature
          </Link>

          {/*   <Link to="/create-article" className="create-link">
            Create New Article
          </Link> */}
        </div>
      </header>

      {/* Articles */}
      <main className="articles-section">
        {articles.length === 0 ? (
          <p className="no-articles">No articles available.</p>
        ) : (
          <ul className="article-list">
            {articles.map((article) => (
              <li key={article._id} className="article">
                <img src="https://placehold.co/250x200" alt="" />
                <Link to={`/articles/${article._id}`} className="article-title">
                  {article.title}
                </Link>
                <p className="article-meta">
                  By {article.author} · {article.category}
                </p>
                <p className="article-content">{article.content}</p>
                {/*   */}
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="cta">
          <p>Let's get started on something great</p>
          <button className="cta-button">Start your 7-day trial</button>
        </div>
        <div className="footer-inner">
          <div className="footer-links">
            <h2>Product</h2>
            <Link to="/overview" className="footer-link">
              Overview
            </Link>
            <Link to="/features" className="footer-link">
              Features
            </Link>
            <Link to="/solutions" className="footer-link">
              Solutions
            </Link>
            <Link to="/pricing" className="footer-link">
              Pricing
            </Link>
          </div>
          <div className="footer-links">
            <h2>Company</h2>
            <Link to="/about-us" className="footer-link">
              About Us
            </Link>
            <Link to="/careers" className="footer-link">
              Careers
            </Link>
            <Link to="/press" className="footer-link">
              Press
            </Link>
            <Link to="/news" className="footer-link">
              News
            </Link>
          </div>
          <div className="footer-links">
            <h2>Company</h2>
            <Link to="/about-us" className="footer-link">
              About Us
            </Link>
            <Link to="/careers" className="footer-link">
              Careers
            </Link>
            <Link to="/press" className="footer-link">
              Press
            </Link>
            <Link to="/news" className="footer-link">
              News
            </Link>
          </div>
          <div className="footer-links">
            <h2>Company</h2>
            <Link to="/about-us" className="footer-link">
              About Us
            </Link>
            <Link to="/careers" className="footer-link">
              Careers
            </Link>
            <Link to="/press" className="footer-link">
              Press
            </Link>
            <Link to="/news" className="footer-link">
              News
            </Link>
          </div>
          <div className="footer-links">
            <h2>Company</h2>
            <Link to="/about-us" className="footer-link">
              About Us
            </Link>
            <Link to="/careers" className="footer-link">
              Careers
            </Link>
            <Link to="/press" className="footer-link">
              Press
            </Link>
            <Link to="/news" className="footer-link">
              News
            </Link>
          </div>
          <div className="footer-links">
            <h2>Company</h2>
            <Link to="/about-us" className="footer-link">
              About Us
            </Link>
            <Link to="/careers" className="footer-link">
              Careers
            </Link>
            <Link to="/press" className="footer-link">
              Press
            </Link>
            <Link to="/news" className="footer-link">
              News
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
