import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiresAt: Date,
  usageLimit: Number,
  usedBy: [{ type:String, ref: "User" }]
});

export default mongoose.model("Coupon", couponSchema);
