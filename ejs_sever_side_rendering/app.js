import express from "express";
import path from "node:path";
import { fileURLToPath } from "url"; // Fixing __dirname issue
import userModel from "./models/user.js";

const app = express();
const PORT = 3001;

// Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Fixed

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", (req, res) => {
  res.render("read");
});

app.post("/create", async (req, res) => {
  try {
    let { name, email, image } = req.body;

    // Validate required fields
    if (!name || !email || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user with the same email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists. Please use a different email." });
    }

    // Create a new user
    const createdUser = await userModel.create({ name, email, image });
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          error: "Email already registered. Please use a different email.",
        });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
