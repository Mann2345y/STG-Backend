import React from "react";
import styled from "styled-components";
import WishlistTab from "./WishlistTab";
import { useSelector } from "react-redux";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";
import Buttons from "../../../Reusables/Buttons";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  height: 550px;
  width: 100%;
  padding: 10px 25px 10px 10px;
  overflow-y: auto;
  @media (max-width: 1080px) {
    height: fit-content;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Wishlist = () => {
  const { loading, error, wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
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
      ) : wishlist && wishlist.length > 0 ? (
        <div style={window.innerWidth < 1080 ? { marginTop: "25px" } : {}}>
          <Header>
            <h2>Wishlist</h2>
            {window.innerWidth < 1080 && (
              <Buttons clickHandler={() => navigate("/profile")}>
                <h5>Back</h5>
              </Buttons>
            )}
          </Header>
          <Wrapper>
            {wishlist.map((item, index) => {
              return <WishlistTab item={item} key={index} />;
            })}
          </Wrapper>
        </div>
      ) : (
        <Wrapper>
          <h3>No Wishlisted Items</h3>
        </Wrapper>
      )}
    </>
  );
};

export default Wishlist;
