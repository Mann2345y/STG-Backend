import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LeftBlock.module.css";

const LeftBlock = () => {
  const { product } = useSelector((state) => state.singleProduct);

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        className={styles.image}
      ></div>
    </div>
  );
};

export default LeftBlock;
