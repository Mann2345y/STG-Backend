import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Address from "../Address/Address";
import OrderHistory from "../OrderHistory/OrderHistory";
import GroupCart from "../GroupCart/Groupcart";
import Wishlist from "../Wishlist/Wishlist";

const Wrapper = styled.div`
  height: 100%;
  width: 75%;
  position: relative;
`;

const RightBlock = ({
  profileEditActive,
  addressEditActive,
  orderHistoryActive,
  wishlistActive,
  groupCartActive,
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
            style={{ height: "100%", width: "100%", padding: "25px" }}
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
          >
            <Wishlist />
          </motion.div>
        )}
        {groupCartActive && (
          <motion.div
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GroupCart />
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default RightBlock;
