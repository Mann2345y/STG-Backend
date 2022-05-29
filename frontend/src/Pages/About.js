import React from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { FaOpencart } from "react-icons/fa";
import { GiHanger } from "react-icons/gi";
import NavBar from "../Reusables/NavBar/NavBar";
import Footer from "../Reusables/Footer/Footer";

const HeadBanner = styled.div`
  height: 250px;
  width: 100%;
  background: url("/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;
const BannerInnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  h2 {
    font-family: "Poiret One", sans-serif;
    color: white;
    font-size: 3em;
  }
`;
const ContentBlock = styled.div`
  height: 700px;
  width: 100%;
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Description = styled.div`
  width: 400px;
  h1 {
    margin-bottom: 50px;
    font-family: "Poiret One", sans-serif;
    font-size: 3.2em;
  }
  p {
    font-family: "Roboto Slab", sans-serif;
    font-size: 1.2em;
    word-spacing: 2px;
  }
`;
const Image = styled.div`
  height: 100%;
  width: 500px;
  background: url("/images/about1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const FeatureBlock = styled.div`
  height: 500px;
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Feature = styled.div`
  width: 200px;
`;
const FeatureIconOuterWrapper = styled.div`
  height: 200px;
  width: 200px;
  border: 2px solid black;
  position: relative;
  &:before {
    content: "";
    height: 120px;
    width: 205px;
    background: white;
    position: absolute;
    top: -5px;
    left: -4px;
  }
`;
const FeatureIconInnerWrapper = styled.div`
  height: 200px;
  width: 170px;
  border: 3px solid #ff4433;
  position: relative;
  top: 20px;
  left: 14px;
  z-index: 2;
  &:before {
    content: "";
    height: 120px;
    width: 175px;
    background: white;
    position: absolute;
    top: -5px;
    left: -4px;
    z-index: 4;
  }
`;
const FeatureText = styled.div`
  margin-top: 30px;
  text-align: center;
  h2 {
    font-family: "Poiret One", sans-serif;
    margin-top: 40px;
    margin-bottom: 15px;
  }
`;
const About = () => {
  return (
    <>
      <NavBar />
      <HeadBanner>
        <BannerInnerWrapper>
          <h2>About Us...</h2>
        </BannerInnerWrapper>
      </HeadBanner>
      <ContentBlock>
        <Description>
          <h1>Who are we ?</h1>
          <p>
            "Shop on the Go", is a one stop e-commerce solution for small
            businesses, which feature interactive user Interface and comes with
            "Group Cart" and "Virtual Try-On", which enhances user experience
            and their buying experience. Its Build on MERN stack and using flask
            with python.
          </p>
        </Description>
        <Image></Image>
      </ContentBlock>
      <FeatureBlock>
        <Feature>
          <FeatureIconOuterWrapper>
            <FeatureIconInnerWrapper>
              <FiUser
                style={{
                  zIndex: "5",
                  position: "absolute",
                  top: "50%",
                  left: "35%",
                }}
                size={49}
              />
            </FeatureIconInnerWrapper>
          </FeatureIconOuterWrapper>
          <FeatureText>
            <h2>Good UI</h2>
            <p>A very clean, minimal and robust UI.</p>
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureIconOuterWrapper>
            <FeatureIconInnerWrapper>
              <FaOpencart
                style={{
                  zIndex: "5",
                  position: "absolute",
                  top: "50%",
                  left: "35%",
                }}
                size={49}
              />
            </FeatureIconInnerWrapper>
          </FeatureIconOuterWrapper>
          <FeatureText>
            <h2>Group Cart</h2>
            <p>Share your carts among your peers, in the blink of an eye</p>
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureIconOuterWrapper>
            <FeatureIconInnerWrapper>
              <GiHanger
                style={{
                  zIndex: "5",
                  position: "absolute",
                  top: "50%",
                  left: "35%",
                }}
                size={49}
              />
            </FeatureIconInnerWrapper>
          </FeatureIconOuterWrapper>
          <FeatureText>
            <h2>Virtual Try - On</h2>
            <p>Try a product on multiple models, to judge it better.</p>
          </FeatureText>
        </Feature>
      </FeatureBlock>
      <Footer />
    </>
  );
};

export default About;
