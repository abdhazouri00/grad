import React from "react";
import Product from "../components/Product";

const Products = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-32 space-y-4 mt-10 mb-20">
        <h1 className="text-4xl font-bold text-center">Our Products</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Our AI agent is trained to generate a wide range of professional and
          technical documents with precision and clarity. It streamlines the
          creation of structured, industry-standard documentation, tailored to
          meet diverse project needs. From planning to implementation, our agent
          delivers high-quality outputs to support your goals.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 gap-y-6">
        <Product
          title={"Software Requirements Specification"}
          desc={
            "Defines the functional and non-functional requirements of a software system, serving as a blueprint for development."
          }
        />
        <Product
          title={"Buisness Requirements Document"}
          desc={
            "Outlines the business goals, needs, and expectations for a project, ensuring alignment between stakeholders and development teams."
          }
        />
        <Product
          title={"Software Design Document"}
          desc={
            "Describes the system architecture, components, and design details, providing a roadmap for developers to build the software."
          }
        />
        <Product
          title={"Functional Specification Document"}
          desc={
            "Details the system's functionality, workflows, and user interactions, guiding developers on how features should behave."
          }
        />
        <Product
          title={"Technical Design Document"}
          desc={
            "Specifies the technical architecture, tools, and implementation details, serving as a guide for developers to write code."
          }
        />
      </div>
    </>
  );
};

export default Products;
