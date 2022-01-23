import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  AiOutlineUser as User,
  AiOutlineShoppingCart as Cart,
} from "react-icons/ai";
import { BsSuitHeartFill as Wishlist } from "react-icons/bs";
import { FaAddressCard as Address } from "react-icons/fa";
import { FiLogOut as Logout } from "react-icons/fi";
import { CgShoppingBag as OrderHistory } from "react-icons/cg";

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  position: absolute;
  top: 25px;
  left: 25px;
  background: white;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: all 0.2s ease-in;
`;
const TabsWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const Tab = styled.div`
  height: 100px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
`;

const Tabs = ({ show, profileHandler, addressHandler }) => {
  const user = useSelector((state) => state.loggedUser);
  return (
    <Wrapper open={show}>
      <div style={{ margin: "25px" }}>
        <h1>Welcome! {user.name}</h1>
      </div>
      <TabsWrapper>
        <Tab onClick={profileHandler}>
          <User size={35} />
          <h3 style={{ marginLeft: "20px" }}>Edit Profile</h3>
        </Tab>
        <Tab onClick={addressHandler}>
          <Address size={35} />
          <h3 style={{ marginLeft: "20px" }}>Saved Addresses</h3>
        </Tab>
        <Tab>
          <OrderHistory size={35} />
          <h3 style={{ marginLeft: "20px" }}>Order History</h3>
        </Tab>
        <Tab>
          <Wishlist size={35} />
          <h3 style={{ marginLeft: "20px" }}>Wish List</h3>
        </Tab>
        <Tab>
          <Cart size={35} />
          <h3 style={{ marginLeft: "20px" }}>Group Cart</h3>
        </Tab>
        <Tab>
          <Logout size={35} />
          <h3 style={{ marginLeft: "20px" }}>Log Out</h3>
        </Tab>
      </TabsWrapper>
    </Wrapper>
  );
};

export default Tabs;
