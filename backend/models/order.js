import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        serialNo: {
          type: Number,
          required: true,
        },
        product: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          name: { type: String, required: true },
          image: { type: String, required: true },
          brand: { type: String, required: true },
          price: { type: Number, required: true },
        },
        quantity: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          requried: true,
          default: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
