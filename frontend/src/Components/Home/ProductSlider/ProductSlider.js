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
  @media (max-width: 768px) {
    h1 {
      font-size: 1.5em;
    }
    h2 {
      font-size: 1em;
    }
  }
  @media (max-width: 420px) {
    h1 {
      font-size: 1em;
    }
    h2 {
      font-size: 0.7em;
    }
  }
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
        <Buttons clickHandler={() => navigate("/products/page/1")}>
          <h2>View All</h2>
        </Buttons>
      </Header>
      <Slider />
    </Container>
  );
};

export default ProductSlider;
