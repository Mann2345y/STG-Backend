import React, { useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Slider.module.css";
import Card from "../Card";
import { useSelector } from "react-redux";

const Slider = () => {
  const { products } = useSelector((state) => state.allProducts);
  const listRef = useRef(null);
  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -300,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrow} onClick={scrollLeft}>
        <AiOutlineArrowLeft size={18} />
      </div>
      <div className={styles.item_container} ref={listRef}>
        {products.map((product, index) => {
          return <Card product={product} key={index} />;
        })}
      </div>
      <div className={styles.arrow} onClick={scrollRight}>
        <AiOutlineArrowRight size={18} />
      </div>
    </div>
  );
};

export default Slider;
