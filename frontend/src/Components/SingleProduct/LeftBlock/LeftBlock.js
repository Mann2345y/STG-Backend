import React from "react";
import { useSelector } from "react-redux";
import styles from "./LeftBlock.module.css";

const LeftBlock = () => {
  const { product } = useSelector((state) => state.singleProduct);
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
        }}
      ></div>
    </div>
  );
};

export default LeftBlock;
