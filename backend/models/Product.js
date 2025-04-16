import mongoose from "mongoose"

const product = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
     type: String,
      required: true
     },
  price: { 
    type: Number,
     required: true
     },

category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: true
},
rating: {
  type: Number,
  default: 0
},
numReviews: {
  type: Number,
  default: 0
},
  brand: { 
    type: String, 
    required: true
   },
  stock_quantity: { 
    type: Number, 
    required: true
   },
  images: [{
     type: String 
    }],
  attributes: {
    color: String,
    storage: String,
    screen_size: String,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
product.pre('save', function(next) {
  console.log(`📦 Saving product to collection: ${this.collection.name}`);
  console.log(`Document: ${JSON.stringify(this, null, 2)}`);
  next();
});

export default product;