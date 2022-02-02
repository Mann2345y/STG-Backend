import React from "react";
import styled from "styled-components";
import WishlistTab from "./WishlistTab";
import { useSelector } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";

const Wrapper = styled.div`
  height: 90%;
  width: 100%;
  padding: 25px;
  overflow-y: auto;
`;

const OrderHistory = () => {
  const { loading, error, wishlist } = useSelector((state) => state.wishlist);
  return (
    <>
      {loading ? (
        <Wrapper>
          <Loader></Loader>
        </Wrapper>
      ) : error ? (
        <Wrapper>
          <Message>{error.message}</Message>
        </Wrapper>
      ) : wishlist.length > 0 ? (
        <>
          <h2>Wishlisted Products</h2>
          <Wrapper>
            {wishlist.map((item, index) => {
              return <WishlistTab item={item} key={index} />;
            })}
          </Wrapper>
        </>
      ) : (
        <Wrapper>
          <h3>No Wishlisted Items</h3>
        </Wrapper>
      )}
    </>
  );
};

export default OrderHistory;
