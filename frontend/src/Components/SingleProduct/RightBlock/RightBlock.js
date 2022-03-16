import React, { useState } from "react";
import styles from "./RightBlock.module.css";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Buttons from "../../../Reusables/Buttons";
import { AnimatePresence, motion } from "framer-motion";
import { FaOpencart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../Redux/actions/cartActions";
import {
  addProductInCart,
  addProductInCurrentCart,
} from "../../../Redux/actions/groupcartActions";

const RightBlock = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [openDropdown, setOpenDropdown] = useState(false);
  const [qty, setQty] = useState(1);
  const { product } = useSelector((state) => state.singleProduct);
  const { cartsOfUser, cartsUserIn } = useSelector((state) => state.groupcart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addCartHandler = () => {
    if (user) {
      dispatch(addCartItem(user.id, product._id, qty));
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  const addQtyHandler = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };
  const reduceQtyHandler = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
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
            <p>{qty}</p>
          </div>
          <div className={styles.qtyButtonsWrapper}>
            <div className={styles.addButton} onClick={addQtyHandler}>
              <AiOutlinePlus />
            </div>
            <div className={styles.removeButton} onClick={reduceQtyHandler}>
              <AiOutlineMinus />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <Buttons clickHandler={addCartHandler}>
          <AiOutlineShoppingCart size={28} />
          <h3 style={{ marginLeft: "10px" }}>Buy Now</h3>
        </Buttons>
        <div
          className={styles.groupcartWrapper}
          onMouseEnter={() => setOpenDropdown(true)}
          onMouseLeave={() => setOpenDropdown(false)}
        >
          <Buttons>
            <FaOpencart size={28} />
            <h3 style={{ marginLeft: "10px" }}>Add To Group Cart</h3>
          </Buttons>
          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.selectCart}
              >
                <div
                  className={styles.tab}
                  onClick={() => {
                    dispatch(addProductInCurrentCart(product._id));
                    navigate("/products/page/1");
                  }}
                >
                  <h5>Current Cart</h5>
                </div>
                {cartsOfUser.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.tab}
                      onClick={() => {
                        dispatch(addProductInCart(item._id, product._id));
                        navigate("/profile");
                      }}
                    >
                      <h5>{item.cartname}</h5>
                    </div>
                  );
                })}
                {cartsUserIn.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.tab}
                      onClick={() => {
                        dispatch(addProductInCart(item._id, product._id));
                        navigate("/profile");
                      }}
                    >
                      <h5>{item.cartname}</h5>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RightBlock;
