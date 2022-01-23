import React from "react";
import Card from "../../../Reusables/Card";
import { useSelector } from "react-redux";
import styled from "styled-components";

const GalleryWrapper = styled.div`
  height: fit-content;
  width: calc(100% - 250px);
  padding-left: 50px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 430px;
  a {
    justify-self: end;
  }
`;

const RightBlock = () => {
  const { products } = useSelector((state) => state.allProducts);
  return (
    <GalleryWrapper>
      {products.map((product, index) => {
        return <Card product={product} key={index} />;
      })}
    </GalleryWrapper>
  );
};

export default RightBlock;
