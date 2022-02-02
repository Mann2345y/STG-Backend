import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageNumberBlock = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background: ${(props) => (props.active ? "#ff4433" : "white")};
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
              {x + 1}
            </PageNumberBlock>
          );
        })}
      </Wrapper>
    )
  );
};

export default Paginate;
