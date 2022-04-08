import React from "react";
import Buttons from "../../../Reusables/Buttons";
import styles from "./OrderPlaced.module.css";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
        className="iconsvg"
      >
        <circle
          className="path circle"
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className="path check"
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <div className={styles.innerWrapper}>
        <h3>Yeah Right!!, Order Placed</h3>
        <div className={styles.header}>
          <Buttons clickHandler={() => navigate("/profile")}>
            <h4>Order History</h4>
          </Buttons>
          <Buttons clickHandler={() => navigate("/products/page/1")}>
            <h4>Place New Order</h4>
          </Buttons>
          <Buttons clickHandler={() => navigate("/")}>
            <h4>Back To Home</h4>
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
