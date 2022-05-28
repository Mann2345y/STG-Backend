import React, { useState } from "react";
import styled from "styled-components";
import Container from "../Container";
import UpperNav from "./UpperNav/UpperNav";
import LowerNav from "./LowerNav/LowerNav";
import MobileNav from "./MobileNav/MobileNav";

const Wrapper = styled.div`
  height: 150px;
  width: 100%;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  @media (max-width: 768px) {
    height: 100px;
  }
`;

const NavBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openmenu, setOpenmenu] = useState(false);
  const toggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  const closeSearch = () => {
    setOpenSearch(false);
  };
  const openMenuHandler = () => {
    setOpenmenu(true);
  };
  const closeMenuHandler = () => {
    setOpenmenu(false);
    console.log(openmenu);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <UpperNav
            toggleSearch={toggleSearch}
            openMenuHandler={openMenuHandler}
          />
        </Container>
        <LowerNav openSearch={openSearch} closeSearch={closeSearch} />
        <MobileNav
          openmenu={openmenu}
          closeMenuHandler={closeMenuHandler}
          openMenuHandler={openMenuHandler}
        />
      </Wrapper>
    </>
  );
};

export default NavBar;
