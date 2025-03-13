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

app.get("/read", (req, res) => {});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createdUser = userModel.create({
    name: name,
    email: email,
    image: image,
  });

  res.send(createdUser);
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
