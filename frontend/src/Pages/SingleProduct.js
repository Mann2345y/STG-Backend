import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Reusables/NavBar/NavBar";
import Footer from "../Reusables/Footer/Footer";
import Container from "../Reusables/Container";
import { motion } from "framer-motion";
import styled from "styled-components";
import RightBlock from "../Components/SingleProduct/RightBlock/RightBlock";
import LeftBlock from "../Components/SingleProduct/LeftBlock/LeftBlock";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../Redux/actions/productsActions";
import Loader from "../Reusables/Loader";
import Message from "../Reusables/Message";

const Wrapper = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  @media (max-width: 768px) {
    height: fit-content;
    flex-direction: column;
  }
`;

const SingleProduct = () => {
  const { loading: productLoading, error: productError } = useSelector(
    (state) => state.singleProduct
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <Container>
        <Wrapper>
          {productLoading ? (
            <Loader></Loader>
          ) : productError ? (
            <Message>{productError.message}</Message>
          ) : (
            <>
              <LeftBlock />
              <RightBlock />
            </>
          )}
        </Wrapper>
      </Container>
      <Footer />
    </motion.div>
  );
};

export default SingleProduct;
