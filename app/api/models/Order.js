import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  roomNumber: { type: String },
  floor: { type: String },
  houseNumber: { type: String },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },

  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      mrp: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      image: { type: String, required: true }, // ✅ Not imageOne
      color: { type: String },
      size: { type: String },
      quantity: { type: Number, required: true, min: 1 },
      id: { type: String }
    }
  ],

  paymentMethod: { type: String, required: true },
  paymentId: { type: String, required: true },
  razorpayId: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Returned'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
