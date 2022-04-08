import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  height: fit-content;
  width: 85%;
  @media (max-width: 350px) {
    width: 95%;
  }
`;

const Container = (props) => {
  return (
    <Wrapper>
      <InnerWrapper>{props.children}</InnerWrapper>
    </Wrapper>
  );
};

export default Container;
