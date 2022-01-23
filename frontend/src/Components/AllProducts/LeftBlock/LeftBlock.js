import React from "react";
import styles from "./LeftBlock.module.css";

const LeftBlock = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Filters</h3>
        <h3 style={{ color: "#ff4433", cursor: "pointer" }}>CLEAR ALL</h3>
      </div>
      <div className={styles.blockWrapper}>
        <h4 style={{ marginBottom: "20px" }}>Filter By Gender:</h4>
        <div className={styles.radio}>
          <input type="radio" id="female" name="radio-group" />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <input type="radio" id="male" name="radio-group" />
          <label htmlFor="male">Male</label>
        </div>
      </div>
      <div className={styles.blockWrapper}>
        <h4 style={{ marginBottom: "25px" }}>Filter By Category:</h4>
        <div className="form-group">
          <input type="checkbox" id="Jackets" />
          <label htmlFor="Jackets">Jackets</label>
        </div>
        <div className="form-group">
          <input type="checkbox" id="Tshirts" />
          <label htmlFor="Tshirts">Tshirts</label>
        </div>
        <div className="form-group">
          <input type="checkbox" id="Sweatshirts" />
          <label htmlFor="Sweatshirts">Sweatshirts</label>
        </div>
      </div>
      <div className={styles.blockWrapper}>
        <h4 style={{ marginBottom: "25px" }}>Filter By Price:</h4>
        <div className={styles.radio}>
          <input type="radio" id="under10" name="radio-group" />
          <label htmlFor="under10">Under $10</label>
        </div>
        <div className={styles.radio}>
          <input type="radio" id="under15" name="radio-group" />
          <label htmlFor="under10">$10 - $15</label>
        </div>
        <div className={styles.radio}>
          <input type="radio" id="under25" name="radio-group" />
          <label htmlFor="under25">$15-$25</label>
        </div>
      </div>
    </div>
  );
};

export default LeftBlock;
