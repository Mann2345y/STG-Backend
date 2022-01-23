import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../Reusables/NavBar/NavBar";
import LeftBlock from "../Components/LoginSignup/LeftBlock/LeftBlock";
import Footer from "../Reusables/Footer/Footer";
import { motion } from "framer-motion";
import Login from "../Components/LoginSignup/Login/Login";
import SignUp from "../Components/LoginSignup/Signup/Signup";

const Wrapper = styled(motion.div)`
  height: 600px;
  width: 75%;
  margin: 100px auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  position: relative;
`;
const LoginSignup = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <Wrapper>
        <LeftBlock
          loginHandler={showLoginHandler}
          signupHandler={showSignupHandler}
          openLogin={openLogin}
          openSignup={openSignup}
        />
        <Login open={openLogin} />
        <SignUp open={openSignup} />
      </Wrapper>
      <Footer />
    </motion.div>
  );
};

export default LoginSignup;
