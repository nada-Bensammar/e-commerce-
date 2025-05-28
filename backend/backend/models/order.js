import mongoose  from "mongoose"

const orderschema= new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
    
paymentMethod: {
  type: String,
  enum: ['Cash on Delivery'],
  required: true
},


  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
      
    }
  ]
});
const    order    = mongoose.model("order", orderschema);

export default order;
