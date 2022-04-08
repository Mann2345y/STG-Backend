import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
  height: 400px;
  width: 250px;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 15px;
  cursor: pointer;
  @media (max-width: 1080px) {
    height: 350px;
    width: 200px;
  }
  @media (max-width: 730px) {
    width: 150px;
  }
`;
const CardImage = styled.div`
  height: 300px;
  width: 250px;
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  @media (max-width: 1080px) {
    height: 250px;
    width: 200px;
  }
  @media (max-width: 730px) {
    width: 150px;
  }
`;
const CardTextSection = styled.div`
  height: fit-content;
  width: 250px;
  padding: 15px;
  h4,
  h6 {
    margin-bottom: 10px;
  }
  @media (max-width: 1080px) {
    height: 100px;
    width: 200px;
    h4,
    h6 {
      margin-bottom: 6px;
    }
  }
  @media (max-width: 730px) {
    width: 150px;
  }
`;
const RatingPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = ({ product }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/singleproduct/${product._id}`);
  };
  return (
    <>
      <CardWrapper onClick={clickHandler}>
        <CardImage img={product.image} />
        <CardTextSection>
          <h4>{product.name}</h4>
          <h6>{product.brand}</h6>
          <RatingPriceWrapper>
            <h6>{product.rating}</h6>
            <h6>$ {product.price}</h6>
          </RatingPriceWrapper>
        </CardTextSection>
      </CardWrapper>
    </>
  );
};

export default Card;
