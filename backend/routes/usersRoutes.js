import express from "express";
import {
  authUser,
  createUser,
  getUserById,
  getUsers,
  removeUser,
  updateUser,
  emptyCart,
  removeCartItems,
  addCartItems,
  addAddress,
  removeAddress,
  addWishlist,
  removeWishlist,
  getAddresses,
  getCartItems,
  getWishlist,
  emptyWishlist,
  deleteUserImage,
} from "../controllers/userController.js";
import { checkAuth, checkAdmin } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").get(getUsers).post(checkAuth, checkAdmin, createUser);
router.route("/deleteImage").post(deleteUserImage);
router.route("/signup").post(createUser).put(checkAuth, updateUser);
router.route("/login").post(authUser);
router.route("/address").post(checkAuth, getAddresses);
router.route("/cart").post(checkAuth, getCartItems).put(checkAuth, emptyCart);
router
  .route("/wishlist")
  .post(checkAuth, getWishlist)
  .put(checkAuth, emptyWishlist);
router.route("/address/add").post(checkAuth, addAddress);
router.route("/address/remove").post(checkAuth, removeAddress);
router.route("/cart/add").post(checkAuth, addCartItems);
router.route("/cart/remove").post(checkAuth, removeCartItems);
router.route("/wishlist/add").post(checkAuth, addWishlist);
router.route("/wishlist/remove").post(checkAuth, removeWishlist);
router
  .route("/:id")
  .get(checkAuth, checkAdmin, getUserById)
  .delete(removeUser)
  .put(checkAuth, checkAdmin, updateUser);

export default router;
