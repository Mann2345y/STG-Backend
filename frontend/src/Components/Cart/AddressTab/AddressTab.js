import React from "react";
import AddressForm from "./AddressForm";
import styles from "./AddressTab.module.css";
import Buttons from "../../../Reusables/Buttons";
import { useSelector } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";

const AddressTab = ({ cartItemsHandler, placeorderHandler }) => {
  const { loading, error, addresses } = useSelector((state) => state.addresses);
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error}</Message>
      ) : addresses.length > 0 ? (
        <>
          <h2>Saved Addresses</h2>
          {
            <div className={styles.addressWrapper}>
              <div className={styles.tabsWrapper}>
                <AddressForm />
                {addresses.map((item, index) => {
                  return <AddressForm item={item} key={index} />;
                })}
              </div>
            </div>
          }
        </>
      ) : (
        <div className={styles.notFoundWrapper}>
          <h3>No Address Found</h3>
          <div className={styles.addressFormWrapper}>
            <AddressForm />
          </div>
        </div>
      )}
      <div className={styles.header}>
        <Buttons clickHandler={cartItemsHandler}>
          <h4>Back To Cart</h4>
        </Buttons>
        <Buttons clickHandler={placeorderHandler}>
          <h4>Proceed</h4>
        </Buttons>
      </div>
    </div>
  );
};

export default AddressTab;
