import React from "react";
import styled from "styled-components";
import { FiMoreHorizontal as Detail } from "react-icons/fi";
import { FiTrash as Trash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeWishlist } from "../../../Redux/actions/wishlistActions";

const Wrapper = styled.div`
  height: 180px;
  width: 100%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 25px;
  @media (max-width: 768px) {
    height: 150px;
  }
  @media (max-width: 550px) {
  }
`;
const ContentWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin-bottom: 15px;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 1.2em;
    }
    p {
      font-size: 0.8em;
    }
  }
  @media (max-width: 550px) {
    h2 {
      font-size: 1em;
    }
    p {
      font-size: 0.7em;
    }
  }
`;
const Image = styled.div`
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  height: 150px;
  width: 100px;
  @media (max-width: 768px) {
    height: 120px;
    width: 80px;
  }
`;
const ButtonsDiv = styled.div`
  width: fit-content;
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
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
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin-left: 25px;
  margin-bottom: 0
  &:hover {
    background: #ff4433;
  }
  @media (max-width: 768px) {
    height: 30px;
    width: 40px;
    margin-left: 10px;
  }
  @media (max-width: 550px) {
    margin-bottom: 10px;
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
          <Image image={item.product.image} />
          <div style={{ marginLeft: "25px" }}>
            <h2>{item.product.name}</h2>
            <p>By: {item.product.brand}</p>
          </div>
        </div>
        <ButtonsDiv>
          <ButtonWrapper
            onClick={() => navigate(`/singleproduct/${item.product.id}`)}
          >
            <Detail size={window.innerWidth > 1080 ? 24 : 16} />
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              dispatch(removeWishlist(user.id, item.product.id));
            }}
          >
            <Trash size={window.innerWidth > 1080 ? 24 : 16} />
          </ButtonWrapper>
        </ButtonsDiv>
      </ContentWrapper>
    </Wrapper>
  );
};

export default WishlistTab;
