import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allProductsReducer,
  singleProductReducer,
  totalProductsReducer,
} from "./reducers/productsReducers";
import { allUsersReducer, loggedUserReducer } from "./reducers/userReducers";
import { cartReducer } from "../Redux/reducers/cartReducers";
import { addressReducer } from "../Redux/reducers/addressReducer";
import { orderHistoryReducer } from "./reducers/orderReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { groupcartReducer } from "./reducers/groupcartReducer";

const reducer = combineReducers({
  allProducts: allProductsReducer,
  allUsers: allUsersReducer,
  singleProduct: singleProductReducer,
  loggedUser: loggedUserReducer,
  cart: cartReducer,
  addresses: addressReducer,
  orderHistory: orderHistoryReducer,
  wishlist: wishlistReducer,
  groupcart: groupcartReducer,
  totalProducts: totalProductsReducer,
});

const loggedUserFromStorage = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : {};

const productsFromStorage = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
const usersFromStorage = localStorage.getItem("usersInCart")
  ? JSON.parse(localStorage.getItem("usersInCart"))
  : [];

const InitialState = {
  loggedUser: { user: loggedUserFromStorage },
  groupcart: {
    newCartState: { products: productsFromStorage, users: usersFromStorage },
    cartsOfUser: {},
    cartsUserIn: {},
    currentUserCart: {},
  },
};

const middleware = [thunk];
const Store = createStore(
  reducer,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
