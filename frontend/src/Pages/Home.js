import React from 'react';
import NavBar from '../Reusables/NavBar/NavBar';
import Banner from '../Components/Home/Banner/Banner';
import ProductSlider from '../Components/Home/ProductSlider/ProductSlider';
import Features from '../Components/Home/Features/Features'
import Footer from '../Reusables/Footer/Footer';
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <NavBar />
      <Banner />
      <ProductSlider />
      <Features />
      <Footer />
    </motion.div>
  );
};

export default Home;
