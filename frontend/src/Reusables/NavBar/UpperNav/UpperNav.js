import React, { useState } from "react";
import styles from "./UpperNav.module.css";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Redux/actions/userActions";
import { useDispatch } from "react-redux";

const UpperNav = ({ toggleOpen }) => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    navigate(0);
    dispatch(logoutUser());
  };
  return (
    <div className={styles.wrapper}>
      <Link to="/">
        <h1>ShopOnTheGo</h1>
      </Link>
      <div className={styles.icons}>
        <div className={styles.iconWrapper} onMouseEnter={() => setOpen(true)}>
          <div
            onClick={() => navigate("/login")}
            className={styles.loginWrapper}
          >
            <AiOutlineUser className={`${styles.icon} ${styles.iconText}`} />
            {user ? (
              <p className={`${styles.iconText}`}>{user.name}</p>
            ) : (
              <p className={`${styles.iconText}`}>Login</p>
            )}
          </div>

          {user ? (
            <div
              style={
                open ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }
              }
              className={styles.hoverBox}
              onMouseLeave={() => setOpen(false)}
            >
              <div className={styles.innerHoverBox}>
                <h4 onClick={() => navigate("/profile")}>Profile</h4>
                <h4 onClick={logoutHandler}>Log Out</h4>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={styles.iconWrapper}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <AiOutlineShoppingCart className={styles.icon} />
          <p>Cart</p>
        </div>
        <div className={styles.iconWrapper} onClick={toggleOpen}>
          <AiOutlineSearch className={styles.icon} />
          <p>Search</p>
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
