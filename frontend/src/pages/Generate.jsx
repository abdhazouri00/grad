import React from "react";

const Generate = () => {
  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 ">
            Generate Document
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 -700 -600 -400  -primary-500 -primary-500"
                  placeholder="Type project name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Document Type
                </label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 -700 -600 -400  -primary-500 -primary-500"
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
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Document Depth
                </label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 -700 -600 -400  -primary-500 -primary-500"
                >
                  <option value="simple">Simple</option>
                  <option selected value="moderate">
                    Moderate
                  </option>
                  <option value="complex">Complex</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="primary_features"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Primary Features
                </label>
                <textarea
                  id="primary_features"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 -700 -600 -400  -primary-500 -primary-500"
                  placeholder="ex : API integration , Payment integration , Storage , Authentication/Authorization"
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="preferences"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Preferences and Tools
                </label>
                <textarea
                  id="preferences"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 -700 -600 -400  -primary-500 -primary-500"
                  placeholder="ex : AWS storage service , Prometheus for testing , Wordpress / Javascript"
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 -700 -600 -400  -primary-500 -primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Enter Template
              </label>
              <input type="file" />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Generate
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Generate;
