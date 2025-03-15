const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
        quantity: { type: Number, required: true }, 
      },
    ],
    totalPrice: { type: Number, required: true }, 
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true }, 
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date }, 
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
);

module.exports = mongoose.model('Order', orderSchema);
