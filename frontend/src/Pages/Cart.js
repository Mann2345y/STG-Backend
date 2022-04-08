import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "../Reusables/NavBar/NavBar";
import Container from "../Reusables/Container";
import Footer from "../Reusables/Footer/Footer";
import styled from "styled-components";
import Ordersummary from "../Components/Cart/OrderSummary/Ordersummary";
import ItemsAddress from "../Components/Cart/ItemsAddress";
import MobileCart from "../Components/Cart/MobileCart";

const Wrapper = styled.div`
  height: 650px;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  margin-top: 100px;
  position: relative;
  @media (max-width: 1080px) {
    height: auto;
    margin-top: 20px;
  }
`;

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  @media (max-width: 1080px) {
    position: relative;
    width: 100%;
    height: auto;
  }
`;

const Cart = () => {
  const [itemsAddressActive, setItemsAddressActive] = useState(true);
  const [placeorderActive, setPlaceorderActive] = useState(false);

  const ItemsAddressHandler = () => {
    setItemsAddressActive(true);
    setPlaceorderActive(false);
  };

  const placeorderHandler = () => {
    setItemsAddressActive(false);
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
        {window.innerWidth > 1080 && (
          <Wrapper>
            <AnimatePresence>
              {itemsAddressActive && (
                <Motion
                  key="cartitems"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ItemsAddress placeorderHandler={placeorderHandler} />
                </Motion>
              )}
              {placeorderActive && (
                <Motion
                  key="placeorder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Ordersummary ItemsAddressHandler={ItemsAddressHandler} />
                </Motion>
              )}
            </AnimatePresence>
          </Wrapper>
        )}
        {window.innerWidth <= 1080 && <MobileCart />}
      </Container>
      <Footer />
    </motion.div>
  );
};

export default Cart;
