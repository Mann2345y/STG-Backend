import React from "react";
import styles from "./Tabs.module.css";

const Tabs = ({
  createcartHandler,
  cartsUserInHandler,
  cartsUserCreatedHandler,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabsWrapper} onClick={createcartHandler}>
        <h3>Create New Cart</h3>
      </div>
      <div className={styles.tabsWrapper} onClick={cartsUserCreatedHandler}>
        <h3>Your Carts</h3>
      </div>
      <div className={styles.tabsWrapper} onClick={cartsUserInHandler}>
        <h3>Carts You're In</h3>
      </div>
    </div>
  );
};

export default Tabs;
