import React, { useEffect } from "react";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SingleProduct from "./Pages/SingleProduct";
import AllProducts from "./Pages/AllProducts";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./Redux/actions/productsActions";
import ScrollToTop from "./scrollToTop";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import { getCartItems } from "./Redux/actions/cartActions";
import { getAddresses } from "./Redux/actions/addressActions";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(() => {
    dispatch(getAllProducts());
    if (user) {
      dispatch(getCartItems(user.id));
      dispatch(getAddresses(user.id));
    }
  }, [dispatch, user]);
  return (
    <AnimatePresence>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />{" "}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ScrollToTop>
    </AnimatePresence>
  );
}

export default App;
