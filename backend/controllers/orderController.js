import asyncHandler from "express-async-handler";
import Order from "../models/order.js";
import User from "../models/user.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { cartItems, address, userId } = req.body;
  let totalPrice = 0;
  cartItems.map((item) => {
    return (totalPrice += item.amount);
  });
  const orderToPlace = new Order({
    user: userId,
    cartItems: cartItems,
    totalPrice: totalPrice,
    address: address,
    isPaid: false,
    isDelivered: false,
  });
  const placedOrder = await orderToPlace.save();
  res.status(201).json(placedOrder);
});
export const getOrdersByUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const placedOrders = await Order.find({ user: userId });
  res.status(201).json(placedOrders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const placedOrders = await Order.find();
  res.status(201).json(placedOrders);
});
export const editOrderStatus = asyncHandler(async (req, res) => {
  const { isPaid, isDelivered, orderId } = req.body;
  const order = await Order.findById(orderId);
  if (order) {
    order.isPaid = isPaid || order.isPaid;
    order.isDelivered = isDelivered || order.isDelivered;
    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(401);
    throw new Error("invalid order id");
  }
});
export const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (order) {
    await Order.deleteOne({ _id: orderId });
    res.status(201).json({ message: "Order deleted" });
  } else {
    res.status(401);
    throw new Error("Invalid Order Id");
  }
});
