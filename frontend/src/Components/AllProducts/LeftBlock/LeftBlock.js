import React from "react";
import styles from "./LeftBlock.module.css";
import Buttons from "../../../Reusables/Buttons";
import { BiSort as Sort, BiFilter as Filter } from "react-icons/bi";
import { useState } from "react";

const LeftBlock = () => {
  const [opendialog, setOpendialog] = useState(false);
  const [openfilter, setOpenfilter] = useState(false);
  const [opensort, setOpensort] = useState(false);
  return (
    <>
      <div className={styles.desktop}>
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
      <div
        className={styles.mobile}
        style={opendialog ? { height: "400px" } : { height: "100px" }}
      >
        <div className={styles.mobileHeader}>
          <div
            className={styles.filterButton}
            onClick={() => {
              setOpendialog(true);
              setOpensort(true);
            }}
          >
            <Sort size={24} style={{ marginRight: "10px" }} />
            <h4>Sort</h4>
          </div>
          <div
            className={styles.filterButton}
            onClick={() => {
              setOpendialog(true);
              setOpenfilter(true);
            }}
          >
            <Filter size={28} style={{ marginRight: "10px" }} />
            <h4>Filter</h4>
          </div>
        </div>
        <div className={styles.filtersBlock}>
          {opensort && (
            <div className={styles.sortWrapper}>
              <div className={styles.radio}>
                <input type="radio" id="rating" name="radio-group" />
                <label htmlFor="rating">Sort By Rating</label>
              </div>
              <div className={styles.radio}>
                <input type="radio" id="atoz" name="radio-group" />
                <label htmlFor="atoz">Sort Alphabetically A-Z</label>
              </div>
              <div className={styles.radio}>
                <input type="radio" id="ztoa" name="radio-group" />
                <label htmlFor="ztoa">Sort Alphabetically Z-A</label>
              </div>
              <div className={styles.radio}>
                <input type="radio" id="hightolow" name="radio-group" />
                <label htmlFor="hightolow">Sort By Price : High to Low</label>
              </div>
              <div className={styles.radio}>
                <input type="radio" id="lowtohigh" name="radio-group" />
                <label htmlFor="lowtohigh">Sort By Price: Low to High</label>
              </div>
            </div>
          )}
          {openfilter && <></>}
          <div className={styles.bottomButtons}>
            <Buttons
              clickHandler={() => {
                setOpendialog(false);
                setOpensort(false);
              }}
            >
              <h5>Cancel</h5>
            </Buttons>
            <Buttons>
              <h5>Apply</h5>
            </Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBlock;
