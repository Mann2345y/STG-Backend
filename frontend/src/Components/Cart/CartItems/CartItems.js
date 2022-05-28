import React, { useEffect, useState } from "react";
import styles from "./CartItems.module.css";
import Buttons from "../../../Reusables/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FiTrash } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import {
  addCartItem,
  emptyCart,
  removeCartItem,
} from "../../../Redux/actions/cartActions";
import styled from "styled-components";
import { BsEmojiFrown as Icon } from "react-icons/bs";

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-top: 25px;
  }
`;
const NotFoundButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const CartItems = () => {
  const { error, cartItems } = useSelector((state) => state.cart);
  const [cartItemsState, setCartItemsState] = useState(cartItems);
  const [width, setWidth] = useState();
  let user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products: allproducts } = useSelector((state) => state.allProducts);
  const removeHandler = (userId, productId) => {
    dispatch(removeCartItem(userId, productId));
  };
  const addQuantityHandler = (userId, productId, currqty) => {
    const product = allproducts.find((item) => item._id == productId);
    if (product.countInStock > currqty) {
      currqty++;
    }
    console.log(currqty);
    dispatch(addCartItem(userId, productId, currqty));
  };
  const removeQuantityHandler = (userId, productId, currqty) => {
    if (currqty > 1) {
      currqty--;
    }
    dispatch(addCartItem(userId, productId, currqty));
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartItemsState(
        cartItems.sort((a, b) => {
          return a.serialNo - b.serialNo;
        })
      );
    }
    setWidth(window.innerWidth);
  }, [cartItems, window.innerWidth]);
  return (
    <div className={styles.wrapper}>
      {error ? (
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
              <p>Empty Cart</p>
            </Buttons>
          </div>
          <div className={styles.itemsOuterWrapper}>
            <div className={styles.itemsWrapper}>
              {cartItemsState.map((item, index) => {
                return (
                  <div className={styles.item} key={index}>
                    <div
                      style={{
                        backgroundImage: `url(${item.product.image})`,
                      }}
                      className={styles.image}
                    ></div>
                    <div className={styles.textAndQuantity}>
                      <div className={styles.textWrapper}>
                        <h4>{item.product.name}</h4>
                        <p>By: {item.product.brand}</p>
                        <p>$ {item.product.price}</p>
                      </div>
                      <div className={styles.quantityWrapper}>
                        <div
                          className={styles.quantityButtons}
                          onClick={() =>
                            removeHandler(user.id, item.product.id)
                          }
                        >
                          <FiTrash size={width > 1100 ? 18 : 14} />
                        </div>
                        <div className={styles.quantity}>
                          <h5>{item.quantity}</h5>
                        </div>
                        <div className={styles.addRemoveButtons}>
                          <div
                            className={styles.addButton}
                            onClick={() =>
                              addQuantityHandler(
                                user.id,
                                item.product.id,
                                item.quantity
                              )
                            }
                          >
                            <AiOutlinePlus size={width > 1100 ? 13 : 11} />
                          </div>
                          <div
                            className={styles.addButton}
                            onClick={() =>
                              removeQuantityHandler(
                                user.id,
                                item.product.id,
                                item.quantity
                              )
                            }
                          >
                            <AiOutlineMinus size={width > 1100 ? 13 : 11} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : cartItems.length <= 0 && window.innerWidth <= 1080 ? (
        <>
          <NotFoundWrapper>
            <Icon size={window.innerWidth < 1080 ? 140 : 100} />
            <h2>No Products Found</h2>
            <NotFoundButtons>
              <Buttons clickHandler={() => navigate("/products/page/1")}>
                {window.innerWidth > 1080 ? (
                  <h3>Browse Products</h3>
                ) : (
                  <h4>Browse Products</h4>
                )}
              </Buttons>
              <Buttons clickHandler={() => navigate("/")}>
                {window.innerWidth > 1080 ? (
                  <h3>Go To Home</h3>
                ) : (
                  <h4>Go To Home</h4>
                )}
              </Buttons>
            </NotFoundButtons>
          </NotFoundWrapper>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartItems;
