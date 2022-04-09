import React from "react";
import styled from "styled-components";

const Button = styled.button`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border: 2px solid #ff4433;
  background: white;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background: #ff4433;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Buttons = (props) => {
  return <Button onClick={props.clickHandler}>{props.children}</Button>;
};

export default Buttons;
