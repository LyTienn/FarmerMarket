import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    key: String,
    name: String,
    image: String,
    path: String
});

export default mongoose.model("Category", categorySchema);