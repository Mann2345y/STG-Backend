import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  getGroupCarts,
  getGroupCartsUserIsIn,
} from "../../../Redux/actions/groupcartActions";
import Tabs from "./Tabs/Tabs";
import CreateCart from "./CreateCart/CreateCart";
import CartsUserIn from "./CartsUserIn/CartsUserIn";
import CartsUserCreated from "./CartsUserCreated/CartsUserCreated";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  @media (max-width: 1080px) {
    height: 600px;
  }
`;

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Groupcart = () => {
  const [tabs, setTabs] = useState(true);
  const [createcart, setCreatecart] = useState(false);
  const [cartsUserCreated, setCartsUserCreated] = useState(false);
  const [cartsUserIn, setCartsUserIn] = useState(false);
  const tabsHandler = () => {
    setTabs(true);
    setCreatecart(false);
    setCartsUserCreated(false);
    setCartsUserIn(false);
  };
  const createcartHandler = () => {
    setTabs(false);
    setCreatecart(true);
    setCartsUserCreated(false);
    setCartsUserIn(false);
  };
  const cartsUserCreatedHandler = () => {
    setTabs(false);
    setCreatecart(false);
    setCartsUserCreated(true);
    setCartsUserIn(false);
  };
  const cartsUserInHandler = () => {
    setTabs(false);
    setCreatecart(false);
    setCartsUserCreated(false);
    setCartsUserIn(true);
  };
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupCarts(user.id));
    dispatch(getGroupCartsUserIsIn(user.id));
  }, [dispatch, user.id]);
  return (
    <Wrapper>
      <AnimatePresence>
        {tabs && (
          <Motion
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tabs
              createcartHandler={createcartHandler}
              cartsUserCreatedHandler={cartsUserCreatedHandler}
              cartsUserInHandler={cartsUserInHandler}
            />
          </Motion>
        )}
        {createcart && (
          <Motion
            key="address"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "relative" }}
          >
            <CreateCart tabsHandler={tabsHandler} />
          </Motion>
        )}
        {cartsUserCreated && (
          <Motion
            key="order"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CartsUserCreated tabsHandler={tabsHandler} />
          </Motion>
        )}
        {cartsUserIn && (
          <Motion
            key="wishlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CartsUserIn tabsHandler={tabsHandler} />
          </Motion>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Groupcart;
