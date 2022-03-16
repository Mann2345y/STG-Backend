import {
  CREATE_GROUP_CART_REQUEST,
  CREATE_GROUP_CART_SUCCESS,
  CREATE_GROUP_CART_FAIL,
  DELETE_GROUP_CART_REQUEST,
  DELETE_GROUP_CART_SUCCESS,
  DELETE_GROUP_CART_FAIL,
  GET_GROUP_CART_REQUEST,
  GET_GROUP_CART_SUCCESS,
  GET_GROUP_CART_FAIL,
  GET_GROUP_CARTS_USER_IS_IN_REQUEST,
  GET_GROUP_CARTS_USER_IS_IN_SUCCESS,
  GET_GROUP_CARTS_USER_IS_IN_FAIL,
  ADD_PRODUCT_IN_CURRENT_CART,
  REMOVE_PRODUCT_FROM_CURRENT_CART,
  ADD_USER_IN_CURRENT_CART,
  REMOVE_USER_IN_CURRENT_CART,
  CHANGE_GROUP_CART_REQUEST,
  CHANGE_GROUP_CART_SUCCESS,
  CHANGE_GROUP_CART_FAIL,
  EMPTY_PRODUCTS_FROM_NEW_CART,
  EMPTY_USER_FROM_NEW_CART,
  ADD_CART_IN_NEW_CART_STATE,
} from "../constants/groupcartConstants";

export const groupcartReducer = (
  state = {
    cartsOfUser: {},
    cartsUserIn: {},
    newCartState: { products: [], users: [] },
    currentUserCart: {},
  },
  action
) => {
  switch (action.type) {
    case GET_GROUP_CART_REQUEST: {
      return { ...state, loading: true, cartsOfUser: {} };
    }
    case GET_GROUP_CART_SUCCESS: {
      return { ...state, loading: false, cartsOfUser: action.payload };
    }
    case GET_GROUP_CART_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CREATE_GROUP_CART_REQUEST: {
      return { ...state, loading: true, cartsOfUser: {} };
    }
    case CREATE_GROUP_CART_SUCCESS: {
      return { ...state, loading: false, cartsOfUser: action.payload };
    }
    case CREATE_GROUP_CART_FAIL: {
      return { loading: false, error: action.payload };
    }
    case DELETE_GROUP_CART_REQUEST: {
      return { ...state, loading: true, cartsOfUser: {} };
    }
    case DELETE_GROUP_CART_SUCCESS: {
      return { ...state, loading: false, cartsOfUser: action.payload };
    }
    case DELETE_GROUP_CART_FAIL: {
      return { loading: false, error: action.payload };
    }
    case GET_GROUP_CARTS_USER_IS_IN_REQUEST: {
      return { ...state, loading: true, cartsUserIn: {} };
    }
    case GET_GROUP_CARTS_USER_IS_IN_SUCCESS: {
      return { ...state, loading: false, cartsUserIn: action.payload };
    }
    case GET_GROUP_CARTS_USER_IS_IN_FAIL: {
      return { loading: false, error: action.payload };
    }
    case ADD_CART_IN_NEW_CART_STATE: {
      return { ...state, currentUserCart: action.payload };
    }
    case CHANGE_GROUP_CART_REQUEST: {
      return { ...state, loading: true };
    }
    case CHANGE_GROUP_CART_SUCCESS: {
      return { ...state, loading: false, currentUserCart: action.payload };
    }
    case CHANGE_GROUP_CART_FAIL: {
      return { loading: false, error: action.payload };
    }
    case ADD_PRODUCT_IN_CURRENT_CART: {
      return {
        ...state,
        newCartState: { ...state.newCartState, products: action.payload },
      };
    }
    case REMOVE_PRODUCT_FROM_CURRENT_CART: {
      return {
        ...state,
        newCartState: { ...state.newCartState, products: action.payload },
      };
    }
    case ADD_USER_IN_CURRENT_CART: {
      return {
        ...state,
        newCartState: { ...state.newCartState, users: action.payload },
      };
    }
    case REMOVE_USER_IN_CURRENT_CART: {
      return {
        ...state,
        newCartState: { ...state.newCartState, users: action.payload },
      };
    }
    case EMPTY_PRODUCTS_FROM_NEW_CART: {
      return {
        ...state,
        newCartState: action.payload,
      };
    }
    case EMPTY_USER_FROM_NEW_CART: {
      return {
        ...state,
        newCartState: action.payload,
      };
    }

    default:
      return state;
  }
};
