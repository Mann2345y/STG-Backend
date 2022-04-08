import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Buttons from "../../Reusables/Buttons";
import CartItems from "./CartItems/CartItems";
import AddressTab from "./AddressTab/AddressTab";
import OrderSummary from "./OrderSummary/Ordersummary";
import OrderPlaced from "./OrderPlaced/OrderPlaced";
import { useSelector } from "react-redux";

const SelectedAddTab = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  padding: 0 25px;
  @media (max-width: 400px) {
    padding: 0 10px;
  }
`;

const AddressSlider = styled.div`
  height: 100vh;
  width: 100vw;
  transform: ${(props) =>
    props.toggle ? "translateY(0)" : "translateY(-100vh)"};
  transition: all 0.2s ease-in;
  z-index: 6;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  padding-top: 100px;
`;

const BackButton = styled.div`
  height: fit-content;
  width: fit-content;
  position: absolute;
  top: 30px;
  left: 30px;
`;

const MobileCart = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedAdd, setSelectedAdd] = useState(null);
  const [placedMobile, setPlacedMobile] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <AnimatePresence>
      {placedMobile ? (
        <motion.div
          key="placed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OrderPlaced />
        </motion.div>
      ) : (
        <motion.div
          key="notplaced"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {cartItems.length > 0 && (
            <SelectedAddTab>
              {selectedAdd ? (
                <h4>
                  {selectedAdd.address}, {selectedAdd.city}, {selectedAdd.state}{" "}
                  - {selectedAdd.pincode}
                </h4>
              ) : (
                <h4>No Address Selected</h4>
              )}
              <Buttons clickHandler={() => setToggle(true)}>
                <h4>Select</h4>
              </Buttons>
            </SelectedAddTab>
          )}
          {cartItems.length > 0 && (
            <AddressSlider toggle={toggle}>
              <BackButton>
                <Buttons clickHandler={() => setToggle(false)}>
                  <h4>Back</h4>
                </Buttons>
              </BackButton>
              <AddressTab setSelectedAdd={setSelectedAdd} />
            </AddressSlider>
          )}
          <CartItems />
          {cartItems.length > 0 && (
            <OrderSummary setPlacedMobile={setPlacedMobile} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCart;
