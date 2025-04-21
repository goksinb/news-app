import {Link} from "react-router-dom";

export default function Header() {
  return (
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

        <Link to="/create-article" className="create-article-link">
          Create New Article
        </Link>
      </div>
    </header>
  );
}
