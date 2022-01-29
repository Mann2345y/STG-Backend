import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
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
    addresses: [addressSchema],
    wishlist: [
      {
        product: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          name: { type: String, required: true },
          image: { type: String, required: true },
          brand: { type: String, required: true },
          price: { type: Number, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export const Address = mongoose.model("Address", addressSchema);

export default User;
