import React from "react";
import NavBar from "../Reusables/NavBar/NavBar";
import LeftBlock from "../Components/AllProducts/LeftBlock/LeftBlock";
import RightBlock from "../Components/AllProducts/RightBlock/RightBlock";
import Footer from "../Reusables/Footer/Footer";
import Container from "../Reusables/Container";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1070px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const AllProducts = ({ match }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <Container>
        <Wrapper>
          <LeftBlock />
          <RightBlock match={match} />
        </Wrapper>
      </Container>
      <Footer />
    </motion.div>
  );
};

export default AllProducts;
