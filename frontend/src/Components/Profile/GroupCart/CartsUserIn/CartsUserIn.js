import React from "react";
import styles from "./CartsUserIn.module.css";
import { AiOutlineArrowLeft as Back } from "react-icons/ai";
import { FiMoreHorizontal as More } from "react-icons/fi";
import TabLayout from "../../../../Reusables/TabLayout";
import Loader from "../../../../Reusables/Loader";
import Message from "../../../../Reusables/Message";
import CartDetails from "./CartDetails";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addCartToCurrentUserCart } from "../../../../Redux/actions/groupcartActions";

const CartsUserIn = ({ tabsHandler }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const { loading, error, cartsUserIn } = useSelector(
    (state) => state.groupcart
  );
  const toggleHandler = () => {
    setToggleEdit(!toggleEdit);
  };
  const dispatch = useDispatch();
  return (
    <div className={styles.wrapper}>
      {!toggleEdit ? (
        <motion.div
          key="tabs2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "inherit", width: "inherit", paddingTop: "70px" }}
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
            ) : cartsUserIn.length > 0 ? (
              <>
                {cartsUserIn.map((item, index) => {
                  return (
                    <TabLayout key={index}>
                      <div className={styles.tabWrapper}>
                        <div className={styles.tabContent}>
                          <h3>{item.cartname}</h3>
                          <h4>Created By : {item.parentuser.name}</h4>
                        </div>
                        <div className={styles.buttonWrapper}>
                          <div
                            className={styles.button}
                            onClick={() => {
                              setToggleEdit(true);
                              dispatch(addCartToCurrentUserCart(item._id));
                            }}
                          >
                            <More size={28} />
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
          key="details2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "inherit", width: "inherit" }}
        >
          <CartDetails toggleHandler={toggleHandler} />
        </motion.div>
      )}
    </div>
  );
};

export default CartsUserIn;
