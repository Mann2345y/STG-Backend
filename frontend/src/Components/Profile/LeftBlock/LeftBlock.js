import React from "react";
import styles from "./LeftBlock.module.css";
import {
  AiOutlineUser as User,
  AiOutlineShoppingCart as Cart,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { BsSuitHeartFill as Wishlist } from "react-icons/bs";
import { FaAddressCard as Address } from "react-icons/fa";
import { FiLogOut as Logout } from "react-icons/fi";
import { CgShoppingBag as OrderHistory } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const LeftBlock = ({
  profileHandler,
  addressHandler,
  orderhistoryHandler,
  wishlistHandler,
  groupcartHandler,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loggedUser);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.profileWrapper}>
          <div
            className={styles.profileImage}
            style={{ backgroundImage: `url(${user.image})` }}
          ></div>
          <h3>Welcome ! User</h3>
        </div>
        <div className={styles.tabsWrapper}>
          <div className={styles.tab} onClick={profileHandler}>
            <User size={21} />
            <h4 style={{ marginLeft: "20px" }}>Edit Profile</h4>
          </div>
          <div className={styles.tab} onClick={addressHandler}>
            <Address size={21} />
            <h4 style={{ marginLeft: "20px" }}>Saved Addresses</h4>
          </div>
          <div className={styles.tab} onClick={orderhistoryHandler}>
            <OrderHistory size={21} />
            <h4 style={{ marginLeft: "20px" }}>Order History</h4>
          </div>
          <div className={styles.tab} onClick={groupcartHandler}>
            <Cart size={21} />
            <h4 style={{ marginLeft: "20px" }}>Group Cart</h4>
          </div>
          <div className={styles.tab} onClick={wishlistHandler}>
            <Wishlist size={21} />
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
    </>
  );
};

export default LeftBlock;
