import mongoose from "mongoose";

const AppSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
  month: Number,
});

export default mongoose.model("apps", AppSchema);
