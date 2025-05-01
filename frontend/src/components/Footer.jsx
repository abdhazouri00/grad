import React from "react";
import assets from "../assets/assets";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 mt-20 border-t-2">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900"
        >
          <img src={assets.logo} className="h-32" />
        </a>
        <p className="my-6 text-gray-500 -400">
          A comprehensive solution for generating and organizing essential
          software development documents.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 ">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Products
            </a>
          </li>

          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center -400">
          © 2024-2025
          <span className="disco-hover ml-2 cursor-pointer">
            Abdullah Hazuri <span className="mx-2">·</span>Graduation Project
          </span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
