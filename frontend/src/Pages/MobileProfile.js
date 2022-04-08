import React, { useEffect } from "react";
import NavBar from "../Reusables/NavBar/NavBar";
import Footer from "../Reusables/Footer/Footer";
import { motion } from "framer-motion";
import Container from "../Reusables/Container";
import ProfileEdit from "../Components/Profile/ProfileEdit/ProfileEdit";
import AddressTab from "../Components/Profile/Address/Address";
import Groupcart from "../Components/Profile/GroupCart/Groupcart";
import Wishlist from "../Components/Profile/Wishlist/Wishlist";
import OrderHistory from "../Components/Profile/OrderHistory/OrderHistory";
import { useDispatch } from "react-redux";
import { getOrderHistory } from "../Redux/actions/orderActions";
import { getAllUsers } from "../Redux/actions/userActions";

const MobileProfile = ({ profiletab }) => {
  const currenttab = JSON.parse(localStorage.getItem("tabclicked"));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(() => {
    dispatch(getOrderHistory(user.id));
    dispatch(getAllUsers());
  }, [dispatch, user.id]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      {(profiletab === "profileedit" || currenttab === "profileedit") && (
        <Container>
          <ProfileEdit />
        </Container>
      )}
      {(profiletab === "address" || currenttab === "address") && (
        <Container>
          <AddressTab />
        </Container>
      )}
      {(profiletab === "groupcart" || currenttab === "groupcart") && (
        <Container>
          <Groupcart />
        </Container>
      )}
      {(profiletab === "wishlist" || currenttab === "wishlist") && (
        <Container>
          <Wishlist />
        </Container>
      )}
      {(profiletab === "orderhistory" || currenttab === "orderhistory") && (
        <Container>
          <OrderHistory />
        </Container>
      )}
    </motion.div>
  );
};

export default MobileProfile;
