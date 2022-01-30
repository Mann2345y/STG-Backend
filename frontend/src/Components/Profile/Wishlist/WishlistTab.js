import React, { useState } from "react";
import styled from "styled-components";
import { CgDetailsMore as Detail } from "react-icons/cg";
import { FiTrash as Trash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeWishlist } from "../../../Redux/actions/wishlistActions";

const Wrapper = styled.div`
  height: 180px;
  width: 95%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;
const ContentWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin-bottom: 8px;
  }
`;
const ButtonWrapper = styled.div`
  height: 40px;
  width: 60px;
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

const WishlistTab = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <Wrapper item={item}>
      <ContentWrapper>
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: `url(${item.product.image})`,
              backgroundSize: "contain",
              height: "150px",
              width: "100px",
            }}
          />
          <div style={{ marginLeft: "25px" }}>
            <h2 style={{ marginBottom: "10px" }}>{item.product.name}</h2>
            <p>By: {item.product.brand}</p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <ButtonWrapper
            onClick={() => navigate(`/singleproduct/${item.product.id}`)}
          >
            <Detail size={24} />
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              dispatch(removeWishlist(user.id, item.product.id));
            }}
          >
            <Trash size={24} />
          </ButtonWrapper>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default WishlistTab;
