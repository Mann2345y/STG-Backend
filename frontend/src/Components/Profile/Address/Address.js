import React, { useState } from "react";
import styles from "./Address.module.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import AddressForm from "./AddressForm";
import Buttons from "../../../Reusables/Buttons";

const Address = () => {
  const { loading, error, addresses } = useSelector((state) => state.addresses);
  return (
    <>
      <div className={styles.wrapper}>
        <h2>Addresses</h2>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message>{error}</Message>
        ) : addresses.length > 0 ? (
          <div className={styles.tabsWrapper}>
            <AddressForm />
            {addresses.map((item, index) => {
              return <AddressForm item={item} key={index} />;
            })}
          </div>
        ) : (
          <div className={styles.notFoundWrapper}>
            <h3>No Address Found</h3>
            <AddressForm short={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
