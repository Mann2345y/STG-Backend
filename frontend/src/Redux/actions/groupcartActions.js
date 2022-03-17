import { axiosInstance } from "../axios";
import {
  CREATE_GROUP_CART_REQUEST,
  CREATE_GROUP_CART_SUCCESS,
  CREATE_GROUP_CART_FAIL,
  GET_GROUP_CART_REQUEST,
  GET_GROUP_CART_SUCCESS,
  GET_GROUP_CART_FAIL,
  GET_GROUP_CARTS_USER_IS_IN_FAIL,
  GET_GROUP_CARTS_USER_IS_IN_REQUEST,
  GET_GROUP_CARTS_USER_IS_IN_SUCCESS,
  ADD_CART_IN_NEW_CART_STATE,
  ADD_PRODUCT_IN_CURRENT_CART,
  REMOVE_PRODUCT_FROM_CURRENT_CART,
  ADD_USER_IN_CURRENT_CART,
  REMOVE_USER_IN_CURRENT_CART,
  CHANGE_GROUP_CART_REQUEST,
  CHANGE_GROUP_CART_SUCCESS,
  CHANGE_GROUP_CART_FAIL,
  EMPTY_PRODUCTS_FROM_NEW_CART,
  EMPTY_USER_FROM_NEW_CART,
  DELETE_GROUP_CART_REQUEST,
  DELETE_GROUP_CART_SUCCESS,
  DELETE_GROUP_CART_FAIL,
} from "../constants/groupcartConstants";

export const getGroupCarts = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_GROUP_CART_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/groupcart/getusercarts", {
      userId,
    });
    dispatch({
      type: GET_GROUP_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_GROUP_CART_FAIL,
      payload: error,
    });
  }
};
export const getGroupCartsUserIsIn = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_GROUP_CARTS_USER_IS_IN_REQUEST,
    });
    const { data } = await axiosInstance.put("/api/groupcart/getusercarts", {
      userId,
    });
    dispatch({
      type: GET_GROUP_CARTS_USER_IS_IN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_GROUP_CARTS_USER_IS_IN_FAIL,
      payload: error,
    });
  }
};

export const createCart =
  (cartname, userId, products, users) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_GROUP_CART_REQUEST,
      });
      const { data } = await axiosInstance.post("/api/groupcart", {
        cartname,
        userId,
        users,
        products,
      });
      dispatch({
        type: CREATE_GROUP_CART_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_GROUP_CART_FAIL,
        payload: error,
      });
    }
  };
export const addCartToCurrentUserCart = (id) => async (dispatch, getState) => {
  const { cartsOfUser, cartsUserIn } = getState().groupcart;
  let cartToAdd = {};
  cartToAdd =
    cartsOfUser.find((item) => item._id === id) ||
    cartsUserIn.find((item) => item._id === id);
  dispatch({
    type: ADD_CART_IN_NEW_CART_STATE,
    payload: cartToAdd,
  });
};
// export const addProductInCurrentCart = () => async (dispatch, getState) => {
//   const { product } = getState().singleProduct;
//   const { products } = getState().groupcart.newCartState;
//   let newProducts;
//   if (products.length > 0) {
//     let productExist = products.find((item) => item.id == product._id);
//     if (productExist) {
//       newProducts = [...products];
//     } else {
//       newProducts = [
//         ...products,
//         {
//           id: product._id,
//           name: product.name,
//           brand: product.brand,
//           image: product.image,
//           price: product.price,
//           rating: product.rating,
//         },
//       ];
//     }
//   } else {
//     newProducts = [
//       {
//         id: product._id,
//         name: product.name,
//         brand: product.brand,
//         image: product.image,
//         price: product.price,
//         rating: product.rating,
//       },
//     ];
//   }
//   localStorage.setItem("productsInCart", JSON.stringify(newProducts));
//   dispatch({
//     type: ADD_PRODUCT_IN_CURRENT_CART,
//     payload: newProducts,
//   });
// };
export const addProductInCurrentCart = (id) => async (dispatch, getState) => {
  const { products: allProducts } = getState().allProducts;
  const product = allProducts.find((item) => {
    return item._id === id;
  });
  const { products } = getState().groupcart.newCartState;
  let newProducts;
  if (products.length > 0) {
    let productExist = products.find((item) => item.id === product._id);
    if (productExist) {
      newProducts = [...products];
    } else {
      newProducts = [
        ...products,
        {
          id: product._id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          rating: product.rating,
        },
      ];
    }
  } else {
    newProducts = [
      {
        id: product._id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        rating: product.rating,
      },
    ];
  }
  localStorage.setItem("productsInCart", JSON.stringify(newProducts));
  dispatch({
    type: ADD_PRODUCT_IN_CURRENT_CART,
    payload: newProducts,
  });
};
export const removeProductFromCurrentCart =
  (id) => async (dispatch, getState) => {
    const { products } = getState().groupcart.newCartState;
    const newProducts = products.filter((item) => item.id !== id);
    localStorage.setItem("productsInCart", JSON.stringify(newProducts));
    dispatch({
      type: REMOVE_PRODUCT_FROM_CURRENT_CART,
      payload: newProducts,
    });
  };
