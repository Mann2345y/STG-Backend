import express from "express";
import {
  authUser,
  createUser,
  getUserById,
  getUsers,
  removeUser,
  updateUser,
  removeCartItems,
  addCartItems,
  addAddress,
  removeAddress,
  addWishlist,
  removeWishlist,
  getAddresses,
  getCartItems,
  getWishlist,
} from "../controllers/userController.js";
import { checkAuth, checkAdmin } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").get(getUsers).post(checkAuth, checkAdmin, createUser);
router.route("/signup").post(createUser).put(checkAuth, updateUser);
router.route("/login").post(authUser);
router
  .route("/:id")
  .get(checkAuth, checkAdmin, getUserById)
  .delete(removeUser)
  .put(checkAuth, checkAdmin, updateUser);
router.route("/address").post(checkAuth, getAddresses);
router.route("/cart").post(checkAuth, getCartItems);
router.route("/wishlist").post(checkAuth, getWishlist);
router.route("/address/add").post(checkAuth, addAddress);
router.route("/address/remove").post(checkAuth, removeAddress);
router.route("/cart/add").post(checkAuth, addCartItems);
router.route("/cart/remove").post(checkAuth, removeCartItems);
router.route("/wishlist/add").post(checkAuth, addWishlist);
router.route("/wishlist/remove").post(checkAuth, removeWishlist);

export default router;
