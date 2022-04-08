import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../Reusables/NavBar/NavBar";
import Container from "../Reusables/Container";
import LeftBlock from "../Components/LoginSignup/LeftBlock/LeftBlock";
import Footer from "../Reusables/Footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../Components/LoginSignup/Login/Login";
import SignUp from "../Components/LoginSignup/Signup/Signup";
import { useSelector } from "react-redux";

const Wrapper = styled(motion.div)`
  height: 600px;
  width: 100%;
  margin-top: 100px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  position: relative;
  @media (max-width: 768px) {
    margin: 50px auto;
    flex-direction: column;
  }
`;
const LoginSignup = ({ setShowModal }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  useEffect(() => {
    setOpenLogin(true);
  }, []);
  const showLoginHandler = () => {
    setOpenLogin(true);
    setOpenSignup(false);
  };
  const showSignupHandler = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NavBar />
        <Container>
          <Wrapper>
            <LeftBlock
              loginHandler={showLoginHandler}
              signupHandler={showSignupHandler}
              openLogin={openLogin}
              openSignup={openSignup}
            />
            <div style={{ position: "relative", width: "100%" }}>
              <AnimatePresence>
                {openLogin && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Login setShowModal={setShowModal} />
                  </motion.div>
                )}
                {openSignup && (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <SignUp />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Wrapper>
        </Container>
        <Footer />
      </motion.div>
    </>
  );
};

export default LoginSignup;
