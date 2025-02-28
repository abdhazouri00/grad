import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Context } from "/src/context/Context";

const UserPage = () => {
  const { backendUrl, token, id } = useContext(Context);

  const [info, setInfo] = useState({});

  const getInfo = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/${id}`);
      console.log(response.data);
      setInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getInfo();
    }
  }, [token]);

  return (
    <div>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <a href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
            Profile Information
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500">Name: {info.name}</p>
        <p className="mb-3 font-normal text-gray-500">Email: {info.email}</p>
        <p className="mb-3 font-normal text-gray-500">Credit: 0</p>
        <p className="mb-3 font-normal text-gray-500">Plan: {info.Plan}</p>
        <p className="mb-3 font-normal text-gray-500">
          Go to this step-by-step guideline process on how to certify for your
          weekly benefits:
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
    </div>
  );
};

export default UserPage;
