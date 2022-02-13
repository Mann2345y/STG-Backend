import asyncHandler from "express-async-handler";
import Groupcart from "../models/groupcart.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export const createGroupCart = asyncHandler(async (req, res) => {
  const { cartname, userId, products, users } = req.body;
  const cartExist = await Groupcart.findOne({ cartname: cartname });
  const user = await User.findById(userId);
  if (cartExist) {
    res.status(401);
    throw new Error("Group Cart Already Exists");
  } else {
    const GroupCartToCreate = await Groupcart.create({
      cartname: cartname,
      parentuser: { id: userId, name: user.name, email: user.email },
      linkedusers: users,
      products: products,
    });
    if (GroupCartToCreate) {
      const carts = await Groupcart.find({ "parentuser.id": userId });
      res.status(201).json(carts);
    } else {
      res.status(401);
      throw new Error("Invalid Cart Data");
    }
  }
});
export const getGroupcartByUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const carts = await Groupcart.find({ "parentuser.id": userId });
  if (carts) {
    res.status(201).json(carts);
  } else {
    res.status(401);
    throw new Error("No Cart created");
  }
});
export const getGroupcartsUserisin = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const carts = await Groupcart.find({});
  const userCarts = carts.filter((item) =>
    item.linkedusers.some((user) => user.id == userId)
  );
  if (carts) {
    res.status(201).json(userCarts);
  } else {
    res.status(401);
    throw new Error("No Cart created");
  }
});
export const addUserInGroupcart = asyncHandler(async (req, res) => {
  const { cartId, userId } = req.body;
  const cart = await Groupcart.findById(cartId);
  if (cart) {
    const userFound = cart.linkedusers.find((item) => {
      return item.id == userId;
    });
    if (userFound) {
      res.status(201).json(cart);
    } else {
      const user = await User.findById(userId);
      const userToAdd = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      cart.linkedusers.push(userToAdd);
      await cart.save();
      res.status(201).json(cart);
    }
  } else {
    res.status(401);
    throw new Error("Invalid cart Id");
  }
});
export const removeUserFromGroupcart = asyncHandler(async (req, res) => {
  const { cartId, userId } = req.body;
  const cart = await Groupcart.findById(cartId);
  if (cart) {
    cart.linkedusers = cart.linkedusers.filter((item) => {
      return item.id != userId;
    });
    await cart.save();
    res.status(201).json(cart);
  } else {
    res.status(401);
    throw new Error("Invalid cart Id");
  }
});
export const addProductInGroupcart = asyncHandler(async (req, res) => {
  const { cartId, productId } = req.body;
  const cart = await Groupcart.findById(cartId);
  if (cart) {
    const productFound = cart.products.find((item) => {
      return item.id == productId;
    });
    if (productFound) {
      res.status(201).json(cart);
    } else {
      const product = await Product.findById(productId);
      const productToAdd = {
        id: product._id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        rating: product.rating,
      };
      cart.products.push(productToAdd);
      await cart.save();
      res.status(201).json(cart);
    }
  } else {
    res.status(401);
    throw new Error("Invalid cart Id");
  }
});
export const removeProductInGroupcart = asyncHandler(async (req, res) => {
  const { cartId, productId } = req.body;
  const cart = await Groupcart.findById(cartId);
  if (cart) {
    cart.products = cart.products.filter((item) => {
      return item.id != productId;
    });
    await cart.save();
    res.status(201).json(cart);
  } else {
    res.status(401);
    throw new Error("Invalid cart Id");
  }
});
export const deleteGroupcart = asyncHandler(async (req, res) => {
  const { cartId } = req.body;
  const cartFound = await Groupcart.findById(cartId);
  if (cartFound) {
    const cartToDelete = await Groupcart.deleteOne({ _id: cartFound._id });
    if (cartToDelete) {
      const carts = await Groupcart.find({
        "parentuser.id": cartFound.parentuser.id,
      });
      res.status(201).json(carts);
    }
  } else {
    res.status(401);
    throw new Error("Invalid Cart Id");
  }
});
