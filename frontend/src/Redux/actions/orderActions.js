import { axiosInstance } from "../axios";
import {
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../constants/orderConstants";

export const getOrderHistory = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ORDER_HISTORY_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/order/get", { userId });
    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAIL,
      payload: error,
    });
  }
};

export const cancelOrder = (userId, orderId) => async (dispatch) => {
  try {
    dispatch({
      type: CANCEL_ORDER_REQUEST,
    });
    await axiosInstance.post("/api/order/delete", { orderId });
    const { data } = await axiosInstance.post("/api/order/get", { userId });
    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAIL,
      payload: error,
    });
  }
};
