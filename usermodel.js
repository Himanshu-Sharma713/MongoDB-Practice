import mongoose from "mongoose";

const database = mongoose.connect(`mongodb://localhost:27017/mongopractice`);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});
