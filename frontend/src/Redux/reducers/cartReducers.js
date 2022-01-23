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
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART_ITEM_REQUEST: {
      return { loading: true, cartItems: [] };
    }
    case GET_CART_ITEM_SUCCESS: {
      return { loading: false, cartItems: action.payload };
    }
    case GET_CART_ITEM_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CART_ADD_ITEM_REQUEST: {
      return { loading: true, cartItems: [] };
    }
    case CART_ADD_ITEM_SUCCESS: {
      return { loading: false, cartItems: action.payload };
    }
    case CART_ADD_ITEM_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CART_REMOVE_ITEM_REQUEST: {
      return { loading: true, cartItems: [] };
    }
    case CART_REMOVE_ITEM_SUCCESS: {
      return { loading: false, cartItems: action.payload };
    }
    case CART_REMOVE_ITEM_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
