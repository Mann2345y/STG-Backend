import React, { useState } from "react";
import styled from "styled-components";
import { CgDetailsMore as Detail } from "react-icons/cg";
import { useDispatch } from "react-redux";
import Buttons from "../../../Reusables/Buttons";
import { cancelOrder } from "../../../Redux/actions/orderActions";

const Wrapper = styled.div`
  height: ${(props) => (props.toggle ? "300px" : "100px")};
  width: 95%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  padding: 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  overflow: hidden;
`;
const Header = styled.div`
  height: auto;
  width: auto;
`;
const AddressTabWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  h3 {
    margin-bottom: 8px;
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
  margin-left: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: #ff4433;
  }
`;
const DetailsWrapper = styled.div`
  width: 42%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  h4 {
    margin: 3px 0;
  }
`;

const HistoryTab = ({ item, short }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [toggle, setToggle] = useState(false);
  let totalQuantity = 0;
  item.cartItems.map((item) => {
    return (totalQuantity += item.quantity);
  });
  return (
    <Wrapper item={item} toggle={toggle}>
      <Header>
        <AddressTabWrapper>
          <div>
            <h3>Order Id: {item._id}</h3>
            <h4>Date Placed: {item.createdAt}</h4>
          </div>
          <RightBlock>
            <ButtonWrapper onClick={() => setToggle(!toggle)}>
              <Detail />
            </ButtonWrapper>
          </RightBlock>
        </AddressTabWrapper>
      </Header>
      <DetailsWrapper>
        <div>
          <h4>Total Order Amount</h4>
          <h4>Total No. of Products</h4>
          <h4>Delivery Status</h4>
          <h4>Payment Status</h4>
        </div>
        <div>
          <h4>$ {item.totalPrice}</h4>
          <h4>{totalQuantity}</h4>
          <h4>{item.isDelivered ? "Delivered" : "Not Delivered"}</h4>
          <h4>{item.isPaid ? "Paid" : "Not Paid"}</h4>
        </div>
      </DetailsWrapper>
      <Buttons clickHandler={() => dispatch(cancelOrder(user.id, item._id))}>
        <h4>Cancel Order</h4>
      </Buttons>
    </Wrapper>
  );
};

export default HistoryTab;
