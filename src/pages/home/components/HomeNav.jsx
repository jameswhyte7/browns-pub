import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.jpg";

function HomeNav() {
  const [openNav, setOpenNav] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h5"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h5"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/cart" className="flex items-center">
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
    <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-opacity-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <img src={logo} alt="logo" className="h-20" />
          {/* <Typography
            variant="h4"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            CAFE KNK
          </Typography> */}
        </Link>

        <div className="mr-4 hidden lg:block">{navList}</div>

        <div className="flex items-center gap-x-1">
          <Button
            variant="gradient"
            color="amber"
            size="sm"
            className="hidden lg:inline-block"
          >
            <a href="#sectionmenu">Order Now</a>
          </Button>
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
          <Button fullWidth variant="gradient" size="sm" color="amber">
            <span>
              <a href="#sectionmenu">Order Now</a>
            </span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default HomeNav;
