import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import assets from "../assets/assets.js";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between sm:justify-evenly pb-5 font-medium">
        <div className="flex flex-row gap-1 items-center">
          <Link to="/">
            <img src={assets.logo} className="w-32" />
          </Link>

          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>HOME</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/generate" className="flex flex-col items-center gap-1">
              <p>GENERATE</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/products"
              className="flex flex-col items-center gap-1"
            >
              <p>PRODUCTS</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/resources"
              className="flex flex-col items-center gap-1"
            >
              <p>RESOURCES</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/pricing" className="flex flex-col items-center gap-1">
              <p>PRICING</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>CONTACT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </ul>
        </div>

        <div className="flex items-center gap-6 sm:hidden">
          <img
            src={assets.menu_icon}
            onClick={() => setVisible(true)}
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-transform duration-300 ${
            visible ? "translate-x-0 w-full" : "translate-x-full w-0 hidden"
          }`}
        >
          <div className="flex flex-col text-gray-500 text-left pt-2">
            <ul>
              <li className="flex flex-row align-middle items-center gap-3 pl-4">
                <img
                  onClick={() => setVisible(false)}
                  src={assets.dropdown}
                  className="h-4 rotate-180"
                />
                <p>Back</p>
              </li>
              <hr className="w-100 pl-0 mt-2" />
              <NavLink to="/">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>HOME</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
              <NavLink to="/collection">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>COLLECTION</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
              <NavLink to="/about">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>ABOUT</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
              <NavLink to="/contact">
                <div
                  onClick={() => setVisible(false)}
                  className="items-center pl-4 py-4"
                >
                  <p>CONTACT</p>
                </div>
              </NavLink>
              <hr className="w-100 pl-0 " />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
