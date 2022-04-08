import React from "react";
import Card from "../../../Reusables/Card";
import Paginate from "../../../Reusables/Paginate";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { getAllProducts } from "../../../Redux/actions/productsActions";
import { useParams } from "react-router";
import Loader from "../../../Reusables/Loader";
import Message from "../../../Reusables/Message";

const Wrapper = styled.div`
  height: fit-content;
  width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  @media (max-width: 1071px) {
    width: 100%;
  }
`;

const GalleryWrapper = styled.div`
  height: fit-content;
  width: 100%;
  padding-left: 50px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 430px;
  div {
    justify-self: end;
  }
  @media (max-width: 1071px) {
    padding-left: 0;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    div {
      justify-self: center;
    }
  }
  @media (max-width: 730px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const SecondWrapper = styled.div`
  height: 600px;
  width: calc(100% - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1070px) {
    width: 100%;
  }
`;

const RightBlock = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams();
  useEffect(() => {
    dispatch(getAllProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  const { loading, error, products, pages, page } = useSelector(
    (state) => state.allProducts
  );
  return (
    <>
      {loading ? (
        <SecondWrapper>
          <Loader></Loader>
        </SecondWrapper>
      ) : error ? (
        <SecondWrapper>
          <Message>{error.message}</Message>
        </SecondWrapper>
      ) : products.length > 0 ? (
        <Wrapper>
          <GalleryWrapper>
            {products.map((product, index) => {
              return <Card product={product} key={index} />;
            })}
          </GalleryWrapper>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </Wrapper>
      ) : (
        <SecondWrapper>
          <h3>No Products Found</h3>
        </SecondWrapper>
      )}
    </>
  );
};

export default RightBlock;
