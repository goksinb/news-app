import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

// Start Express
const app = express();
app.use(express.json());
app.use(cors());

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
const PORT = process.env.PORT || 5001;

app
  .listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await connectDB();
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      console.error(`❌ Server error:`, err);
    }
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter); // apply to all routes

// Article schema
const articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  category: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
});
const Article = mongoose.model("Article", articleSchema);

// Routes

// POST: Create a new article
app.post("/articles", async (req, res) => {
  try {
    const {title, content, author, category} = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({message: "All fields are required"});
    }

    const newArticle = new Article({
      title,
      content,
      author,
      category,
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
    const {category} = req.query; // Retrieve category from query string

    let articles;
    if (category) {
      articles = await Article.find({category}); // Find articles with the given category
    } else {
      articles = await Article.find(); // If no category, fetch all articles
    }

    res.json(articles);
  } catch (error) {
    res.status(500).json({message: "Error fetching articles", error});
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

// DELETE by ID: Delete a single article by ID
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
