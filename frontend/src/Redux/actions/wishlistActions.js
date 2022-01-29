import { axiosInstance } from "../axios";
import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  ADD_WISHLIST_FAIL,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  EMPTY_WISHLIST_REQUEST,
  EMPTY_WISHLIST_SUCCESS,
  EMPTY_WISHLIST_FAIL,
} from "../constants/wishlistConstants";

export const getWishlist = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WISHLIST_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/wishlist", {
      id,
    });
    dispatch({
      type: GET_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAIL,
      payload: error,
    });
  }
};
export const addWishlist = (userId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_WISHLIST_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/wishlist/add", {
      userId,
      productId,
    });
    dispatch({
      type: ADD_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_FAIL,
      payload: error,
    });
  }
};
export const removeWishlist = (userId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_WISHLIST_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/wishlist/remove", {
      userId,
      productId,
    });
    localStorage.setItem("cartItems", JSON.stringify(data));
    dispatch({
      type: REMOVE_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_FAIL,
      payload: error,
    });
  }
};

export const emptyWishlist = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPTY_WISHLIST_REQUEST,
    });
    const { data } = await axiosInstance.put("/api/users/wishlist", {
      id: userId,
    });
    dispatch({
      type: EMPTY_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPTY_WISHLIST_FAIL,
      payload: error,
    });
  }
};
