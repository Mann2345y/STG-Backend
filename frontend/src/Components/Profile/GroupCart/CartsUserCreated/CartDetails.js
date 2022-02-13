import React, { useState, useEffect } from "react";
import styles from "./cartDetails.module.css";
import { CgTrash as Trash } from "react-icons/cg";
import InputBox from "../../../../Reusables/InputBox/InputBox";
import TabLayout from "../../../../Reusables/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserInCart,
  removeProductFromCart,
  removeUserFromCart,
} from "../../../../Redux/actions/groupcartActions";
import Buttons from "../../../../Reusables/Buttons";

const CartDetails = ({ toggleHandler }) => {
  const { currentUserCart: cart } = useSelector((state) => state.groupcart);
  const [name, setName] = useState(cart.cartname);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length > 0) {
      setResults(
        users.filter((item) => {
          return item.name.includes(search);
        })
      );
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <div className={styles.wrapper}>
      <h2>Edit Your Cart</h2>
      <div className={styles.headerWrapper}>
        <div className={styles.inputBoxWrapper}>
          <InputBox
            placeholder="Name For The New Cart"
            state={name}
            changeHandler={setName}
          />
        </div>
        <Buttons>
          <h4>Save Changes</h4>
        </Buttons>
        <Buttons clickHandler={toggleHandler}>
          <h4>Cancel</h4>
        </Buttons>
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.productBlock}>
          <h3>Products :</h3>
          <div className={styles.productsWrapper}>
            {cart.products.length > 0 ? (
              <>
                {cart.products.map((item, index) => {
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
                          dispatch(removeProductFromCart(cart._id, item.id))
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
                          dispatch(addUserInCart(cart._id, item._id))
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
              {cart.linkedusers.length > 0 ? (
                <>
                  {cart.linkedusers.map((item, index) => {
                    return (
                      <TabLayout key={index}>
                        <div className={styles.userTabWrapper}>
                          <h3 style={{ margin: "0" }}>{item.name}</h3>
                          <div
                            className={styles.buttonWrapper}
                            onClick={() =>
                              dispatch(removeUserFromCart(cart._id, item.id))
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
  );
};

export default CartDetails;
