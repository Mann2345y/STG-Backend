import React, { useState } from "react";
import NavBar from "../Reusables/NavBar/NavBar";
import Banner from "../Components/Home/Banner/Banner";
import ProductSlider from "../Components/Home/ProductSlider/ProductSlider";
import Features from "../Components/Home/Features/Features";
import Footer from "../Reusables/Footer/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ErrorModal = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 7;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InnerDialogBox = styled.div`
  height: 150px;
  width: 250px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
`;

const DialogContent = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const CloseButton = styled.div`
  height: 40px;
  width: 100%;
  background: red;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const Home = ({ showModal, setShowModal }) => {
  const { error } = useSelector((state) => state.loggedUser);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {error && showModal && (
        <ErrorModal>
          <InnerDialogBox>
            <DialogContent>
              <h3>{error}</h3>
            </DialogContent>
            <CloseButton onClick={() => setShowModal(false)}>
              <h4>Dismiss</h4>
            </CloseButton>
          </InnerDialogBox>
        </ErrorModal>
      )}
      <NavBar />
      <Banner />
      <ProductSlider />
      <Features />
      <Footer />
    </motion.div>
  );
};

export default Home;
