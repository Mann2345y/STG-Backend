import React, { useEffect } from "react";
import styles from "./CartItems.module.css";
import Buttons from "../../../Reusables/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import { removeCartItem } from "../../../Redux/actions/cartActions";

const CartItems = () => {
  let user = JSON.parse(localStorage.getItem("loggedUser"));
  const { loading, error, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeHandler = (userId, productId) => {
    dispatch(removeCartItem(userId, productId));
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      user.cartItems = user.cartItems.sort((a, b) => {
        return a.serialNo - b.serialNo;
      });
    }
  }, [cartItems]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Cart Items</h2>
        <Buttons>
          <h3>Empty Cart</h3>
        </Buttons>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>
          <h3>{error}</h3>
        </Message>
      ) : cartItems ? (
        <div className={styles.itemsWrapper}>
          {cartItems.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <div
                  style={{ backgroundImage: `url(${item.product.image})` }}
                  className={styles.image}
                ></div>
                <div className={styles.textWrapper}>
                  <h3>{item.product.name}</h3>
                  <p>By: {item.product.brand}</p>
                </div>
                <div className={styles.priceWrapper}>
                  <h3>Price :</h3>
                  <p>{item.product.price}</p>
                </div>
                <div className={styles.quantityWrapper}>
                  <h3>Quantity</h3>
                  <p>{item.quantity}</p>
                </div>
                <div className={styles.amountWrapper}>
                  <h3>Amount: </h3>
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
      ) : (
        <></>
      )}

      <div className={styles.header}>
        <Buttons>
          <h3>Add More Products</h3>
        </Buttons>
        <Buttons>
          <h3>Proceed</h3>
        </Buttons>
      </div>
    </div>
  );
};

export default CartItems;
