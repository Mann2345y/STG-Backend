import React from "react";
import styles from "./OrderHistory.module.css";
import HistoryTab from "./HistoryTab";
import { useSelector } from "react-redux";
import { BsEmojiFrown as Icon } from "react-icons/bs";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import Buttons from "../../../Reusables/Buttons";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { loading, error, orders } = useSelector((state) => state.orderHistory);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <div className={styles.Secondwrapper}>
          <Loader></Loader>
        </div>
      ) : error ? (
        <div className={styles.Secondwrapper}>
          <Message>{error.message}</Message>
        </div>
      ) : orders.length > 0 ? (
        <>
          <h2>Order History</h2>
          <div className={styles.wrapper}>
            {orders.map((item, index) => {
              return <HistoryTab item={item} key={index} />;
            })}
          </div>
        </>
      ) : (
        <div className={styles.Secondwrapper}>
          <Icon size={140} />
          <h2 style={{ marginTop: "25px" }}>No Orders Found</h2>
          <div className={styles.buttonsWrapper}>
            <Buttons
              clickHandler={() => {
                navigate("/products");
              }}
            >
              <h3>Place New Order</h3>
            </Buttons>
            <Buttons
              clickHandler={() => {
                navigate("/");
              }}
            >
              <h3>Back To Home</h3>
            </Buttons>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
