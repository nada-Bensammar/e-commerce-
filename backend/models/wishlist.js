import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: Number, ref: "User", required: true },
  products: [{ type: String, ref: "Product" }],
});

export default mongoose.model("Wishlist", wishlistSchema);
