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

export const addressReducer = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case GET_ADDRESSES_REQUEST: {
      return { loading: true, addresses: [] };
    }
    case GET_ADDRESSES_SUCCESS: {
      return { loading: false, addresses: action.payload };
    }
    case GET_ADDRESSES_FAIL: {
      return { loading: false, error: action.payload };
    }
    case ADD_ADDRESS_REQUEST: {
      return { loading: true, addresses: [] };
    }
    case ADD_ADDRESS_SUCCESS: {
      return { loading: false, addresses: action.payload };
    }
    case ADD_ADDRESS_FAIL: {
      return { loading: false, error: action.payload };
    }
    case REMOVE_ADDRESS_REQUEST: {
      return { loading: true, addresses: [] };
    }
    case REMOVE_ADDRESS_SUCCESS: {
      return { loading: false, addresses: action.payload };
    }
    case REMOVE_ADDRESS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
