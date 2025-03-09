import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context.jsx";
import { Link, useNavigate } from "react-router";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const Generate = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { credit, setCredit, loggedIn, backendUrl, id } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    docType: "srs",
    docDepth: "moderate",
    features: "",
    prefTools: "",
    desc: "",
    temp: null,
  });

  const updateUserCredit = async (userId, amount) => {
    try {
      console.log(userId);

      const response = await axios.put(`${backendUrl}/api/user/updateCredit`, {
        userId,
        amount,
      });

      setCredit(response.data.user.credit);
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, temp: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (
      (formData.docDepth === "simple" && credit < 3) ||
      (formData.docDepth === "moderate" && credit < 4) ||
      (formData.docDepth === "complex" && credit < 5)
    ) {
      setIsOpen(true);
      return;
    }
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/formsubmit",
      //   formDataToSend,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      // console.log("Response:", response.data);
      console.log(formData);

      if (!localStorage.getItem("id")) {
        if (formData.docDepth === "simple") {
          localStorage.setItem("credit", localStorage.getItem("credit") - 3);
          setCredit(localStorage.getItem("credit"));
        } else if (formData.docDepth === "moderate") {
          localStorage.setItem("credit", localStorage.getItem("credit") - 4);
          setCredit(localStorage.getItem("credit"));
        } else if (formData.docDepth === "complex") {
          localStorage.setItem("credit", localStorage.getItem("credit") - 5);
          setCredit(localStorage.getItem("credit"));
        }
      } else if (localStorage.getItem("id")) {
        if (formData.docDepth === "simple") {
          updateUserCredit(id, 3);
        } else if (formData.docDepth === "moderate") {
          updateUserCredit(id, 4);
        } else if (formData.docDepth === "complex") {
          updateUserCredit(id, 5);
        }
      }

      navigate("/view");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Generate Document
        </h2>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg shadow-lg">
              <DialogTitle className="font-bold text-gray-800 text-lg">
                Not Enough Credit
              </DialogTitle>
              <Description className="text-gray-700">
                You dont have enough credit to continue the process
              </Description>
              <p className="text-sm text-blue-700">
                <Link
                  to="/pricing"
                  className="inline-flex font-medium items-center text-blue-600 hover:underline"
                >
                  See Pricing Plans
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
                </Link>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="projectName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Type project name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="docType"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Document Type
              </label>
              <select
                name="docType"
                value={formData.docType}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="srs">
                  Software Requirements Specification (SRS)
                </option>
                <option value="brd">
                  Business Requirements Document (BRD)
                </option>
                <option value="sdd">Software Design Document (SDD)</option>
                <option value="fsd">
                  Functional Specification Document (FSD)
                </option>
                <option value="tdd">Technical Design Document (TDD)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="docDepth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Document Depth
              </label>
              <select
                name="docDepth"
                value={formData.docDepth}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="simple">Simple (3 Credit)</option>
                <option value="moderate">Moderate (4 Credit)</option>
                <option value="complex">Complex (5 Credit)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="features"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Primary Features
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., API integration, Payment integration"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="prefTools"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Preferences and Tools
              </label>
              <textarea
                name="prefTools"
                value={formData.prefTools}
                onChange={handleChange}
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., AWS storage service, Prometheus for testing"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="temp"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Enter Template
            </label>
            <input type="file" name="temp" onChange={handleFileChange} />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            Generate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Generate;
