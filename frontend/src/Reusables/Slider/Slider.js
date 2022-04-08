import React, { useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Slider.module.css";
import Card from "../Card";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";

const Slider = () => {
  const { loading, error, products } = useSelector(
    (state) => state.allProducts
  );
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
    <>
      <div className={styles.container}>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message>{error.message}</Message>
        ) : products.length > 0 ? (
          <>
            <div className={styles.arrow} onClick={scrollLeft}>
              <AiOutlineArrowLeft size={18} />
            </div>
            <div className={styles.item_container} ref={listRef}>
              {products.map((product, index) => {
                return (
                  <div className={styles.cardWrapper} key={index}>
                    <Card product={product} key={index} />
                  </div>
                );
              })}
            </div>
            <div className={styles.arrow} onClick={scrollRight}>
              <AiOutlineArrowRight size={18} />
            </div>
          </>
        ) : (
          <>
            <h3>No Products Found</h3>
          </>
        )}
      </div>
      {products.length > 0 ? (
        <>
          <div className={styles.mobileGallery}>
            <div className={styles.cardWrapper}>
              <Card product={products[0]} />
            </div>
            <div className={styles.cardWrapper}>
              <Card product={products[1]} />
            </div>{" "}
            <div className={styles.cardWrapper}>
              <Card product={products[2]} />
            </div>
            <div className={styles.cardWrapper}>
              <Card product={products[3]} />
            </div>{" "}
            <div className={styles.cardWrapper}>
              <Card product={products[4]} />
            </div>
            <div className={styles.cardWrapper}>
              <Card product={products[5]} />
            </div>{" "}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Slider;
