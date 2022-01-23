import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  LOGGED_USER_CHANGE_REQUEST,
  LOGGED_USER_LOGIN_SUCCESS,
  LOGGED_USER_UPDATE_SUCCESS,
  LOGGED_USER_REMOVE_SUCCESS,
  LOGGED_USER_CHANGE_FAIL,
  LOGGED_USER_LOGOUT,
} from "../constants/userConstants";
import { axiosInstance } from "../axios";
import { GET_CART_ITEM_SUCCESS } from "../constants/cartConstants";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGGED_USER_CHANGE_REQUEST,
    });
    const { data } = await axiosInstance.post(`/api/users/login`, {
      email,
      password,
    });
    const user = data;
    localStorage.setItem("loggedUser", JSON.stringify(data));
    dispatch({
      type: LOGGED_USER_LOGIN_SUCCESS,
      payload: data,
    });
    const { data: cartData } = await axiosInstance.post("/api/users/cart", {
      id: user.id,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    dispatch({
      type: GET_CART_ITEM_SUCCESS,
      payload: cartData,
    });
  } catch (error) {
    dispatch({
      type: LOGGED_USER_CHANGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    const { data } = await axiosInstance.post(`/api/users/signup`, {
      name,
      email,
      password,
      isAdmin: false,
    });
    localStorage.setItem("loggedUser", JSON.stringify(data));
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("loggedUser");
  dispatch({
    type: LOGGED_USER_LOGOUT,
  });
};
export const updateLoggedUser = (name, email) => async (dispatch) => {
  try {
    dispatch({
      type: LOGGED_USER_CHANGE_REQUEST,
    });
    const { data } = await axiosInstance.put(`/api/users/signup`, {
      name,
      email,
    });
    dispatch({
      type: LOGGED_USER_UPDATE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("loggedUser", JSON.stringify(data));
    dispatch({
      type: LOGGED_USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGGED_USER_CHANGE_FAIL,
      payload: error,
    });
  }
};
