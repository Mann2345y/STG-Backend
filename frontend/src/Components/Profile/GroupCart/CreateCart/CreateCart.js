import InputBox from "../../../../Reusables/InputBox/InputBox";
import React, { useState, useEffect } from "react";
import styles from "./CreateCart.module.css";
import { CgTrash as Trash } from "react-icons/cg";
import { IoClose as Close } from "react-icons/io5";
import TabLayout from "../../../../Reusables/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUserInCurrentCart,
  createCart,
  removeUserFromCurrentCart,
  emptyProductsFromNewCart,
  emptyUsersFromNewCart,
  addProductInCurrentCart,
  removeProductFromCurrentCart,
} from "../../../../Redux/actions/groupcartActions";
import Buttons from "../../../../Reusables/Buttons";
import { AnimatePresence, motion } from "framer-motion";
import ModifyProducts from "../../../../Reusables/ModifyProducts";

const CreateCart = ({ tabsHandler }) => {
  const navigate = useNavigate();
  const [modifyproduct, setModifyproduct] = useState(false);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cartcreated, setCartCreated] = useState(false);
  const [productsearch, setProductsearch] = useState("");
  const [productresults, setProductresults] = useState([]);
  const [usersearch, setUsersearch] = useState("");
  const [userresults, setUserresults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const { products: allproducts } = useSelector((state) => state.allProducts);
  const { users: allusers } = useSelector((state) => state.allUsers);
  const { products, users } = useSelector(
    (state) => state.groupcart.newCartState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (usersearch.length > 0) {
      setUserresults(
        allusers.filter((item) => {
          return item.name.includes(usersearch);
        })
      );
      setShowResults(true);
    } else {
      setUserresults([]);
      setShowResults(true);
    }
    if (productsearch.length > 0) {
      setProductresults(
        allproducts.filter((item) => {
          return item.name.includes(productsearch);
        })
      );
      setShowResults(true);
    } else {
      setProductresults([]);
      setShowResults(true);
    }
  }, [usersearch, allusers, showResults, productsearch, allproducts]);
  const createButtonHandler = () => {
    if (name === "") {
      setModalOpen(true);
    } else {
      dispatch(createCart(name, user.id, products, users));
      dispatch(emptyProductsFromNewCart());
      dispatch(emptyUsersFromNewCart());
      setCartCreated(true);
    }
  };
  return (
    <AnimatePresence>
      {modifyproduct && window.innerWidth > 1080 ? (
        <motion.div
          key="modifyproduct"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            height: "inherit",
            width: "inherit",
            padding: "10px",
            position: "absolute",
          }}
        >
          <ModifyProducts setModifyproduct={setModifyproduct} createcart />
        </motion.div>
      ) : (
        <motion.div
          key="cartdetails"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "inherit", width: "inherit", position: "absolute" }}
        >
          <div className={styles.wrapper}>
            <div
              className={
                modalOpen
                  ? `${styles.errorModal} ${styles.open}`
                  : `${styles.errorModal} ${styles.close}`
              }
            >
              <div className={styles.modalText}>
                <div
                  className={styles.closeButton}
                  onClick={() => setModalOpen(false)}
                >
                  <Close size={24} />
                </div>
                <h3> Please Enter a Name for the cart</h3>
              </div>
            </div>
            {cartcreated ? (
              <div className={styles.cartcreatedWrapper}>
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
                  <h3>Yeah Right!!, Cart Created</h3>
                  <div className={styles.buttons}>
                    <Buttons clickHandler={tabsHandler}>
                      <h4>Back To Profile Tab</h4>
                    </Buttons>
                    <Buttons clickHandler={() => navigate("/products/page/1")}>
                      <h4>Browse Products</h4>
                    </Buttons>
                    <Buttons clickHandler={() => navigate("/")}>
                      <h4>Back To Home</h4>
                    </Buttons>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <h2>Create A New Cart</h2>
                  <div className={styles.headerContent}>
                    <InputBox
                      placeholder="Name For The New Cart"
                      state={name}
                      changeHandler={setName}
                    />
                    <div className={styles.headerbuttons}>
                      <Buttons clickHandler={createButtonHandler}>
                        <h4>Create Cart</h4>
                      </Buttons>
                      <Buttons clickHandler={tabsHandler}>
                        <h4>Back</h4>
                      </Buttons>
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.leftBlock}>
                    <div className={styles.leftBlockHeader}>
                      <h3>Products :</h3>
                      {products.length > 0 && window.innerWidth > 1080 && (
                        <Buttons clickHandler={() => setModifyproduct(true)}>
                          <p>Modify Products</p>
                        </Buttons>
                      )}
                    </div>
                    {window.innerWidth < 1080 && (
                      <div
                        className={styles.searchWrapper}
                        style={{ top: "80px" }}
                      >
                        <div className={styles.inputBoxWrapper}>
                          <InputBox
                            placeholder="Search Product To Add"
                            state={productsearch}
                            changeHandler={setProductsearch}
                          />
                        </div>
                        {productresults.length > 0 && showResults && (
                          <div className={styles.resultsWrapper}>
                            {productresults.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.results}
                                  onClick={() => {
                                    dispatch(addProductInCurrentCart(item._id));
                                    setShowResults(false);
                                    setProductsearch("");
                                  }}
                                >
                                  <h3 style={{ margin: "0" }}>{item.name}</h3>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                    {products.length > 0 ? (
                      <div className={styles.tabsWrapper}>
                        {products.map((item, index) => {
                          return (
                            <TabLayout key={index}>
                              <div className={styles.tabWrapper}>
                                <div
                                  style={{
                                    backgroundImage: `url(${item.image})`,
                                  }}
                                  className={styles.imageWrapper}
                                ></div>
                                <div className={styles.textWrapper}>
                                  <h4>{item.name}</h4>
                                  <h5>By: - {item.brand}</h5>
                                  {window.innerWidth < 1080 && (
                                    <div
                                      className={styles.deleteButton}
                                      onClick={() =>
                                        dispatch(
                                          removeProductFromCurrentCart(item.id)
                                        )
                                      }
                                    >
                                      <Trash />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TabLayout>
                          );
                        })}
                      </div>
                    ) : (
                      <div className={styles.noproductsWrapper}>
                        <h3>No Products Added</h3>
                        {window.innerWidth > 1080 && (
                          <Buttons clickHandler={() => setModifyproduct(true)}>
                            <p>Add Products</p>
                          </Buttons>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={styles.rightBlock}>
                    <div className={styles.leftBlockHeader}>
                      <h3>Users :</h3>
                      <Buttons
                        clickHandler={() => {
                          dispatch(emptyUsersFromNewCart());
                        }}
                      >
                        <p>Remove Users</p>
                      </Buttons>
                    </div>
                    <div className={styles.usersWrapper}>
                      <div className={styles.searchWrapper}>
                        <div className={styles.inputBoxWrapper}>
                          <InputBox
                            placeholder="Search User To Add"
                            state={usersearch}
                            changeHandler={setUsersearch}
                          />
                        </div>
                        {userresults.length > 0 && showResults && (
                          <div className={styles.resultsWrapper}>
                            {userresults.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.results}
                                  onClick={() => {
                                    dispatch(addUserInCurrentCart(item._id));
                                    setShowResults(false);
                                    setUsersearch("");
                                  }}
                                >
                                  <h3 style={{ margin: "0" }}>{item.name}</h3>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className={styles.selectedUsersWrapper}>
                        {users.length > 0 ? (
                          <>
                            {users.map((item, index) => {
                              return (
                                <TabLayout key={index}>
                                  <div className={styles.userTabWrapper}>
                                    <h3 style={{ margin: "0" }}>{item.name}</h3>
                                    <div
                                      className={styles.buttonWrapper}
                                      onClick={() =>
                                        dispatch(
                                          removeUserFromCurrentCart(item.id)
                                        )
                                      }
                                    >
                                      <Trash size={28} />
                                    </div>
                                  </div>
                                </TabLayout>
                              );
                            })}
                          </>
                        ) : (
                          <div className={styles.nouserWrapper}>
                            <h3>No users Added</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateCart;
