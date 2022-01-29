import express from "express";
import {
  deleteOrder,
  editOrderStatus,
  getAllOrders,
  getOrdersByUser,
  placeOrder,
} from "../controllers/orderController.js";
import { checkAuth } from "../middlewares/authentication.js";
const router = express.Router();

router
  .route("/")
  .post(checkAuth, placeOrder)
  .get(checkAuth, getAllOrders)
  .put(checkAuth, editOrderStatus);
router.route("/get").post(checkAuth, getOrdersByUser);
router.route("/delete").post(checkAuth, deleteOrder);

export default router;
