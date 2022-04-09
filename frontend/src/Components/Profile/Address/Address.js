import React, { useState } from "react";
import AddressForm from "./AddressForm";
import styles from "./Address.module.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillBookmarkPlusFill as Add } from "react-icons/bs";
import { IoTrashBinOutline as Trash } from "react-icons/io5";
import { AiOutlineEdit as Edit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import Buttons from "../../../Reusables/Buttons";
import { removeAddress } from "../../../Redux/actions/addressActions";

const AddressTab = ({ tabsHandler, width }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loggedUser);
  const { loading, error, addresses } = useSelector((state) => state.addresses);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [item, setItem] = useState();

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error}</Message>
      ) : addresses.length > 0 && window.innerWidth > 1080 ? (
        <div className={styles.outerWrapper}>
          <div className={styles.header}>
            <h2>Addresses</h2>
          </div>
          <AnimatePresence>
            {toggleEdit ? (
              <motion.div
                key="addressform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: "85%",
                  width: "100%",
                  position: "absolute",
                  padding: "40px 20px",
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
                  height: "85%",
                  width: "100%",
                  position: "absolute",
                  left: "0",
                  padding: "25px",
                  marginTop: "20px",
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
                            <div
                              className={styles.buttonWrapper}
                              onClick={() => {
                                setItem(item);
                              }}
                            >
                              <Edit />
                            </div>
                            <div
                              className={styles.buttonWrapper}
                              onClick={() =>
                                dispatch(removeAddress(user.id, item._id))
                              }
                            >
                              <Trash />
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
        </div>
      ) : window.innerWidth < 1080 && addresses.length > 0 ? (
        <AnimatePresence>
          {toggleEdit && (
            <motion.div
              key="addressformmobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.addAddressModal}
            >
              <div className={styles.addressFormWrapper}>
                <AddressForm item={item} setToggleEdit={setToggleEdit} />
              </div>
            </motion.div>
          )}
          <motion.div
            key="addresscontentmobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileWrapper}
          >
            <div className={styles.header}>
              <h2>Addresses</h2>
              <Buttons clickHandler={() => navigate("/profile")}>
                <h5>Back</h5>
              </Buttons>
            </div>
            <div className={styles.addressWrapper}>
              <div className={styles.addresstabsWrapper}>
                <div
                  className={styles.addAddressHeader}
                  onClick={() => {
                    setItem({ address: "", city: "", state: "", pincode: "" });
                    setToggleEdit(true);
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
                        <div
                          className={styles.buttonWrapper}
                          onClick={() => {
                            setToggleEdit(true);
                            setItem(item);
                          }}
                        >
                          <Edit />
                        </div>
                        <div
                          className={styles.buttonWrapper}
                          onClick={() =>
                            dispatch(removeAddress(user.id, item._id))
                          }
                        >
                          <Trash />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className={styles.notFoundWrapper}>
          <h2 style={{ marginBottom: "25px" }}>
            No Address Found, Create One Below
          </h2>
          <div className={styles.addressFormWrapper}>
            <AddressForm
              setToggleEdit={setToggleEdit}
              width={width}
              tabsHandler={tabsHandler}
            />
            {window.innerWidth < 1080 && (
              <div style={{ marginTop: "20px" }}>
                <Buttons clickHandler={() => navigate("/profile")}>
                  <h5>Back</h5>
                </Buttons>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressTab;
