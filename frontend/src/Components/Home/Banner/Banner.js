import React from "react";
import styled from "styled-components";
import Container from "../../../Reusables/Container";
import image from "./Banner.jpg";
import Buttons from "../../../Reusables/Buttons";

const BannerImage = styled.div`
  height: 800px;
  width: 100%;
  background: url(${image});
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 250px;
  h1 {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 4em;
    margin-bottom: 25px;
  }
  @media (max-width: 1280px) {
    height: 600px;
    padding-top: 150px;
    h1 {
      font-size: 2.5em;
    }
    h2 {
      font-size: 1em;
    }
  }
  @media (max-width: 968px) {
    height: 500px;
    h1 {
      font-size: 2em;
    }
  }
  @media (max-width: 792px) {
    height: 400px;
    padding-top: 100px;
  }
  @media (max-width: 640px) {
    height: 300px;
    padding-top: 50px;
    h1 {
      font-size: 1em;
    }
    h2 {
      font-size: 0.8em;
    }
  }
  @media (max-width: 475px) {
    height: 250px;
  }
`;

const Banner = () => {
  return (
    <Container>
      <BannerImage>
        <h1>
          Let the <br /> Style Craze Begin
        </h1>
        <Buttons>
          <h2>Browse Products</h2>
        </Buttons>
      </BannerImage>
    </Container>
  );
};

export default Banner;
