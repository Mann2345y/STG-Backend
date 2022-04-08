import React, { useState } from "react";
import styles from "./MobileProfileNav.module.css";
import {
  AiOutlineUser as User,
  AiOutlineShoppingCart as Cart,
} from "react-icons/ai";
import { BsSuitHeartFill as WishlistIcon } from "react-icons/bs";
import { FaAddressCard as AddressIcon } from "react-icons/fa";
import { FiLogOut as Logout } from "react-icons/fi";
import { CgShoppingBag as OrderHistoryIcon } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const MobileProfileNav = ({ setProfiletab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loggedUser);
  const clickhandler = (tab) => {
    navigate("/profile/mobile");
    setProfiletab(tab);
    localStorage.setItem("tabclicked", JSON.stringify(tab));
  };
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.profileWrapper}>
        <div
          className={styles.profileImage}
          style={{ backgroundImage: `url(${user.image})` }}
        ></div>
        <h3>Welcome ! User</h3>
      </div>
      <div className={styles.tabsWrapper}>
        <div className={styles.tab} onClick={() => clickhandler("profileedit")}>
          <User size={21} />
          <h4 style={{ marginLeft: "20px" }}>Edit Profile</h4>
        </div>
        <div className={styles.tab} onClick={() => clickhandler("address")}>
          <AddressIcon size={21} />
          <h4 style={{ marginLeft: "20px" }}>Saved Addresses</h4>
        </div>
        <div
          className={styles.tab}
          onClick={() => clickhandler("orderhistory")}
        >
          <OrderHistoryIcon size={21} />
          <h4 style={{ marginLeft: "20px" }}>Order History</h4>
        </div>
        <div className={styles.tab} onClick={() => clickhandler("groupcart")}>
          <Cart size={21} />
          <h4 style={{ marginLeft: "20px" }}>Group Cart</h4>
        </div>
        <div className={styles.tab} onClick={() => clickhandler("wishlist")}>
          <WishlistIcon size={21} />
          <h4 style={{ marginLeft: "20px" }}>Wishlist</h4>
        </div>
        <div
          className={styles.tab}
          onClick={() => {
            dispatch(logoutUser());
            navigate("/");
          }}
        >
          <Logout size={21} />
          <h4 style={{ marginLeft: "20px" }}>Logout</h4>
        </div>
      </div>
    </div>
  );
};

export default MobileProfileNav;
