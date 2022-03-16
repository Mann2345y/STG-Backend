import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 50px;
  height: 60px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageNumberBlock = styled.div`
  height: 40px;
  width: 40px;
  margin: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#ff4433" : "white")};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background: #ff4433;
  }
`;

const Paginate = ({ pages, page, keyword = "" }) => {
  const navigate = useNavigate();
  const blockClickHandler = (keyword, x) => {
    if (keyword) {
      navigate(`/products/${keyword}/page/${x + 1}`);
    } else {
      navigate(`/products/page/${x + 1}`);
    }
  };
  return (
    pages > 1 && (
      <Wrapper>
        {[...Array(pages).keys()].map((x) => {
          return (
            <PageNumberBlock
              key={x + 1}
              onClick={() => {
                blockClickHandler(keyword, x);
              }}
              active={x + 1 === page}
            >
              <p>{x + 1}</p>
            </PageNumberBlock>
          );
        })}
      </Wrapper>
    )
  );
};

export default Paginate;
