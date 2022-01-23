import React from "react";
import Container from "../../Container";
import styles from "./LowerNav.module.css";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const SearchWrapper = styled.div`
  height: 50px;
  width: 250px;
  background: #ff4433;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease-in;
  transform: ${({ open }) => (open ? "scaleY(1)" : "scaleY(0)")};
`;

const LowerNav = ({ open, closeOpen }) => {
  return (
    <div className={styles.outerWrapper}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.links}>
            <Link to="/">
              <h4 className={styles.link}>Home</h4>
            </Link>
            <Link to="/products">
              <h4 className={styles.link}>Products</h4>
            </Link>
            <h4 className={styles.link}>About Us</h4>
            <h4 className={styles.link}>Contacts</h4>
          </div>
          <SearchWrapper open={open}>
            <input
              type="text"
              placeholder="Search for Products"
              className={styles.input}
            />
            <div className={styles.closeButton} onClick={closeOpen}>
              <AiOutlineClose />
            </div>
          </SearchWrapper>
        </div>
      </Container>
    </div>
  );
};

export default LowerNav;
