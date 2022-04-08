import React, { useState, useEffect } from "react";
import styles from "./cartDetails.module.css";
import { CgTrash as Trash } from "react-icons/cg";
import TabLayout from "../../../../Reusables/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductInCart,
  removeProductFromCart,
} from "../../../../Redux/actions/groupcartActions";
import Buttons from "../../../../Reusables/Buttons";
import InputBox from "../../../../Reusables/InputBox/InputBox";

const CreateCart = ({ toggleHandler }) => {
  const { _id, cartname, parentuser, products } = useSelector(
    (state) => state.groupcart.currentUserCart
  );
  const dispatch = useDispatch();
  const { products: allproducts } = useSelector((state) => state.allProducts);
  const [productsearch, setProductsearch] = useState("");
  const [productresults, setProductresults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (productsearch.length > 0) {
      setProductresults(
        allproducts.filter((item) => {
          return item.name.includes(productsearch);
        })
      );
      setShowResults(true);
    } else {
      setProductresults([]);
      setShowResults(true);
    }
  }, [showResults, productsearch, allproducts]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2>{cartname}</h2>
          <h4 style={{ marginBottom: "15px" }}>
            Created By :- {parentuser.name}
          </h4>
        </div>
        <Buttons clickHandler={toggleHandler}>
          <h4>Back</h4>
        </Buttons>
      </div>
      <div className={styles.content}>
        <h3>Edit Products :</h3>

        <div className={styles.searchWrapper}>
          <div className={styles.inputBoxWrapper}>
            <InputBox
              placeholder="Search Product To Add"
              state={productsearch}
              changeHandler={setProductsearch}
            />
          </div>
          {productresults.length > 0 && showResults && (
            <div className={styles.resultsWrapper}>
              {productresults.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.results}
                    onClick={() => {
                      dispatch(addProductInCart(_id, item._id));
                      setShowResults(false);
                      setProductsearch("");
                    }}
                  >
                    <h3 style={{ margin: "0" }}>{item.name}</h3>
                  </div>
                );
              })}
            </div>
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