export const addUserInCurrentCart = (id) => async (dispatch, getState) => {
  const { users: allusers } = getState().allUsers;
  const { users } = getState().groupcart.newCartState;
  const user = allusers.filter((item) => {
    return item._id === id;
  });
  let newUsers;
  if (users.length > 0) {
    const userExist = users.find((item) => item.id === user[0]._id);
    if (userExist) {
      newUsers = [...users];
    } else {
      newUsers = [
        ...users,
        {
          id: user[0]._id,
          name: user[0].name,
          email: user[0].email,
        },
      ];
    }
  } else {
    newUsers = [
      {
        id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
      },
    ];
  }
  localStorage.setItem("usersInCart", JSON.stringify(newUsers));
  dispatch({
    type: ADD_USER_IN_CURRENT_CART,
    payload: newUsers,
  });
};
export const removeUserFromCurrentCart = (id) => async (dispatch, getState) => {
  const { users } = getState().groupcart.newCartState;
  const newUsers = users.filter((item) => item.id !== id);
  localStorage.setItem("usersInCart", JSON.stringify(newUsers));
  dispatch({
    type: REMOVE_USER_IN_CURRENT_CART,
    payload: newUsers,
  });
};
export const emptyProductsFromNewCart = () => async (dispatch) => {
  localStorage.removeItem("productsInCart");
  const users = JSON.parse(localStorage.getItem("usersInCart"));
  let data;
  if (users) {
    data = {
      products: {},
      users: users,
    };
  } else {
    data = { products: {}, users: {} };
  }

  dispatch({
    type: EMPTY_PRODUCTS_FROM_NEW_CART,
    payload: data,
  });
};
export const emptyUsersFromNewCart = () => async (dispatch) => {
  localStorage.removeItem("usersInCart");
  const products = JSON.parse(localStorage.getItem("productsInCart"));
  let data;
  if (products) {
    data = {
      products: products,
      users: {},
    };
  } else {
    data = {
      products: {},
      users: {},
    };
  }
  dispatch({
    type: EMPTY_USER_FROM_NEW_CART,
    payload: data,
  });
};
export const updateCartname = (cartId, cartname) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_GROUP_CART_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/groupcart/cartname", {
      cartId,
      cartname,
    });
    dispatch({
      type: CHANGE_GROUP_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_GROUP_CART_FAIL,
      payload: error,
    });
  }
};
export const addProductInCart = (cartId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_GROUP_CART_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/groupcart/product", {
      cartId,
      productId,
    });
    dispatch({
      type: CHANGE_GROUP_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_GROUP_CART_FAIL,
      payload: error,
    });
  }
};
export const removeProductFromCart =
  (cartId, productId) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_GROUP_CART_REQUEST,
      });
      const { data } = await axiosInstance.put("/api/groupcart/product", {
        cartId,
        productId,
      });
      dispatch({
        type: CHANGE_GROUP_CART_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_GROUP_CART_FAIL,
        payload: error,
      });
    }
  };
export const addUserInCart = (cartId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_GROUP_CART_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/groupcart/user", {
      cartId,
      userId,
    });
    dispatch({
      type: CHANGE_GROUP_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_GROUP_CART_FAIL,
      payload: error,
    });
  }
};
export const removeUserFromCart = (cartId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_GROUP_CART_REQUEST,
    });
    const { data } = await axiosInstance.put("/api/groupcart/user", {
      cartId,
      userId,
    });
    dispatch({
      type: CHANGE_GROUP_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_GROUP_CART_FAIL,
      payload: error,
    });
  }
};
export const deleteGroupCart = (cartId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_GROUP_CART_REQUEST,
    });
    const { data } = await axiosInstance.put("/api/groupcart", {
      cartId,
    });
    dispatch({
      type: DELETE_GROUP_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_GROUP_CART_FAIL,
      payload: error,
    });
  }
};
