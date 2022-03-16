import InputBox from "../../../../Reusables/InputBox/InputBox";
import React, { useState, useEffect } from "react";
import styles from "./CreateCart.module.css";
import {
  CgLogOut as Back,
  CgTrash as Trash,
  CgCheckO as Check,
} from "react-icons/cg";
import { IoClose as Close } from "react-icons/io5";
import TabLayout from "../../../../Reusables/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUserInCurrentCart,
  createCart,
  removeUserFromCurrentCart,
  removeProductFromCurrentCart,
  emptyProductsFromNewCart,
  emptyUsersFromNewCart,
} from "../../../../Redux/actions/groupcartActions";
import Buttons from "../../../../Reusables/Buttons";
import Loader from "../../../../Reusables/Loader";
import Message from "../../../../Reusables/Message";
import { AnimatePresence, motion } from "framer-motion";
import ModifyProducts from "../../../../Reusables/ModifyProducts";

const CreateCart = ({ tabsHandler }) => {
  const navigate = useNavigate();
  const [modifyproduct, setModifyproduct] = useState(false);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cartcreated, setCartCreated] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const { users: allusers } = useSelector((state) => state.allUsers);
  const { loading, error } = useSelector((state) => state.groupcart);
  const { products, users } = useSelector(
    (state) => state.groupcart.newCartState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (search.length > 0) {
      setResults(
        allusers.filter((item) => {
          return item.name.includes(search);
        })
      );
      setShowResults(true);
      console.log(showResults);
    } else {
      setResults([]);
      setShowResults(true);
      console.log(showResults);
    }
  }, [search]);
  const createButtonHandler = () => {
    if (name == "") {
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
      {modifyproduct ? (
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
            {cartcreated ? (
              <div className={styles.cartcreatedWrapper}>
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
                    <div className={styles.inputBoxWrapper}>
                      <InputBox
                        placeholder="Name For The New Cart"
                        state={name}
                        changeHandler={setName}
                      />
                    </div>
                    <Buttons clickHandler={createButtonHandler}>
                      <h4>Create Cart</h4>
                    </Buttons>
                    <Buttons clickHandler={tabsHandler}>
                      <h4>Back</h4>
                    </Buttons>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.leftBlock}>
                    <div className={styles.leftBlockHeader}>
                      <h3>Products :</h3>
                      {products.length > 0 && (
                        <Buttons clickHandler={() => setModifyproduct(true)}>
                          <p>Modify Products</p>
                        </Buttons>
                      )}
                    </div>
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
                                </div>
                              </div>
                            </TabLayout>
                          );
                        })}
                      </div>
                    ) : (
                      <div className={styles.noproductsWrapper}>
                        <h3>No Products Added</h3>
                        <Buttons clickHandler={() => setModifyproduct(true)}>
                          <p>Add Products</p>
                        </Buttons>
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
                            state={search}
                            changeHandler={setSearch}
                          />
                        </div>
                        {results.length > 0 && showResults && (
                          <div className={styles.resultsWrapper}>
                            {results.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.results}
                                  onClick={() => {
                                    dispatch(addUserInCurrentCart(item._id));
                                    setShowResults(false);
                                    setSearch("");
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
