import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: fit-content;
  width: 95%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const TabLayout = ({ children, clickHandler }) => {
  return <Wrapper onClick={clickHandler}>{children}</Wrapper>;
};

export default TabLayout;
