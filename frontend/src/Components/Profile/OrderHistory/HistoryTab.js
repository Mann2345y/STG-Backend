import React, { useState } from "react";
import styled from "styled-components";
import { CgDetailsMore as Detail } from "react-icons/cg";
import { useDispatch } from "react-redux";
import Buttons from "../../../Reusables/Buttons";
import { cancelOrder } from "../../../Redux/actions/orderActions";

const Wrapper = styled.div`
  height: ${(props) => (props.toggle ? "350px" : "100px")};
  width: 100%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  padding: 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  overflow: hidden;
  @media (max-width: 415px) {
    padding: 10px;
  }
  @media (max-width: 415px) {
    height: ${(props) => (props.toggle ? "330px" : "80px")};
  }
`;
const Header = styled.div`
  height: auto;
  width: auto;
`;
const OrderHeader = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 12px;
  }
  @media (max-width: 415px) {
    h2 {
      font-size: 1em;
    }
    h5 {
      font-size: 0.7em;
    }
  }
`;
const RightBlock = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: #ff4433;
  }
`;
const DetailsWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  h4 {
    margin: 3px 0;
  }
`;
const TextWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryTab = ({ item, short }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const date = new Date(item.createdAt);
  const itemid = item._id.slice(item._id.length - 6);
  const [toggle, setToggle] = useState(false);
  let totalQuantity = 0;
  item.cartItems.map((item) => {
    return (totalQuantity += item.quantity);
  });
  return (
    <Wrapper item={item} toggle={toggle}>
      <Header>
        <OrderHeader>
          <div>
            <h2>Order Id: {itemid}</h2>
            <h5>Date Placed: {date.toDateString()}</h5>
          </div>
          <RightBlock>
            <ButtonWrapper onClick={() => setToggle(!toggle)}>
              <Detail />
            </ButtonWrapper>
          </RightBlock>
        </OrderHeader>
      </Header>
      <DetailsWrapper>
        <>
          <TextWrapper>
            <h5>Order Amount</h5>
            <h5>$ {item.totalPrice}</h5>
          </TextWrapper>
          <TextWrapper>
            <h5>Products</h5>
            <h5>{totalQuantity}</h5>
          </TextWrapper>
          <TextWrapper>
            <h5>Delivery Status</h5>
            <h5>{item.isDelivered ? "Delivered" : "Not Delivered"}</h5>
          </TextWrapper>
          <TextWrapper>
            <h5>Payment Status</h5>
            <h5>{item.isPaid ? "Paid" : "Not Paid"}</h5>
          </TextWrapper>
        </>
        <div></div>
      </DetailsWrapper>
      <Buttons clickHandler={() => dispatch(cancelOrder(user.id, item._id))}>
        <h4>Cancel Order</h4>
      </Buttons>
    </Wrapper>
  );
};

export default HistoryTab;
