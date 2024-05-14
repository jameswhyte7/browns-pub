import React from "react";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import HomeNav from "./components/HomeNav";
import Footer from "./Footer";

function Home({ active }) {
  return (
    <>
      <HomeNav />
      <Banner />
      <Menu active={active} />

      <Footer />
    </>
  );
}

export default Home;
