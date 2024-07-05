import React from "react";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import HomeNav from "./components/HomeNav";
import Footer from "./Footer";
import './components/Main.css';

function Home({ active }) {
  return (
    <div className="home-container">
      <HomeNav />
      <Banner />
      <div className="menu-background"></div>
      <Menu active={active} />
      <Footer />
    </div>
  );
}

export default Home;
  