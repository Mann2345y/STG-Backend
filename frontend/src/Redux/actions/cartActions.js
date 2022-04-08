import { axiosInstance } from "../axios";
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  GET_CART_ITEM_REQUEST,
  GET_CART_ITEM_SUCCESS,
  GET_CART_ITEM_FAIL,
  CART_ADD_ADDRESS,
  CART_REMOVE_ADDRESS,
  CART_PLACE_ORDER_REQUEST,
  CART_PLACE_ORDER_SUCCESS,
  CART_PLACE_ORDER_FAIL,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
} from "../constants/cartConstants";

export const getCartItems = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CART_ITEM_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/cart", {
      id,
    });
    dispatch({
      type: GET_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CART_ITEM_FAIL,
      payload: error,
    });
  }
};
export const addCartItem =
  (userId, productId, quantity) => async (dispatch) => {
    try {
      dispatch({
        type: CART_ADD_ITEM_REQUEST,
      });
      const { data } = await axiosInstance.post("/api/users/cart/add", {
        userId,
        productId,
        quantity,
      });
      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: error,
      });
    }
  };
export const removeCartItem = (userId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/cart/remove", {
      userId,
      productId,
    });
    localStorage.setItem("cartItems", JSON.stringify(data));
    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload: error,
    });
  }
};

export const addAddressInCart = (addressId) => async (dispatch) => {
  localStorage.setItem("addressId", JSON.stringify(addressId));
  dispatch({
    type: CART_ADD_ADDRESS,
    payload: addressId,
  });
};

export const removeAddressFromCart = (addressId) => async (dispatch) => {
  localStorage.removeItem(addressId);
  dispatch({
    type: CART_REMOVE_ADDRESS,
  });
};

export const placeOrder = (cartItems, address, userId) => async (dispatch) => {
  try {
    dispatch({
      type: CART_PLACE_ORDER_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/order", {
      cartItems,
      address,
      userId,
    });
    dispatch({
      type: CART_PLACE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_PLACE_ORDER_FAIL,
      payload: error,
    });
  }
};
export const emptyCart = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPTY_CART_REQUEST,
    });
    const { data } = await axiosInstance.put("/api/users/cart", { id: userId });
    dispatch({
      type: EMPTY_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPTY_CART_FAIL,
      payload: error,
    });
  }
};
