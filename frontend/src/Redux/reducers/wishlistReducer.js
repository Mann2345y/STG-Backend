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

export const wishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST: {
      return { loading: true, wishlist: {} };
    }
    case GET_WISHLIST_SUCCESS: {
      return { loading: false, wishlist: action.payload };
    }
    case GET_WISHLIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    case ADD_WISHLIST_REQUEST: {
      return { loading: true, wishlist: {} };
    }
    case ADD_WISHLIST_SUCCESS: {
      return { loading: false, wishlist: action.payload };
    }
    case ADD_WISHLIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    case REMOVE_WISHLIST_REQUEST: {
      return { loading: true, wishlist: {} };
    }
    case REMOVE_WISHLIST_SUCCESS: {
      return { loading: false, wishlist: action.payload };
    }
    case REMOVE_WISHLIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    case EMPTY_WISHLIST_REQUEST: {
      return { loading: true, wishlist: {} };
    }
    case EMPTY_WISHLIST_SUCCESS: {
      return { loading: false, wishlist: action.payload };
    }
    case EMPTY_WISHLIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
