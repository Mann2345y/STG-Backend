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
  const [openSearch, setOpenSearch] = useState(false);
  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  const closeSearch = () => {
    setOpenSearch(false);
  };

  return (
    <Wrapper>
      <Container>
        <UpperNav toggleSearch={toggleSearch} />
      </Container>
      <LowerNav openSearch={openSearch} closeSearch={closeSearch} />
    </Wrapper>
  );
};

export default NavBar;
