import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

function HomeNav() {
  const [openNav, setOpenNav] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navList = (
    <ul className="flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h5"
        className="p-1 font-normal text-white"
      >
        <Link to="/" className="flex items-center text-white" style={{textDecoration: 'none', fontSize: '1.1rem' }}>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h5"
        className="p-1 font-normal"
      >
        <Link to="/cart" className="flex items-center text-white" style={{textDecoration: 'none', fontSize: '1.1rem' }}>
          Cart
        </Link>
      </Typography>
    </ul>
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="section"]');
      const scrollY = window.scrollY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setActiveLink(section.id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar className="Navbar fixed top-0 left-0 z-20 w-full h-max max-w-full bg-black rounded-none px-4 py-1">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-16" />
        </Link>

        <div className="flex items-center gap-x-1">
          <div className="flex align-center mr-4 hidden lg:block text-center text-white rounded-none">{navList}</div>
          <Button className="rounded-none p-0 bg-transparent shadow-none flex items-center justify-center hidden lg:inline-block" style={{ padding: 0 }}>
            <a
              href="#sectionmenu"
              className="flex items-center justify-center w-full h-full"
              style={{
                padding: '16px 0px',
                fontSize: '1.1rem',
                fontWeight: '500',
                textDecoration: 'none',
                color: 'white',
                textTransform: 'capitalize',
              }}
            >
              Buy now
            </a>
          </Button>
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-red lg:hidden border-none"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="gradient" size="sm" color="amber" text="white" className="border-none">
            <span>
              <a href="#sectionmenu" className="text-decoration-none">Buy Now</a>
            </span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default HomeNav;
