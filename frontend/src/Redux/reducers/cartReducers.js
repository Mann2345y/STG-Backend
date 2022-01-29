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

export const cartReducer = (state = { cartItems: [], address: {} }, action) => {
  switch (action.type) {
    case GET_CART_ITEM_REQUEST: {
      return { loading: true, cartItems: [], address: {} };
    }
    case GET_CART_ITEM_SUCCESS: {
      return {
        loading: false,
        cartItems: action.payload,
        address: JSON.parse(localStorage.getItem("addressId")) || {},
      };
    }
    case GET_CART_ITEM_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CART_ADD_ITEM_REQUEST: {
      return { ...state, loading: true, cartItems: [] };
    }
    case CART_ADD_ITEM_SUCCESS: {
      return { ...state, loading: false, cartItems: action.payload };
    }
    case CART_ADD_ITEM_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CART_REMOVE_ITEM_REQUEST: {
      return { ...state, loading: true };
    }
    case CART_REMOVE_ITEM_SUCCESS: {
      return { ...state, loading: false, cartItems: action.payload };
    }
    case CART_REMOVE_ITEM_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CART_ADD_ADDRESS: {
      return { ...state, address: action.payload };
    }
    case CART_REMOVE_ADDRESS: {
      return { ...state, address: {} };
    }
    case CART_PLACE_ORDER_REQUEST: {
      return { ...state, loading: true };
    }
    case CART_PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case CART_PLACE_ORDER_FAIL: {
      return { loading: false, error: action.payload };
    }
    case EMPTY_CART_REQUEST: {
      return { ...state, loading: true };
    }
    case EMPTY_CART_SUCCESS: {
      return { ...state, loading: false, cartItems: action.payload };
    }
    case EMPTY_CART_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
