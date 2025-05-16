import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
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


  brand: { 
    type: String, 
    required: true
   },
  
  images: [{
     type: String 
    }], 
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


export default Product;