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
    const token = localStorage.getItem("token");

    fetch("http://localhost:5001/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //
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
      <h1>Create a new article</h1>
      <label htmlFor="title">Title:</label>
      <input
        className="bg-gray-200 rounded-md p-2 mb-4"
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Author:</label>
      <input
        className="bg-gray-200 rounded-md p-2 mb-4"
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="content">Content:</label>

      <textarea
        className="bg-gray-200 rounded-md p-2 mb-4"
        id="content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <label htmlFor="category">Category:</label>
      <input
        className="bg-gray-200 rounded-md p-2 mb-4"
        type="text"
        id="category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white">
        Submit Article
      </button>
      <Link to="/">Go to Homepage</Link>
    </form>
  );
}

export default CreateArticle;
