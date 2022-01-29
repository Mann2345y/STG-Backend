import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "../Reusables/NavBar/NavBar";
import Container from "../Reusables/Container";
import Footer from "../Reusables/Footer/Footer";
import CartItems from "../Components/Cart/CartItems/CartItems";
import AddressTab from "../Components/Cart/AddressTab/AddressTab";
import styled from "styled-components";
import Ordersummary from "../Components/Cart/OrderSummary/Ordersummary";

const Wrapper = styled.div`
  height: 650px;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  margin-top: 100px;
  position: relative;
`;

const Cart = () => {
  const [cartItemsActive, setCartItemsActive] = useState(true);
  const [addressTabActive, setAddressTabActive] = useState(false);
  const [placeorderActive, setPlaceorderActive] = useState(false);

  const cartItemsHandler = () => {
    setCartItemsActive(true);
    setAddressTabActive(false);
    setPlaceorderActive(false);
  };
  const addressTabHandler = () => {
    setCartItemsActive(false);
    setAddressTabActive(true);
    setPlaceorderActive(false);
  };
  const placeorderHandler = () => {
    setCartItemsActive(false);
    setAddressTabActive(false);
    setPlaceorderActive(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <Container>
        <Wrapper>
          <AnimatePresence>
            {cartItemsActive && (
              <motion.div
                key="cartitems"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  height: "95%",
                  width: "95%",
                  top: "2.5%",
                  left: "2.5%",
                }}
              >
                <CartItems addressTabHandler={addressTabHandler} />
              </motion.div>
            )}
            {addressTabActive && (
              <motion.div
                key="addressTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  height: "95%",
                  width: "95%",
                  top: "2.5%",
                  left: "2.5%",
                }}
              >
                <AddressTab
                  cartItemsHandler={cartItemsHandler}
                  placeorderHandler={placeorderHandler}
                />
              </motion.div>
            )}
            {placeorderActive && (
              <motion.div
                key="placeorder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  height: "95%",
                  width: "95%",
                  top: "2.5%",
                  left: "2.5%",
                }}
              >
                <Ordersummary
                  addressTabHandler={addressTabHandler}
                  cartItemsHandler={cartItemsHandler}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Wrapper>
      </Container>
      <Footer />
    </motion.div>
  );
};

export default Cart;
