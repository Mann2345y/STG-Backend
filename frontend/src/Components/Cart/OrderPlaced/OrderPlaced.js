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
          class="path circle"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          class="path check"
          fill="none"
          stroke="#73AF55"
          stroke-width="6"
          stroke-linecap="round"
          stroke-miterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <div className={styles.innerWrapper}>
        <h3>Yeah Right!!, Order Placed</h3>
        <div className={styles.header}>
          <Buttons clickHandler={() => navigate("/profile")}>
            <h4>Order History</h4>
          </Buttons>
          <Buttons clickHandler={() => navigate("/products")}>
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
