import React from "react";
import { motion } from "framer-motion";
import NavBar from "../Reusables/NavBar/NavBar";
import Container from "../Reusables/Container";
import Footer from "../Reusables/Footer/Footer";
import CartItems from "../Components/Cart/CartItems/CartItems";

const Cart = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBar />
      <Container>
        <CartItems />
      </Container>
      <Footer />
    </motion.div>
  );
};

export default Cart;
