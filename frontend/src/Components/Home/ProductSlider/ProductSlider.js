import React from "react";
import Container from "../../../Reusables/Container";
import Buttons from "../../../Reusables/Buttons";
import Slider from "../../../Reusables/Slider/Slider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../../Redux/actions/productsActions";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
`;

const ProductSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Container>
      <Header>
        <h1>Latest Products</h1>
        <Buttons clickHandler={() => navigate("/products")}>
          <h2>View All</h2>
        </Buttons>
      </Header>
      <Slider />
    </Container>
  );
};

export default ProductSlider;
