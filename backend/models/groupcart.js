import mongoose from "mongoose";

const groupcartSchema = mongoose.Schema({
  cartname: {
    type: String,
    required: true,
  },
  parentuser: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  linkedusers: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String, required: true },
      image: { type: String, required: true },
      brand: { type: String, required: true },
      rating: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Groupcart = mongoose.model("Groupcart", groupcartSchema);

export default Groupcart;
