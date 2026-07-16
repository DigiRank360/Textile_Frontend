import React from 'react';
import Hero from '../components/Hero/Hero';
import ShopByCategory from '../components/ShopByCategory/ShopByCategory';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import BrandStory from '../components/BrandStory/BrandStory';
// import MostLovedRituals from '../components/MostLovedRituals/MostLovedRituals';
import SacredProcess from '../components/SacredProcess/SacredProcess';
import Newsletter from '../components/Newsletter/Newsletter';
// import Enquiries from '../components/EnquiryForm/EnquiryForm';
function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <BrandStory />
      {/* <MostLovedRituals /> */}
      <SacredProcess />
      {/* <Newsletter /> */}
      {/* <Enquiries /> */}
    </>
  );
}

export default Home;
