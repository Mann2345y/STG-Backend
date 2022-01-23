import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allProductsReducer,
  singleProductReducer,
} from "./reducers/productsReducers";
import { loggedUserReducer } from "./reducers/userReducers";
import { cartReducer } from "../Redux/reducers/cartReducers";
import { addressReducer } from "../Redux/reducers/addressReducer";

const reducer = combineReducers({
  allProducts: allProductsReducer,
  singleProduct: singleProductReducer,
  loggedUser: loggedUserReducer,
  cart: cartReducer,
  addresses: addressReducer,
});

const loggedUserFromStorage = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : {};

const InitialState = {
  loggedUser: { user: loggedUserFromStorage },
};

const middleware = [thunk];
const Store = createStore(
  reducer,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
