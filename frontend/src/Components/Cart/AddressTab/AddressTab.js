import React from "react";
import AddressForm from "./AddressForm";
import styles from "./AddressTab.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillBookmarkPlusFill as Add } from "react-icons/bs";
import { IoTrashBinOutline as Trash } from "react-icons/io5";
import { AiOutlineEdit as Edit, AiOutlineCheck as Check } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import { useState } from "react";
import { removeAddress } from "../../../Redux/actions/addressActions";
import { addAddressInCart } from "../../../Redux/actions/cartActions";

const AddressTab = ({ setSelectedAdd }) => {
  const { error, addresses } = useSelector((state) => state.addresses);
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [toggleEdit, setToggleEdit] = useState(false);
  const [item, setItem] = useState();
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      {error ? (
        <Message>{error}</Message>
      ) : addresses.length > 0 ? (
        <>
          {window.innerWidth > 1080 && (
            <h2 className={styles.heading}>Addresses</h2>
          )}
          <AnimatePresence>
            {toggleEdit ? (
              <motion.div
                key="addressform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: "90%",
                  width: "95%",
                  position: "absolute",
                  left: "2.5%",
                }}
              >
                <AddressForm item={item} setToggleEdit={setToggleEdit} />
              </motion.div>
            ) : (
              <motion.div
                key="addresstab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: "90%",
                  width: "95%",
                  position: "absolute",
                  left: "2.5%",
                }}
              >
                <div className={styles.addressWrapper}>
                  <div className={styles.addresstabsWrapper}>
                    <div
                      className={styles.addAddressHeader}
                      onClick={() => {
                        setToggleEdit(true);
                        setItem({});
                      }}
                    >
                      <Add size={21} />
                      <h4 style={{ marginLeft: "15px" }}>Add New Address</h4>
                    </div>
                  </div>

                  {addresses.map((item, index) => {
                    return (
                      <div className={styles.addresstabsWrapper} key={index}>
                        <div className={styles.addressTabWrapper}>
                          <div>
                            <h3>{item.address}</h3>
                            <h5 style={{ marginTop: "5px" }}>
                              {item.city}, {item.state}
                            </h5>
                            <h5 style={{ marginTop: "5px" }}>
                              Pin Code - {item.pincode}
                            </h5>
                          </div>
                          <div className={styles.rightblock}>
                            {window.innerWidth <= 1080 && (
                              <div
                                className={styles.buttonWrapper}
                                onClick={() => {
                                  dispatch(addAddressInCart(item._id));
                                  setSelectedAdd(item);
                                }}
                              >
                                <Check size={14} />
                              </div>
                            )}
                            {window.innerWidth > 1080 && (
                              <div
                                className={styles.buttonWrapper}
                                onClick={() => {
                                  dispatch(addAddressInCart(item._id));
                                }}
                              >
                                <Check size={14} />
                              </div>
                            )}
                            <div
                              className={styles.buttonWrapper}
                              onClick={() => {
                                setToggleEdit(true);
                                setItem(item);
                              }}
                            >
                              <Edit size={14} />
                            </div>
                            <div
                              className={styles.buttonWrapper}
                              onClick={() =>
                                dispatch(removeAddress(user.id, item._id))
                              }
                            >
                              <Trash size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className={styles.notFoundWrapper}>
          <h3>No Address Found</h3>
          <div className={styles.addressFormWrapper}>
            <AddressForm setToggleEdit={setToggleEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressTab;
