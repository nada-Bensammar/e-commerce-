import mongoose  from "mongoose"

const order= new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ]
});
const orderShema    = mongoose.model("order", order);

export default order;
