import React from "react";
import Container from "../../../Reusables/Container";
import Buttons from "../../../Reusables/Buttons";
import Slider from "../../../Reusables/Slider/Slider";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
`;

const ProductSlider = () => {
  return (
    <Container>
      <Header>
        <h1>Latest Products</h1>
        <Buttons>
          <h2>View All</h2>
        </Buttons>
      </Header>
      <Slider />
    </Container>
  );
};

export default ProductSlider;
