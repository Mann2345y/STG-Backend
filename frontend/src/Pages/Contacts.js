import React from "react";
import styled from "styled-components";
import Container from "../Reusables/Container";
import NavBar from "../Reusables/NavBar/NavBar";
import Footer from "../Reusables/Footer/Footer";
import Buttons from "../Reusables/Buttons";

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
  letter-spacing: 2px;
  h2 {
    font-family: "Poiret One", sans-serif;
    color: white;
    font-size: 3em;
  }
`;
const ContentBlock = styled.div`
  height: 800px;
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
const LeftBlock = styled.div`
  height: 100%;
  width: 35%;
  h1 {
    letter-spacing: 2px;
    margin-bottom: 30px;
    font-family: "Poiret One", sans-serif;
    font-size: 3em;
  }
  p {
    font-size: 1.5em;
  }
`;
const RightBlock = styled.div`
  height: 100%;
  width: 35%;
`;
const Seperator = styled.div`
  height: 100%;
  width: 2px;
  background: #d3d3d3;
`;
const FormWrapper = styled.div`
  margin-left: 150px;
`;
const FormBlock = styled.div`
  margin-bottom: 30px;
`;
const FormInput = styled.input`
  height: 50px;
  width: 350px;
  margin: 10px 0;
  background: white;
  border: 2px solid #ff4433;
  padding: 0 20px;
  font-size: 1.2em;
  transition: all 0.2s ease-in;
  &:focus {
    box-shadow: 0 0 8px #ff4433;
  }
`;
const FormTextarea = styled.textarea`
  height: 120px;
  width: 350px;
  border: 2px solid #ff4433;
  margin-top: 15px;
  padding: 10px;
  font-size: 1.4em;
  transition: all 0.2s ease-in;
  &:focus {
    outline: none;
    box-shadow: 0 0 8px #ff4433;
  }
`;
const Contacts = () => {
  return (
    <>
      <NavBar />
      <HeadBanner>
        <BannerInnerWrapper>
          <h2>Contacts</h2>
        </BannerInnerWrapper>
      </HeadBanner>
      <Container>
        <ContentBlock>
          <LeftBlock>
            <h1>Connect With Us</h1>
            <p>
              Share your feedback, we will <br /> love to hear from you !
            </p>
          </LeftBlock>
          <Seperator />
          <RightBlock>
            <FormWrapper>
              <FormBlock>
                <h4>Your Name</h4>
                <FormInput />
              </FormBlock>
              <FormBlock>
                <h4>Phone Number</h4>
                <FormInput />
              </FormBlock>
              <FormBlock>
                <h4>Email Id:</h4>
                <FormInput />
              </FormBlock>
              <FormBlock>
                <h4>Your Feedback</h4>
                <FormTextarea />
              </FormBlock>
              <Buttons>
                <h3>Submit</h3>
              </Buttons>
            </FormWrapper>
          </RightBlock>
        </ContentBlock>
      </Container>
      <Footer />
    </>
  );
};

export default Contacts;
