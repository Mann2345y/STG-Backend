import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
} from "../constants/productsConstants";

export const allProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST: {
      return { loading: true, products: [] };
    }
    case ALL_PRODUCTS_SUCCESS: {
      return { loading: false, products: action.payload };
    }
    case ALL_PRODUCTS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const singleProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST: {
      return { loading: true, product: [] };
    }
    case SINGLE_PRODUCT_SUCCESS: {
      return { loading: false, product: action.payload };
    }
    case SINGLE_PRODUCT_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
