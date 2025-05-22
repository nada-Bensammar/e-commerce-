import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { 
    type: Number ,
    ref: 'Product',
     required: true 
    },


  quantity: { 
    type: Number,
     required: true, 
     min: 1 
    }
});

const cartSchema = new mongoose.Schema({
  userId: { type: Number, 
ref: 'User',
 required: true, 
 unique: true
 },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', cartSchema);
