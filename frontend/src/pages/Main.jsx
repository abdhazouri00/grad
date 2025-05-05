import React from "react";
import assets from "../assets/assets";
import { Link } from "react-router";

const Main = () => {
  const scrollToSection = () => {
    document
      .getElementById("how-does-it-work")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">
              Streamline Your Software Documentation
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Generate clear and professional software documents, from
              requirements to design specifications, with ChronoSpec. Simplify
              your documentation workflow and bring clarity and effeciency to
              your projects.
            </p>
            <Link to={"/generate"}>
              <button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
            <button
              onClick={scrollToSection}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
            >
              Learn More
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={assets.hero} alt="mockup" />
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex justify-center items-center md:items-stretch">
            <div className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Generate documents in minutes
              </h5>
              <p className="font-normal text-gray-700">
                Crafting detailed documents is now faster than ever. With
                ChronoSpec, generate high-quality, professional documents like
                SRS, BRD, FSD, and more in just minutes. Our intuitive tool
                organizes your inputs into well-structured formats, ready for
                review or sharing. Save time, reduce errors, and focus on what
                truly matters—delivering exceptional results for your projects.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center md:items-stretch">
            <div className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Customize and edit your AI-generated documents online
              </h5>
              <p className="font-normal text-gray-700">
                Take full control of your documents with ease. ChronoSpec allows
                you to customize and edit your AI-generated documents directly
                online, ensuring every detail matches your unique requirements.
                Update text, adjust formatting, and fine-tune content in
                real-time, all within an intuitive interface designed to
                simplify the editing process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-does-it-work" className="p-4 mb-20">
        <div className="flex flex-col gap-8 text-center">
          <h1 className="text-2xl font-bold">How does it work ?</h1>
          <hr />
          <div className="text-left">
            <h2 className="text-lg font-semibold">
              1. Select Your Document Type
            </h2>
            <p className="text-gray-500 font-medium">
              Choose the type of document you want to create, such as an SRS,
              BRD, FSD, or custom templates.
            </p>
          </div>

          <hr />
          <div className="text-left">
            <h2 className="text-lg font-semibold">
              2. Provide Project Details
            </h2>
            <p className="text-gray-500 font-medium">
              Fill out a simple form with your project requirements. Our system
              will guide you to ensure all essential information is captured.
            </p>
          </div>

          <hr />
          <div className="text-left">
            <h2 className="text-lg font-semibold">
              3. Review AI-Generated Draft
            </h2>
            <p className="text-gray-500 font-medium">
              Let ChronoSpec generate a detailed document based on your inputs
              in seconds. Review the draft to see the structure and content come
              to life.
            </p>
          </div>

          <hr />
          <div className="text-left">
            <h2 className="text-lg font-semibold">4. Customize and Finalize</h2>
            <p className="text-gray-500 font-medium">
              Edit text and sections, or make any adjustments to tailor the
              document to your exact specifications using our AI assistant.
            </p>
          </div>

          <hr />
          <div className="text-left">
            <h2 className="text-lg font-semibold">5. Download and Share</h2>
            <p className="text-gray-500 font-medium">
              You may view and download the completed document in PDF format.
            </p>
          </div>
          <hr />
        </div>
      </section>

      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Frequently asked questions
          </h2>
          <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
            <div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  How does the document generation process work?
                </h3>
                <p className="text-gray-500">
                  Simply provide the necessary details, and the system will
                  generate a document based on your input, following industry
                  standards and best practices.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Is this product free to use?
                </h3>
                <p className="text-gray-500">
                  Yes! Our product is free to use for now, with full access to
                  all features.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  What’s the difference between a human-written document and an
                  AI-generated document?
                </h3>
                <p className="text-gray-500">
                  Human-written documents reflect personal insight, creativity,
                  and detailed experience. Generated documents follow structured
                  patterns and conventions, which may be quicker and more
                  consistent but may lack the nuance of human writing.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  What’s the difference between a normal AI-generated document
                  and your generated document?
                </h3>
                <p className="text-gray-500">
                  Our tool is specifically trained to generate documents
                  following strict rules set by standards like IEEE, ISO, PMI,
                  and more. These documents are also responsive to your specific
                  requests, making them more adaptable compared to regular
                  generated documents.
                </p>
              </div>
            </div>
            <div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Can I trust the document for official or professional
                  purposes?
                </h3>
                <p className="text-gray-500">
                  No, the generated documents are not guaranteed to meet all
                  official or academic standards. You must review and revise
                  them to ensure they fit your specific requirements.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Can I customize the generated document according to my
                  preferences?
                </h3>
                <p className="text-gray-500">
                  Yes, but the document is not fully tailored. Only small
                  adjustments can be made for now, such as minor formatting or
                  detail tweaks.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  How responsive is the document generation?
                </h3>
                <p className="text-gray-500">
                  The tool is responsive to your questions and requests, though
                  its adaptability is currently limited.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Is the generation accurate?
                </h3>
                <p className="text-gray-500">
                  The documents generated maintain a basic level of accuracy and
                  alignment with general standards, though they may not fully
                  meet all expectations at this stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
