import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      pinCode: { type: Number, required: true },
    },
    password: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
