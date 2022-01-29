import React from "react";
import styles from "./RightBlock.module.css";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import Buttons from "../../../Reusables/Buttons";
import { FaOpencart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../Redux/actions/cartActions";
import { addWishlist } from "../../../Redux/actions/wishlistActions";

const RightBlock = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const { product } = useSelector((state) => state.singleProduct);
  const quantity = 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(loggedUser._id, product._id, quantity);
  const addCartHandler = () => {
    dispatch(addCartItem(loggedUser.id, product._id, quantity));
    navigate("/cart");
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.productName}>{product.name}</h1>
      <p className={styles.brandName}>By: {product.brand}</p>
      <p className={styles.price}>$ {product.price}</p>
      <div className={styles.description}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure sint ab
          at fugit, cupiditate veniam doloremque excepturi ut aspernatur!
          Architecto hic molestiae, consequuntur repellat blanditiis illum
          inventore repudiandae tempore velit!
        </p>
      </div>
      <div className={styles.qtyBlock}>
        <h4>Quantity: </h4>
        <div className={styles.qtyWrapper}>
          <div className={styles.qty}>
            <p>1</p>
          </div>
          <div className={styles.qtyButtonsWrapper}>
            <div className={styles.addButton}>
              <AiOutlinePlus />
            </div>
            <div className={styles.removeButton}>
              <AiOutlineMinus />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <Buttons clickHandler={addCartHandler}>
          <AiOutlineShoppingCart size={28} />
          <h3 style={{ marginLeft: "10px" }}>Add To Cart</h3>
        </Buttons>
        <Buttons
          clickHandler={() => {
            dispatch(addWishlist(loggedUser.id, product._id));
          }}
        >
          <AiOutlineHeart size={28} />
          <h3 style={{ marginLeft: "10px" }}>Wish List</h3>
        </Buttons>
        <Buttons>
          <FaOpencart size={28} />
          <h3 style={{ marginLeft: "10px" }}>Add To Group Cart</h3>
        </Buttons>
      </div>
    </div>
  );
};

export default RightBlock;
