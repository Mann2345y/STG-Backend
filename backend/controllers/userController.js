import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import User from "../models/user.js";
import Product from "../models/product.js";
import generateToken from "../tokenGenerator.js";

const getUsers = asyncHandler(async (req, res) => {
  const Users = await User.find({});
  res.send(Users);
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const createUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin, password, image } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exist!");
  } else {
    const createdUser = await User.create({
      name,
      email,
      password,
      image,
      isAdmin,
    });
    if (createdUser) {
      res.status(201).json({
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
});
const removeUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    const userToDelete = await User.deleteOne({ _id: userExists._id });
    if (userToDelete) {
      res.status(201).json({
        message: "User Deleted",
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid User Id");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const { userId, name, email, isAdmin, image } = req.body;
  const loggedUser = await User.findById(userId);
  if (loggedUser) {
    loggedUser.name = name || loggedUser.name;
    loggedUser.email = email || loggedUser.email;
    loggedUser.isAdmin = isAdmin || loggedUser.isAdmin;
    loggedUser.image = image || loggedUser.image;
    const updatedUser = await loggedUser.save();
    res.status(201).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
      cartItems: updatedUser.cartItems,
      wishlist: updatedUser.wishlist,
      addresses: updatedUser.addresses,
      image: updatedUser.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid User data !");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.matchPassword(password))) {
    res.status(200).json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      image: userFound.image,
      token: generateToken(userFound._id),
      cartItems: userFound.cartItems,
      wishlist: userFound.wishlist,
      addresses: userFound.addresses,
      image: userFound.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});
const getCartItems = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json(user.cartItems);
  } else {
    res.status(401);
    throw new Error("Invalid user id");
  }
});
const emptyCart = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.cartItems = [];
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.cartItems);
  } else {
    res.status(401);
    throw new Error("Invalid user id");
  }
});
const addCartItems = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  if (user && product) {
    const productFound = user.cartItems.find((item) => {
      return item.product.name == product.name;
    });
    if (productFound) {
      if (productFound.quantity == quantity) {
        res.status(201).json(user.cartItems);
      } else {
        const productIndex = user.cartItems.findIndex(
          (item) => item.serialNo == productFound.serialNo
        );
        user.cartItems[productIndex].quantity = quantity;
        user.cartItems[productIndex].amount =
          user.cartItems[productIndex].product.price * quantity;
        const productAdded = await user.save();
        res.status(201).json(productAdded.cartItems);
      }
    } else {
      const serialNo = user.cartItems.length + 1;
      const itemToAdd = {
        serialNo: serialNo,
        product: {
          id: product._id,
          name: product.name,
          image: product.image,
          brand: product.brand,
          price: product.price,
        },
        quantity: quantity,
        amount: quantity * product.price,
      };
      user.cartItems.push(itemToAdd);
      const productAdded = await user.save();
      res.status(201).json(productAdded.cartItems);
    }
  } else {
    res.status(401);
    throw new Error("Invalid user or product data");
  }
});
const removeCartItems = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  if (user) {
    const productFound = user.cartItems.find((item) => {
      return item.product.name == product.name;
    });
    user.cartItems = user.cartItems.filter((item) => {
      return item !== productFound;
    });
    await user.save();
    res.status(201).json(user.cartItems);
  } else {
    res.status(401);
    throw new Error("Invalid User");
  }
});
const getAddresses = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json(user.addresses);
  } else {
    res.status(401);
    throw new Error("Invalid user id");
  }
});
const addAddress = asyncHandler(async (req, res) => {
  const { userId, address, city, state, pincode } = req.body;
  const user = await User.findById(userId);
  if (user) {
    const addressToAdd = { address, city, state, pincode };
    const addressExist = user.addresses.find((item) => {
      return (
        (item.city == addressToAdd.city &&
          item.state == addressToAdd.state &&
          item.pincode == addressToAdd.pincode) ||
        (item.address == addressToAdd.address &&
          item.state == addressToAdd.state &&
          item.pincode == addressToAdd.pincode) ||
        (item.address == addressToAdd.address &&
          item.city == addressToAdd.city &&
          item.pincode == addressToAdd.pincode) ||
        (item.address == addressToAdd.address &&
          item.city == addressToAdd.city &&
          item.state == addressToAdd.state)
      );
    });
    if (!addressExist) {
      user.addresses.push(addressToAdd);
      const updatedUser = await user.save();
      res.status(201).json(updatedUser.addresses);
    } else {
      const addressIndex = user.addresses.findIndex(
        (address) => address.address == addressExist.address
      );
      user.addresses[addressIndex] = addressToAdd;
      const updatedUser = await user.save();
      res.status(201).json(updatedUser.addresses);
    }
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});
const removeAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.body;
  const user = await User.findById(userId);
  if (user) {
    const addressToDelete = user.addresses.find((o) => o.id === addressId);
    user.addresses = user.addresses.filter((item) => {
      return item !== addressToDelete;
    });
    await user.save();
    res.status(201).json(user.addresses);
  } else {
    res.status(401);
    throw new Error("Invalid User");
  }
});
const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json(user.wishlist);
  } else {
    res.status(401);
    throw new Error("Invalid user id");
  }
});
const emptyWishlist = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.wishlist = [];
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.wishlist);
  } else {
    res.status(401);
    throw new Error("Invalid user id");
  }
});
const addWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  if (user && product) {
    const productFound = user.wishlist.find((item) => {
      return item.product.name == product.name;
    });
    if (productFound) {
      res.status(403);
      throw new Error("Product already added");
    } else {
      const itemToAdd = {
        product: {
          id: product._id,
          name: product.name,
          image: product.image,
          brand: product.brand,
          price: product.price,
        },
      };
      user.wishlist.push(itemToAdd);
      const updatedUser = await user.save();
      res.status(201).json(updatedUser.wishlist);
    }
  } else {
    res.status(401);
    throw new Error("Invalid user or product data");
  }
});
const removeWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  if (user) {
    const productFound = user.wishlist.find((item) => {
      return item.product.name == product.name;
    });
    user.wishlist = user.wishlist.filter((item) => {
      return item !== productFound;
    });
    await user.save();
    res.status(201).json(user.wishlist);
  } else {
    res.status(401);
    throw new Error("Invalid User");
  }
});
const deleteUserImage = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  const __dirname = path.resolve();
  const imagepath = path.join(__dirname, `/frontend/public/${user.image}`);
  if (user) {
    if (user.image != "images/defaultAvatar.png") {
      const filedeleted = fs.promises.unlink(imagepath);
      if (filedeleted) {
        user.image = "images/defaultAvatar.png";
        user.save();
        res.status(201).send(user);
      } else {
        res.status(401);
        throw new Error("file not found");
      }
    } else {
      res.status(401);
      throw new Error("Can't delete Avatar");
    }
  } else {
    res.status(401);
    throw new Error("Invalid User Id");
  }
});
export {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  authUser,
  getCartItems,
  emptyCart,
  addCartItems,
  removeCartItems,
  getAddresses,
  addAddress,
  removeAddress,
  getWishlist,
  emptyWishlist,
  addWishlist,
  removeWishlist,
  deleteUserImage,
};
