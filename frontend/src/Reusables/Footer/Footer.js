import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.socialIcons}>
        <div className={styles.iconsWrapper}>
          <FaFacebookF size={21} />
        </div>
        <div className={styles.iconsWrapper}>
          <FaGithub size={21} />
        </div>
        <div className={styles.iconsWrapper}>
          <FaInstagram size={21} />
        </div>
        <div className={styles.iconsWrapper}>
          <FaTwitter size={21} />
        </div>
      </div>
      <div className={styles.links}>
        <Link to="/">
          <h4>Home</h4>
        </Link>
        <Link to="/products/page/1">
          <h4>Products</h4>
        </Link>
        <Link to="/about">
          <h4>About</h4>
        </Link>
        <Link to="/contacts">
          <h4>Contacts</h4>
        </Link>
      </div>
      <div className={styles.separator}></div>
      <p>Shop On The Go &copy; 2022</p>
    </div>
  );
};

export default Footer;
