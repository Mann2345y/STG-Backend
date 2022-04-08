import React, { useState } from "react";
import styles from "./Ordersummary.module.css";
import Buttons from "../../../Reusables/Buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCart,
  placeOrder,
  removeCartItem,
} from "../../../Redux/actions/cartActions";
import { FiTrash } from "react-icons/fi";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import OrderPlaced from "../OrderPlaced/OrderPlaced";

const Ordersummary = ({ ItemsAddressHandler, setPlacedMobile }) => {
  const dispatch = useDispatch();
  const [placed, setPlaced] = useState(false);
  let totalItems = 0,
    amount = 0;
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const { loading, error, cartItems, address } = useSelector(
    (state) => state.cart
  );
  const { addresses } = useSelector((state) => state.addresses);
  const removeHandler = (userId, productId) => {
    dispatch(removeCartItem(userId, productId));
  };
  if (cartItems) {
    cartItems.forEach((item) => {
      totalItems += item.quantity;
      amount += item.amount;
    });
  }
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div className={styles.orderWrapper}>
          <Loader></Loader>
        </div>
      ) : error ? (
        <>
          <Message>{error.message}</Message>
        </>
      ) : placed && window.innerWidth > 1080 ? (
        <>
          <OrderPlaced />
        </>
      ) : (
        <>
          <div className={styles.orderWrapper}>
            {window.innerWidth > 1080 && (
              <div className={styles.leftBlock}>
                <h2>Items In Cart:</h2>
                <div className={styles.cartWrapper}>
                  {cartItems.map((item, index) => {
                    return (
                      <div className={styles.item} key={index}>
                        <div
                          style={{
                            backgroundImage: `url(${item.product.image})`,
                          }}
                          className={styles.image}
                        ></div>
                        <div className={styles.textWrapper}>
                          <h4>{item.product.name}</h4>
                          <h5>By: {item.product.brand}</h5>
                          <h5>Quantity: {item.quantity}</h5>
                          <h5>Amount: ${item.amount}</h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className={styles.rightBlock}>
              {window.innerWidth > 1080 && (
                <div className={styles.topBlock}>
                  <h2>Selected Address: </h2>
                  {addresses.map((item, index) => {
                    if (item._id === address) {
                      return (
                        <div className={styles.addressWrapper} key={index}>
                          <h3 style={{ marginBottom: "8px" }}>
                            {item.address}, {item.city}
                          </h3>
                          <h3>
                            {item.state} - {item.pincode}
                          </h3>
                        </div>
                      );
                    } else return <></>;
                  })}
                </div>
              )}
              <div className={styles.bottomBlock}>
                <h2 style={{ marginBottom: "15px" }}>Order Summary : </h2>
                <div className={styles.summaryBlocks}>
                  <h3>Total Items: </h3>
                  <h3>{totalItems}</h3>
                </div>
                <div className={styles.summaryBlocks}>
                  <h3>Amount:</h3>
                  <h3>$ {amount}</h3>
                </div>
                <div className={styles.summaryBlocks}>
                  <h3>Delivery Charge: </h3>
                  <h3>$ 30</h3>
                </div>
                <div className={styles.summaryBlocks}>
                  <h3>Total Amount: </h3>
                  <h3>$ {amount + 30}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.header}>
            {window.innerWidth > 1080 && (
              <Buttons clickHandler={ItemsAddressHandler}>
                <h4> Modify Order</h4>
              </Buttons>
            )}
            {window.innerWidth > 1080 && (
              <Buttons
                clickHandler={() => {
                  dispatch(placeOrder(cartItems, address, user.id));
                  dispatch(emptyCart(user.id));
                  setPlaced(true);
                }}
              >
                <h4>Place Order</h4>
              </Buttons>
            )}
            {window.innerWidth <= 1080 && (
              <Buttons
                clickHandler={() => {
                  dispatch(placeOrder(cartItems, address, user.id));
                  dispatch(emptyCart(user.id));
                  setPlacedMobile(true);
                }}
              >
                <h4>Place Order</h4>
              </Buttons>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Ordersummary;
