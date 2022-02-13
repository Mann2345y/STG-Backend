import express from "express";
import {
  createGroupCart,
  getGroupcartByUser,
  getGroupcartsUserisin,
  addUserInGroupcart,
  removeUserFromGroupcart,
  addProductInGroupcart,
  removeProductInGroupcart,
  deleteGroupcart,
} from "../controllers/groupcartController.js";
import { checkAuth } from "../middlewares/authentication.js";
const router = express.Router();

router
  .route("/")
  .post(checkAuth, createGroupCart)
  .put(checkAuth, deleteGroupcart);
router
  .route("/getusercarts")
  .post(checkAuth, getGroupcartByUser)
  .put(checkAuth, getGroupcartsUserisin);
router
  .route("/user")
  .post(checkAuth, addUserInGroupcart)
  .put(checkAuth, removeUserFromGroupcart);
router
  .route("/product")
  .post(checkAuth, addProductInGroupcart)
  .put(checkAuth, removeProductInGroupcart);

export default router;
