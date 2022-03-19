import { axiosInstance } from "../axios";
import {
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  REMOVE_ADDRESS_REQUEST,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAIL,
} from "../constants/addressConstants";

export const getAddresses = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADDRESSES_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/address", {
      id,
    });

    dispatch({
      type: GET_ADDRESSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADDRESSES_FAIL,
      payload: error,
    });
  }
};
export const addAddress =
  (userId, address, city, state, pincode) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_ADDRESS_REQUEST,
      });
      const { data } = await axiosInstance.post("/api/users/address/add", {
        userId,
        address,
        city,
        state,
        pincode,
      });

      dispatch({
        type: ADD_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_ADDRESS_FAIL,
        payload: error,
      });
    }
  };
export const removeAddress = (userId, addressId) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ADDRESS_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/users/address/remove", {
      userId,
      addressId,
    });

    dispatch({
      type: REMOVE_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ADDRESS_FAIL,
      payload: error,
    });
  }
};
