import React from "react";
import styles from "./cartDetails.module.css";
import { CgTrash as Trash } from "react-icons/cg";
import TabLayout from "../../../../Reusables/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../../../Redux/actions/groupcartActions";

import Buttons from "../../../../Reusables/Buttons";

const CreateCart = ({ toggleHandler }) => {
  const { _id, cartname, parentuser, products, linkedusers } = useSelector(
    (state) => state.groupcart.currentUserCart
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{cartname}</h2>
        <h4 style={{ marginBottom: "15px" }}>
          Created By :- {parentuser.name}
        </h4>
        <Buttons clickHandler={toggleHandler}>
          <h4>Back</h4>
        </Buttons>
      </div>
      <div className={styles.content}>
        <h3>Edit Products :</h3>
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
                    <div
                      className={styles.deleteButton}
                      onClick={() =>
                        dispatch(removeProductFromCart(_id, item.id))
                      }
                    >
                      <Trash size={24} />
                    </div>
                  </div>
                </TabLayout>
              );
            })}
          </div>
        ) : (
          <div className={styles.noproductsWrapper}>
            <h3>No Products Added</h3>
            <Buttons>
              <p>Add Products</p>
            </Buttons>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCart;
