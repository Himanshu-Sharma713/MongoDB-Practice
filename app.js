import express from "express";
import userModel from "./usermodel.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>CRUD Operations using Mongoose </h1>");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "devshree",
    username: "devshre317",
    email: "devshree123@exmple.com",
  });

  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "himanshu713" },
    { name: "Himanshu Adesh" },
    { new: true }
  );

  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let user = await userModel.find();
  res.send(user);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({
    username: "himanshu713",
  });

  res.send(`User ${deletedUser} is delete from database`);
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}/`);
});
