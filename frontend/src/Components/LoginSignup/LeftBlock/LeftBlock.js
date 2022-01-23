import React from "react";
import styles from "./LeftBlock.module.css";

const LeftBlock = ({ loginHandler, signupHandler, openLogin, openSignup }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div
          className={`${styles.button} ${openLogin ? styles.active : ``}`}
          onClick={loginHandler}
        >
          <p>Login</p>
        </div>
        <div
          className={`${styles.button} ${openSignup ? styles.active : ``}`}
          onClick={signupHandler}
        >
          <p>Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBlock;
