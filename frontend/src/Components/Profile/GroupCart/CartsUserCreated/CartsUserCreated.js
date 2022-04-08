import React from "react";
import styles from "./CartsUserCreated.module.css";
import { AiOutlineArrowLeft as Back } from "react-icons/ai";
import { CgTrash as Trash, CgDetailsMore as Open } from "react-icons/cg";
import TabLayout from "../../../../Reusables/TabLayout";
import Loader from "../../../../Reusables/Loader";
import Message from "../../../../Reusables/Message";
import CartDetails from "./CartDetails";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartToCurrentUserCart,
  deleteGroupCart,
  getGroupCarts,
} from "../../../../Redux/actions/groupcartActions";
import { useEffect } from "react";

const CartsUserCreated = ({ tabsHandler }) => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.loggedUser.user);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { loading, error, cartsOfUser } = useSelector(
    (state) => state.groupcart
  );
  const toggleHandler = () => {
    setToggleEdit(!toggleEdit);
  };
  useEffect(() => {
    dispatch(getGroupCarts(userId));
  }, [dispatch, userId, toggleEdit]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentBox}>
        {!toggleEdit ? (
          <motion.div
            key="tabs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: "inherit",
              width: "inherit",
              paddingTop: "70px",
            }}
          >
            <div className={styles.backButton} onClick={tabsHandler}>
              <Back size={24} />
            </div>
            <h2 style={{ marginLeft: "10px", marginBottom: "25px" }}>
              Your Carts
            </h2>
            <div className={styles.tabs}>
              {loading ? (
                <Loader></Loader>
              ) : error ? (
                <Message>{error.message}</Message>
              ) : cartsOfUser.length > 0 ? (
                <>
                  {cartsOfUser.map((item, index) => {
                    return (
                      <TabLayout key={index}>
                        <div className={styles.tabWrapper}>
                          <div className={styles.tabText}>
                            <h3>{item.cartname}</h3>
                            <h4>Created On : 22/12/20</h4>
                          </div>
                          <div className={styles.buttonWrapper}>
                            <div
                              className={styles.button}
                              onClick={() => {
                                setToggleEdit(true);
                                dispatch(addCartToCurrentUserCart(item._id));
                              }}
                            >
                              <Open size={24} />
                            </div>
                            <div
                              className={styles.button}
                              onClick={() =>
                                dispatch(deleteGroupCart(item._id))
                              }
                            >
                              <Trash size={24} />
                            </div>
                          </div>
                        </div>
                      </TabLayout>
                    );
                  })}
                </>
              ) : (
                <>
                  <h3>No Carts Found</h3>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: "inherit", width: "inherit" }}
          >
            <CartDetails toggleHandler={toggleHandler} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartsUserCreated;
