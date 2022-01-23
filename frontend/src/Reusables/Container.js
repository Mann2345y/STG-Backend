import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
`;

const InnerWrapper = styled.div`
  height: fit-content;
  width: 80%;
  margin: auto;
`;

const Container = (props) => {
  return (
    <Wrapper>
      <InnerWrapper>{props.children}</InnerWrapper>
    </Wrapper>
  );
};

export default Container;
