import React from "react";
import styled from "styled-components";
import CartItems from "./CartItems/CartItems";
import AddressTab from "./AddressTab/AddressTab";
import Buttons from "../../Reusables/Buttons";
import { BsEmojiFrown as Icon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Reusables/Loader";

const Wrapper = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Seperator = styled.div`
  height: 95%;
  width: 2px;
  background: #d3d3d3;
`;
const ButtonsWrapper = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
`;
const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-top: 25px;
  }
`;
const NotFoundButtons = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const ItemsAddress = ({ placeorderHandler }) => {
  const { loading: cartLoading, cartItems } = useSelector(
    (state) => state.cart
  );
  const { loading: addressLoading } = useSelector((state) => state.addresses);
  const navigate = useNavigate();

  return (
    <>
      {cartLoading || addressLoading ? (
        <Wrapper>
          <Loader></Loader>
        </Wrapper>
      ) : cartItems.length > 0 ? (
        <>
          <Wrapper>
            <CartItems />
            <Seperator />
            <AddressTab />
          </Wrapper>
          <ButtonsWrapper>
            <Buttons clickHandler={() => navigate("/products/page/1")}>
              <h5>Add More Products</h5>
            </Buttons>
            <Buttons clickHandler={placeorderHandler}>
              <h5>Proceed</h5>
            </Buttons>
          </ButtonsWrapper>
        </>
      ) : cartItems.length <= 0 ? (
        <>
          <NotFoundWrapper>
            <Icon size={140} />
            <h2>No Products Found</h2>
            <NotFoundButtons>
              <Buttons clickHandler={() => navigate("/products/page/1")}>
                <h3>Browse Products</h3>
              </Buttons>
              <Buttons clickHandler={() => navigate("/")}>
                <h3>Go To Home</h3>
              </Buttons>
            </NotFoundButtons>
          </NotFoundWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ItemsAddress;
