import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
} from "../constants/productsConstants";

export const allProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST: {
      return { loading: true, products: [] };
    }
    case ALL_PRODUCTS_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    }
    case ALL_PRODUCTS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
export const totalProductsReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST: {
      return { loading: true, products: [] };
    }
    case GET_ALL_PRODUCTS_SUCCESS: {
      return { loading: false, products: action.payload };
    }
    case GET_ALL_PRODUCTS_FAIL: {
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
