import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Container from "../Reusables/Container";
import NavBar from "../Reusables/NavBar/NavBar";
import Footer from "../Reusables/Footer/Footer";
import LeftBlock from "../Components/Profile/LeftBlock/LeftBlock";
import RightBlock from "../Components/Profile/RightBlock/RightBlock";
import MobileProfileNav from "../Components/MobileProfile/MobileProfileNav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrderHistory } from "../Redux/actions/orderActions";
import { getAllUsers } from "../Redux/actions/userActions";

const Wrapper = styled.div`
  height: 650px;
  width: 100%;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 80px;
  display: flex;
`;

const Profile = ({ setProfiletab }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(() => {
    dispatch(getOrderHistory(user.id));
    dispatch(getAllUsers());
  }, [dispatch, user.id]);
  const [width] = useState(window.innerWidth);
  const [profileEditActive, setProfileEditActive] = useState(true);
  const [addressEditActive, setAddressEditActive] = useState(false);
  const [orderHistoryActive, setOrderHistoryActive] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [groupcartActive, setGroupcartActive] = useState(false);

  const profileHandler = () => {
    setProfileEditActive(true);
    setAddressEditActive(false);
    setOrderHistoryActive(false);
    setWishlistActive(false);
    setGroupcartActive(false);
  };

  const addressHandler = () => {
    setProfileEditActive(false);
    setAddressEditActive(true);
    setOrderHistoryActive(false);
    setWishlistActive(false);
    setGroupcartActive(false);
  };

  const orderhistoryHandler = () => {
    setProfileEditActive(false);
    setAddressEditActive(false);
    setOrderHistoryActive(true);
    setWishlistActive(false);
    setGroupcartActive(false);
  };

  const wishlistHandler = () => {
    setProfileEditActive(false);
    setAddressEditActive(false);
    setOrderHistoryActive(false);
    setWishlistActive(true);
    setGroupcartActive(false);
  };

  const groupcartHandler = () => {
    setProfileEditActive(false);
    setAddressEditActive(false);
    setOrderHistoryActive(false);
    setWishlistActive(false);
    setGroupcartActive(true);
  };

  return (
    <>
      <NavBar />
      {width > 1080 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container>
            <Wrapper>
              <LeftBlock
                profileHandler={profileHandler}
                addressHandler={addressHandler}
                orderhistoryHandler={orderhistoryHandler}
                wishlistHandler={wishlistHandler}
                groupcartHandler={groupcartHandler}
              />
              <RightBlock
                profileEditActive={profileEditActive}
                addressEditActive={addressEditActive}
                orderHistoryActive={orderHistoryActive}
                wishlistActive={wishlistActive}
                groupcartActive={groupcartActive}
              />
            </Wrapper>
          </Container>
        </motion.div>
      )}
      {width <= 1080 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MobileProfileNav setProfiletab={setProfiletab} />
        </motion.div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
