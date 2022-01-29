import React, { useEffect } from "react";
import styles from "./CartItems.module.css";
import Buttons from "../../../Reusables/Buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import { emptyCart, removeCartItem } from "../../../Redux/actions/cartActions";
import { BsEmojiFrown as Icon } from "react-icons/bs";

const CartItems = ({ addressTabHandler }) => {
  let user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  let { loading, error, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeHandler = (userId, productId) => {
    dispatch(removeCartItem(userId, productId));
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      cartItems = cartItems.sort((a, b) => {
        return a.serialNo - b.serialNo;
      });
    }
  }, [cartItems]);
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div className={styles.notFoundWrapper}>
          <Loader></Loader>
        </div>
      ) : error ? (
        <div className={styles.notFoundWrapper}>
          <Message>{error}</Message>
        </div>
      ) : cartItems.length > 0 ? (
        <>
          <div className={styles.header}>
            <h2>Cart Items</h2>
            <Buttons
              clickHandler={() => {
                dispatch(emptyCart(user.id));
              }}
            >
              <h4>Empty Cart</h4>
            </Buttons>
          </div>
          <div className={styles.itemsOuterWrapper}>
            <div className={styles.itemsWrapper}>
              {cartItems.map((item, index) => {
                return (
                  <>
                    <div className={styles.item} key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${item.product.image})`,
                        }}
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
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.header}>
            <Buttons clickHandler={() => navigate("/products")}>
              <h4>Add More Products</h4>
            </Buttons>
            <Buttons clickHandler={addressTabHandler}>
              <h4>Proceed</h4>
            </Buttons>
          </div>
        </>
      ) : cartItems.length <= 0 ? (
        <div className={styles.notFoundWrapper}>
          <Icon size={140} />
          <h2>No Products Found</h2>
          <div className={styles.buttonsWrapper}>
            <Buttons clickHandler={() => navigate("/products")}>
              <h3>Browse Products</h3>
            </Buttons>
            <Buttons clickHandler={() => navigate("/")}>
              <h3>Go To Home</h3>
            </Buttons>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartItems;
