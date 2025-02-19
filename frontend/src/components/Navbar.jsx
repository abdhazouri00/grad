import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import assets from "../assets/assets.js";
import profile from "../assets/profile_icon.png";
import { Context } from "../context/context.jsx";
import axios from "axios";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition
} from "@headlessui/react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({});

  const { token, setToken, setId, id, backendUrl } = useContext(Context);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("id");
    setId("");
    navigate("/login");
  };

  const getInfo = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/${id}`);
      console.log(response.data);
      setInfo(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    const storedInfo = localStorage.getItem("userInfo");
    if (storedInfo) {
      setInfo(JSON.parse(storedInfo)); 
    }
    if (token && id) {
      getInfo(); 
    }
  }, [token, id]);

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
            <NavLink
              to="/generate"
              className="flex flex-col items-center gap-1"
            >
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
            <NavLink to="/pricing" className="flex flex-col items-center gap-1">
              <p>PRICING</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>CONTACT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <div className="flex items-center gap-6">
              <div className="group relative">
                <img
                  onClick={() => (token ? null : navigate("/login"))}
                  src={profile}
                  className="w-5 cursor-pointer"
                />
                {token && (
                  <div className="group-hover:block hidden absolute dropdown-menu left-3 pt-4 z-20">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-200 text-gray-500 rounded">
                      <p
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer hover:text-black"
                      >
                        My Profile
                      </p>
                      <Transition appear show={isOpen} as={React.Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-50 w-48"
                          onClose={() => setIsOpen(false)}
                        >
                          <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="fixed inset-0 bg-black bg-opacity-35" />
                          </Transition.Child>

                          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <Transition.Child
                              as={React.Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel className="max-w-lg w-96 space-y-4 border bg-white p-12 rounded-md shadow-xl transition-all">
                                <div>
                                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                                    Profile Information
                                  </h5>

                                  <p className="mb-3 font-normal text-gray-500">
                                    Name: {info.name}
                                  </p>
                                  <p className="mb-3 font-normal text-gray-500">
                                    Email: {info.email}
                                  </p>
                                  <p className="mb-3 font-normal text-gray-500">
                                    Credit: 0
                                  </p>
                                  <p className="mb-3 font-normal text-gray-500">
                                    Plan: {info.Plan}
                                  </p>

                                  <a
                                    href="#"
                                    className="inline-flex font-medium items-center text-blue-600 hover:underline"
                                  >
                                    See our guideline
                                    <svg
                                      className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                                      />
                                    </svg>
                                  </a>
                                </div>
                                <div className="flex gap-4">
                                  <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </Dialog>
                      </Transition>

                      <p
                        onClick={logout}
                        className="cursor-pointer hover:text-black"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <img
                src={assets.menu_icon}
                onClick={() => setVisible(true)}
                className="w-5 cursor-pointer sm:hidden"
              />
            </div>
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
