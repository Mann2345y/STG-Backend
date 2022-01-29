import {
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../constants/orderConstants";

export const orderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY_REQUEST: {
      return { loading: true, orders: [] };
    }
    case GET_ORDER_HISTORY_SUCCESS: {
      return { loading: false, orders: action.payload };
    }
    case GET_ORDER_HISTORY_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CANCEL_ORDER_REQUEST: {
      return { loading: true, orders: [] };
    }
    case CANCEL_ORDER_SUCCESS: {
      return { loading: false, orders: action.payload };
    }
    case CANCEL_ORDER_FAIL: {
      return { loading: false, error: action.payload };
    }

    default:
      return state;
  }
};
