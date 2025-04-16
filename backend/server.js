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
    // Exit if connection fails
    process.exit(1);
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
  windowMs: 15 * 60 * 1000,
  // limit each IP to 40 requests
  max: 40,
  message: "Too many requests from this IP, please try again later.",
});

// apply to all routes
app.use(limiter);

// article schema
const articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  category: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
});
const Article = mongoose.model("Article", articleSchema);

const logSchema = new mongoose.Schema({
  action: {type: String, required: true},
  articleId: {type: mongoose.Schema.Types.ObjectId, ref: "Article"},
  timestamp: {type: Date, default: Date.now},
  title: {type: String, required: true},
});

const Log = mongoose.model("Log", logSchema);

// ROUTES

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

    // Save log for article creation
    const log = new Log({
      action: "POST",
      articleId: newArticle._id,
      title: newArticle.title,
    });
    await log.save();
    console.log("✅ Log saved for article creation");

    res.status(201).json({message: "Article created", article: newArticle});
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
});

// GET: Fetch all articles
app.get("/articles", async (req, res) => {
  try {
    const {category} = req.query;

    let articles;
    if (category) {
      // Find articles with  category
      articles = await Article.find({category});
    } else {
      // If no category, fetch all articles
      articles = await Article.find();
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

    const log = new Log({
      action: "DELETE",
      title: "All articles",
    });
    await log.save();
    console.log("✅ Log saved for bulk deletion");

    res.status(200).json({message: "All articles deleted successfully"});
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

    res.json({
      message: "Article deleted successfully",
      article: deletedArticle,
    });

    const log = new Log({
      action: "DELETE",
      articleId: deletedArticle._id,
      title: deletedArticle.title,
    });
    await log.save();
    console.log("✅ Log saved for article deletion");
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
});
