import React, { useState, useEffect } from "react";
import styles from "./CreateCart.module.css";
import {
  CgLogOut as Back,
  CgTrash as Trash,
  CgCheckO as Check,
} from "react-icons/cg";
import { IoClose as Close } from "react-icons/io5";
import InputBox from "../../../../Reusables/InputBox/InputBox";
import TabLayout from "../../../../Reusables/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserInCurrentCart,
  createCart,
  removeUserFromCurrentCart,
  removeProductFromCurrentCart,
  emptynewCart,
} from "../../../../Redux/actions/groupcartActions";
import Buttons from "../../../../Reusables/Buttons";
import Loader from "../../../../Reusables/Loader";
import Message from "../../../../Reusables/Message";

const CreateCart = ({ tabsHandler }) => {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cartcreated, setCartCreated] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
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
    } else {
      setResults([]);
    }
  }, [search]);
  const createButtonHandler = () => {
    if (name == "") {
      setModalOpen(true);
    } else {
      dispatch(createCart(name, user.id, products, users));
      dispatch(emptynewCart());
      setCartCreated(true);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.backButton} onClick={tabsHandler}>
        <Back size={35} />
        <h4>Back </h4>
      </div>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error.message}</Message>
      ) : cartcreated ? (
        <div className={styles.cartCreatedWrapper}>
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
          <h3>Yeah Right!!, Cart Created</h3>
          <div className={styles.cartCreatedButtons}>
            <Buttons>
              <h4>Your Carts</h4>
            </Buttons>
            <Buttons>
              <h4>Carts Your're In</h4>
            </Buttons>
          </div>
        </div>
      ) : (
        <div className={styles.innerWrapper}>
          <h2>Create A New Cart</h2>
          <div className={styles.headerWrapper}>
            <div className={styles.inputBoxWrapper}>
              <InputBox
                placeholder="Name For The New Cart"
                state={name}
                changeHandler={setName}
              />
              <div
                className={
                  modalOpen
                    ? `${styles.open} ${styles.errorModal}`
                    : `${styles.close} ${styles.errorModal}`
                }
              >
                <div className={styles.modalText}>
                  <div
                    className={styles.closeButton}
                    onClick={() => setModalOpen(false)}
                  >
                    <Close size={24} />
                  </div>
                  {modalOpen && <h3> Please Enter a name for the cart </h3>}
                </div>
              </div>
            </div>
            <Buttons clickHandler={createButtonHandler}>
              <h4>Create Cart</h4>
            </Buttons>
          </div>
          <div className={styles.contentBlock}>
            <div className={styles.productBlock}>
              <h3>Products :</h3>
              <div className={styles.productsWrapper}>
                {products.length > 0 ? (
                  <>
                    {products.map((item, index) => {
                      return (
                        <TabLayout key={index}>
                          <div className={styles.tabWrapper}>
                            <div
                              style={{ backgroundImage: `url(${item.image})` }}
                              className={styles.imageWrapper}
                            ></div>
                            <div className={styles.textWrapper}>
                              <h4>{item.name}</h4>
                              <h4>By: - {item.brand}</h4>
                            </div>
                          </div>
                          <div
                            className={styles.buttonWrapper}
                            onClick={() =>
                              dispatch(removeProductFromCurrentCart(item.id))
                            }
                          >
                            <Trash size={28} />
                          </div>
                        </TabLayout>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h3>No Products Added</h3>
                  </>
                )}
              </div>
            </div>
            <div className={styles.usersBlock}>
              <h3>Users :</h3>
              <div className={styles.usersWrapper}>
                <div className={styles.searchWrapper}>
                  <div className={styles.inputBoxWrapper}>
                    <InputBox
                      placeholder="Search User To Add"
                      state={search}
                      changeHandler={setSearch}
                    />
                  </div>
                  {results.length > 0 && (
                    <div className={styles.resultsWrapper}>
                      {results.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.results}
                            onClick={() =>
                              dispatch(addUserInCurrentCart(item._id))
                            }
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
                                  dispatch(removeUserFromCurrentCart(item.id))
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
                    <>
                      <h3>No users Added</h3>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCart;

{
  /* <div className={styles.userSearchWrapper}>
<InputBox
  placeholder="Enter User Name To Add"
  state={search}
  changeHandler={setSearch}
/>
</div>
<div className={styles.searchResultWrapper}>

{results.map((item, index) => {
  return (
    <TabLayout key={index}>
      <div className={styles.userTabWrapper}>
        <h3>{item.name}</h3>
        <div
          className={styles.buttonWrapper}
          onClick={() => dispatch(addUserInCart(item._id))}
        >
          <Check size={28} />
        </div>
      </div>
    </TabLayout>
  );
})}
</div> */
}
