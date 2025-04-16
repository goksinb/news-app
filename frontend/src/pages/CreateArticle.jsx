import React, {useState} from "react";
import {Link} from "react-router-dom";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [articles, setArticles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newArticle = {
      title,
      author,
      content,
      category,
    };

    fetch("http://localhost:5001/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create article");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Article posted:", data);
        // Optionally add new article to the list in UI
        setArticles((prev) => [...prev, data.article]);

        // Reset the form
        setTitle("");
        setAuthor("");
        setContent("");
        setCategory("");
      })
      .catch((error) => {
        console.error("Error posting article:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col">
      <h1 className="bg">Create a new article</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Submit Article</button>
      <Link to="/">Go to Homepage</Link>
    </form>
  );
}

export default CreateArticle;
