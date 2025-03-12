import express from "express";
import path from "node:path";

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
