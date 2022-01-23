import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
  height: 400px;
  width: 250px;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 15px;
  cursor: pointer;
  margin: 0 25px;
`;
const CardImage = styled.div`
  height: 300px;
  width: 250px;
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const CardTextSection = styled.div`
  height: 150px;
  width: 250px;
  padding: 15px;
  h4,
  h6 {
    margin-bottom: 10px;
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
