import React from "react";
import styles from "./UpperNav.module.css";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UpperNav = ({ toggleSearch, openMenuHandler }) => {
  const { user } = useSelector((state) => state.loggedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginHandler = () => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
    }
  };
  const logoutHandler = () => {
    navigate("/");
    dispatch(logoutUser());
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.hammenu} onClick={openMenuHandler}>
        <GiHamburgerMenu size={16} />
      </div>
      <Link to="/">
        <h1 className={styles.logo}>ShopOnTheGo</h1>
      </Link>
      <div className={styles.icons}>
        <div className={styles.iconWrapper} onClick={toggleSearch}>
          <AiOutlineSearch className={styles.icon} />
          <p>Search</p>
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
        <div className={`${styles.iconWrapper} ${styles.dropdown}`}>
          <div onClick={loginHandler} className={styles.loginWrapper}>
            <AiOutlineUser className={`${styles.icon} ${styles.iconText}`} />
            {Object.keys(user).length !== 0 ? (
              <p className={`${styles.iconText}`}>{user.name}</p>
            ) : (
              <p className={`${styles.iconText}`}>Login</p>
            )}
          </div>
          {Object.keys(user).length !== 0 ? (
            <div className={`${styles.hoverBox} ${styles.dropdownnav}`}>
              <div className={styles.innerHoverBox}>
                <h4 onClick={() => navigate("/profile")}>Profile</h4>
                <h4 onClick={logoutHandler}>Log Out</h4>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
