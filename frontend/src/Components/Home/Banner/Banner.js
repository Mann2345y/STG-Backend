import React from 'react';
import styled from 'styled-components';
import Container from '../../../Reusables/Container';
import image from './Banner.jpg';
import Buttons from '../../../Reusables/Buttons'

const BannerImage = styled.div`
  height: 800px;
  width: 100%;
  background: url(${image});
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 250px;
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 4em;
    margin-bottom: 25px;
  }
`;

const Banner = () => {
  return (
    <Container>
      <BannerImage>
        <h1>Let the <br /> Style Craze Begin</h1>
        <Buttons><h2>Browse Products</h2></Buttons>
      </BannerImage>
    </Container>
  );
};

export default Banner;
