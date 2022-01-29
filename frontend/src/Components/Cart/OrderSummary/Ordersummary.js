import React, { useEffect, useState } from "react";
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

const Ordersummary = ({ addressTabHandler, cartItemsHandler }) => {
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
    cartItems.map((item) => {
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
      ) : placed ? (
        <>
          <OrderPlaced />
        </>
      ) : (
        <>
          <div className={styles.orderWrapper}>
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
                        <h6>By: {item.product.brand}</h6>
                      </div>
                      <div className={styles.priceWrapper}>
                        <h4>Price :</h4>
                        <h6>{item.product.price}</h6>
                      </div>
                      <div className={styles.quantityWrapper}>
                        <h4>Quantity</h4>
                        <h6>{item.quantity}</h6>
                      </div>
                      <div className={styles.amountWrapper}>
                        <h6>Amount: </h6>
                        {item.amount}
                      </div>
                      <div
                        className={styles.removeButton}
                        onClick={() => removeHandler(user.id, item.product.id)}
                      >
                        <div className={styles.buttonWrapper}>
                          <FiTrash size={21} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.topBlock}>
                <h2>Selected Address: </h2>
                {addresses.map((item, index) => {
                  if (item._id == address) {
                    return (
                      <h4>
                        {item.address}, {item.city}, {item.state},{" "}
                        {item.pincode}
                      </h4>
                    );
                  }
                })}
              </div>
              <div className={styles.bottomBlock}>
                <h3>Total Items: {totalItems}</h3>
                <h3>Amount: {amount} </h3>
                <h3>Delivery Charge: $30 </h3>
                <h3>Total Amount: {amount + 30} </h3>
              </div>
            </div>
          </div>
          <div className={styles.header}>
            <Buttons clickHandler={addressTabHandler}>
              <h4>Modify Address</h4>
            </Buttons>
            <Buttons clickHandler={cartItemsHandler}>
              <h4>Edit Cart Items</h4>
            </Buttons>
            <Buttons
              clickHandler={() => {
                dispatch(placeOrder(cartItems, address, user.id));
                dispatch(emptyCart(user.id));
                setPlaced(true);
              }}
            >
              <h4>Place Order</h4>
            </Buttons>
          </div>
        </>
      )}
    </div>
  );
};

export default Ordersummary;
