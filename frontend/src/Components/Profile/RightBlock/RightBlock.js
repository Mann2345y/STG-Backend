import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Address from "../Address/Address";
import OrderHistory from "../OrderHistory/OrderHistory";
import Wishlist from "../Wishlist/Wishlist";
import Groupcart from "../GroupCart/Groupcart";

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 250px);
  position: relative;
  border: 1px solid #d3d3d3;
`;

const RightBlock = ({
  profileEditActive,
  addressEditActive,
  orderHistoryActive,
  wishlistActive,
  groupcartActive,
}) => {
  return (
    <Wrapper>
      <AnimatePresence>
        {profileEditActive && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <ProfileEdit />
          </motion.div>
        )}
        {addressEditActive && (
          <motion.div
            key="address"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: "100%",
              width: "100%",
              padding: "25px",
              position: "absolute",
            }}
          >
            <Address />
          </motion.div>
        )}
        {orderHistoryActive && (
          <motion.div
            key="order"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: "100%",
              width: "100%",
              padding: "25px",
              position: "absolute",
            }}
          >
            <OrderHistory />
          </motion.div>
        )}
        {wishlistActive && (
          <motion.div
            key="wishlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: "100%",
              width: "100%",
              padding: "25px",
              position: "absolute",
            }}
          >
            <Wishlist />
          </motion.div>
        )}
        {groupcartActive && (
          <motion.div
            key="groupcart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <Groupcart />
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default RightBlock;
