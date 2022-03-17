import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeftBlock.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {
  addWishlist,
  removeWishlist,
} from "../../../Redux/actions/wishlistActions";
import { useEffect } from "react";

const LeftBlock = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.singleProduct);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (wishlist) {
      wishlist.forEach((item) => {
        if (item.product.id === product._id) {
          setToggle(true);
        }
      });
    }
  }, [wishlist, product._id]);
  return (
    <div className={styles.wrapper}>
      <div
        style={{
          height: "700px",
          width: "100%",
          backgroundImage: `url(${product.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "60px",
            width: "60px",
            border: "2px solid #ff4433",
            background: "white",
            position: "absolute",
            right: "20%",
            top: "10px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setToggle(!toggle);
            if (toggle) {
              dispatch(removeWishlist(user.id, product._id));
            } else {
              dispatch(addWishlist(user.id, product._id));
            }
          }}
        >
          <div>
            {toggle ? (
              <BsSuitHeartFill
                size={24}
                className={styles.active}
              ></BsSuitHeartFill>
            ) : (
              <BsSuitHeart size={24}></BsSuitHeart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBlock;
