import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import logo from "../../assets/logo.png";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer id="sectioncontact" className="bg-[#080a0e]">
      <div className="container px-4 sm:px-6 py-8 mx-auto overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <img className="w-auto h-20" src={logo} alt="logo" />
          <div className="flex flex-wrap justify-center items-center mt-6">
            <MdOutlinePhoneInTalk className="text-[green] mr-2" size={30} />
            <Typography
              variant="h4"
              color="black"
              className="text-[#f2f6facf]"
            >
              0556608314
            </Typography>
          </div>
        </div>
        <hr className="my-6 border-[#f2f6facf] md:my-10" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full">
          <p className="text-sm text-[#f2f6facf] text-center sm:text-left">
            © Copyright 2024. All Rights Reserved. Powered by Adroit 360.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
