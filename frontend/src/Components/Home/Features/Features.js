import React, { useState, useEffect } from "react";
import Container from "../../../Reusables/Container";
import styles from "./Features.module.css";
import { FaOpencart, FaMoneyCheck } from "react-icons/fa";
import { GiHanger } from "react-icons/gi";

const Features = () => {
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <div className={styles.backdrop}></div>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.header}>
            <h2>Why Shop On The Go ?</h2>
            <div className={styles.separator}></div>
          </div>
          <div>
            <div className={styles.tabWrapper}>
              <div className={styles.iconWrapper}>
                <FaOpencart size={width > 1366 ? 35 : width > 475 ? 28 : 21} />
              </div>
              <div className={styles.text}>
                <h3>Group Cart</h3>
                <p>
                  Make a group cart with friends or family to get their feedback
                  easily
                </p>
              </div>
            </div>
            <div className={styles.tabWrapper}>
              <div className={styles.iconWrapper}>
                <GiHanger size={width > 1366 ? 35 : width > 475 ? 28 : 21} />
              </div>
              <div className={styles.text}>
                <h3>Virtual Trial Room</h3>
                <p>
                  Try products before buying virtually in our virtual trial room
                </p>
              </div>
            </div>
            <div className={styles.tabWrapper}>
              <div className={styles.iconWrapper}>
                <FaMoneyCheck
                  size={width > 1366 ? 35 : width > 475 ? 28 : 18}
                />
              </div>
              <div className={styles.text}>
                <h3>Paypal Integration</h3>
                <p>Seemless payments with paypal for easy shopping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Features;
