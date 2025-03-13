import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/testapp1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000, // Wait up to 1 seconds before throwing an error
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Correctly define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
});

export default mongoose.model("User", userSchema);
