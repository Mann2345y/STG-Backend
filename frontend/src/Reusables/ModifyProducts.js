import React, { useEffect } from "react";
import styled from "styled-components";
import InputBox from "./InputBox/InputBox";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductInCart,
  addProductInCurrentCart,
  removeProductFromCart,
  removeProductFromCurrentCart,
} from "../Redux/actions/groupcartActions";
import { CgTrash as Trash } from "react-icons/cg";
import { GrAdd } from "react-icons/gr";
import Buttons from "./Buttons";
import TabLayout from "./TabLayout";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const Header = styled.div`
  height: 80px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Content = styled.div`
  height: calc(100% - 180px);
  width: 95%;
  overflow-y: auto;
`;
const Tabs = styled.div`
  height: calc(100% - 40px);
  width: 100%;
  overflow-y: auto;
  padding-left: 10px;
`;
const Tab = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Image = styled.div`
  height: 95%;
  width: 80px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const TabText = styled.div`
  height: 45px;
  width: 70%;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  h3 {
    font-weight: 600;
  }
`;
const DeleteButton = styled.div`
  height: 50px;
  width: 80px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  cursor: pointer;
`;
const ProductSearch = styled.div`
  height: 80px;
  width: 95%;
  position: absolute;
  top: 85px;
  padding-top: 10px;
`;
const SearchWrapper = styled.div`
  height: 50px;
  width: 300px;
`;
const ResultsWrapper = styled.div`
  height: 160px;
  width: 50%;
  margin-top: 20px;
  overflow-y: auto;
  background: white;
  padding-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Results = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const AddButton = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d3d3d3;
  cursor: pointer;
`;

const ModifyProducts = ({ setModifyproduct, createcart }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState("");
  const [showresults, setShowresults] = useState(false);
  const { products } = useSelector((state) => state.allProducts);
  const { products: productsFromCreateCart } = useSelector(
    (state) => state.groupcart.newCartState
  );
  const { _id: cartid, products: productsFromCurrentCart } = useSelector(
    (state) => state.groupcart.currentUserCart
  );
  useEffect(() => {
    if (search.length > 0) {
      setResults(
        products.filter((item) => {
          return item.name.includes(search);
        })
      );
      setShowresults(true);
    } else {
      setResults([]);
      setShowresults(true);
    }
  }, [search, products]);
  const addProductInNewCartHandler = (id) => {
    dispatch(addProductInCurrentCart(id));
    setShowresults(false);
    setSearch("");
  };
  const addProductInCurrentCartHandler = (cartid, productid) => {
    dispatch(addProductInCart(cartid, productid));
    setShowresults(false);
    setSearch("");
  };
  return (
    <Wrapper>
      <Header>
        <h2>Edit Products : </h2>
        <Buttons clickHandler={() => setModifyproduct(false)}>
          <h4>Go Back</h4>
        </Buttons>
      </Header>
      <Content>
        <ProductSearch>
          <SearchWrapper>
            <InputBox
              state={search}
              changeHandler={setSearch}
              placeholder="Search for the Products"
            />
          </SearchWrapper>
          {results.length > 0 && showresults && (
            <ResultsWrapper>
              {results.map((item, index) => {
                return (
                  <TabLayout key={index}>
                    <Results>
                      <Image image={item.image}></Image>
                      <TabText>
                        <h3>{item.name}</h3>
                      </TabText>
                      {createcart ? (
                        <AddButton
                          onClick={() => addProductInNewCartHandler(item._id)}
                        >
                          <GrAdd />
                        </AddButton>
                      ) : (
                        <AddButton
                          onClick={() =>
                            addProductInCurrentCartHandler(cartid, item._id)
                          }
                        >
                          <GrAdd />
                        </AddButton>
                      )}
                    </Results>
                  </TabLayout>
                );
              })}
            </ResultsWrapper>
          )}
        </ProductSearch>

        {createcart && productsFromCreateCart.length > 0 ? (
          <>
            <Tabs>
              {productsFromCreateCart.map((item, index) => {
                return (
                  <TabLayout key={index}>
                    <Tab>
                      <Image image={item.image}></Image>
                      <TabText>
                        <h2>{item.name}</h2>
                        <h5>By :- {item.brand}</h5>
                      </TabText>
                    </Tab>
                    <DeleteButton
                      onClick={() =>
                        dispatch(removeProductFromCurrentCart(item.id))
                      }
                    >
                      <Trash size={28} />
                    </DeleteButton>
                  </TabLayout>
                );
              })}
            </Tabs>
          </>
        ) : !createcart && productsFromCurrentCart.length > 0 ? (
          <Tabs>
            {productsFromCurrentCart.map((item, index) => {
              return (
                <TabLayout key={index}>
                  <Tab>
                    <Image image={item.image}></Image>
                    <TabText>
                      <h2>{item.name}</h2>
                      <h5>By :- {item.brand}</h5>
                    </TabText>
                  </Tab>
                  <DeleteButton
                    onClick={() =>
                      dispatch(removeProductFromCart(cartid, item.id))
                    }
                  >
                    <Trash size={28} />
                  </DeleteButton>
                </TabLayout>
              );
            })}
          </Tabs>
        ) : (
          <></>
        )}
      </Content>
    </Wrapper>
  );
};

export default ModifyProducts;
