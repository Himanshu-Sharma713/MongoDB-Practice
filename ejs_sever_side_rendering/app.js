import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("<h1> CRUD Operations with EJS & Server-Side Rendering </h1>");
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
