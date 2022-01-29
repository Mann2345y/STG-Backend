import React from "react";
import styles from "./OrderHistory.module.css";
import HistoryTab from "./HistoryTab";
import { useSelector } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";

const OrderHistory = () => {
  const { loading, error, orders } = useSelector((state) => state.orderHistory);
  return (
    <>
      {loading ? (
        <div className={styles.wrapper}>
          <Loader></Loader>
        </div>
      ) : error ? (
        <div className={styles.wrapper}>
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
        <div className={styles.wrapper}>
          <h3>No Orders Placed</h3>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
