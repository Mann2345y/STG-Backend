import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import styles from "./MobileNav.module.css";
import { useSelector } from "react-redux";

const MobileNav = ({ openmenu, closeMenuHandler }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}/page/1`);
    } else {
      navigate("/");
    }
  };
  const { user } = useSelector((state) => state.loggedUser);
  return (
    <div
      className={styles.wrapper}
      style={
        openmenu
          ? { transform: "translateX(0)" }
          : { transform: "translateX(-100vw)" }
      }
    >
      <div className={styles.closeButton} onClick={closeMenuHandler}>
        <AiOutlineClose size={24} color="white" />
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search for products"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className={styles.buttons} onClick={submitHandler}>
            <AiOutlineSearch size={24} color="white" />
          </div>
        </div>
        <div className={styles.iconsWrapper}>
          <div
            className={styles.iconWrapper}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <AiOutlineShoppingCart className={styles.icon} />
            <p>Cart</p>
          </div>
          {Object.keys(user).length !== 0 ? (
            <div
              className={styles.iconWrapper}
              onClick={() => {
                navigate("/profile");
              }}
            >
              <AiOutlineUser className={styles.icon} />
              <p>{user.name}</p>
            </div>
          ) : (
            <div
              className={styles.iconWrapper}
              onClick={() => {
                navigate("/login");
              }}
            >
              <AiOutlineUser className={styles.icon} />
              <p>Login</p>
            </div>
          )}
        </div>
        <div className={styles.links}>
          <div className={styles.link}>
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </div>
          <div className={styles.link}>
            <Link to="/products/page/1">
              <h2>Products</h2>
            </Link>
          </div>
          <div className={styles.link}>
            <Link to="/about">
              <h2>About Us</h2>
            </Link>
          </div>
          <div className={styles.link}>
            <Link to="/contacts">
              <h2>Contact Us</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
