import React, { useState } from "react";
import styled from "styled-components";
import Container from "../Container";
import UpperNav from "./UpperNav/UpperNav";
import LowerNav from "./LowerNav/LowerNav";

const Wrapper = styled.div`
  height: 150px;
  width: 100%;
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
`;

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const closeOpen = () => {
    setOpen(false);
  };
  return (
    <Wrapper>
      <Container>
        <UpperNav toggleOpen={toggleOpen} />
      </Container>
      <LowerNav open={open} closeOpen={closeOpen} />
    </Wrapper>
  );
};

export default NavBar;
