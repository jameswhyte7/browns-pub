import React from "react";
import logo from "../../assets/logo.png";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="bg-black dark:bg-gray-900">
      <div className="container px-4 sm:px-6 py-8 mx-auto overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <img className="w-auto h-20" src={logo} alt="logo" />
          <div className="flex flex-wrap justify-center mt-6 -mx-2 sm:-mx-4">
            <Typography
              variant="h4"
              color="black"
              className="mx-2 sm:mx-4 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Contact us on: 0556608314
            </Typography>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full">
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center sm:text-left">
            © Copyright 2024. All Rights Reserved. Powered by Adroit 360.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
