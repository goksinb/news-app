import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables

// Initialize Express app
const app = express();
app.use(express.json()); // Enable JSON body parsing
app.use(cors()); // Enable CORS

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if connection fails
  }
};

// Start server and connect to MongoDB
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB(); // Connect to MongoDB after the server starts
});

// Article schema and model
const articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
});
const Article = mongoose.model("Article", articleSchema);

// Routes

// POST: Create a new article
app.post("/articles", async (req, res) => {
  try {
    const {title, content, author} = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({message: "All fields are required"});
    }

    const newArticle = new Article({
      title,
      content,
      author,
      createdAt: new Date(),
    });
    await newArticle.save();
    res.status(201).json({message: "Article created", article: newArticle});
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
});

// GET: Fetch all articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
});

// DELETE: Delete all articles
app.delete("/articles", async (req, res) => {
  try {
    await Article.deleteMany({});
    res.json({message: "All articles deleted"});
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
});

// DELETE: Delete a single article by ID
app.delete("/articles/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({message: "Article not found"});
    }

    res.json({message: "Article deleted", article: deletedArticle});
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
});
