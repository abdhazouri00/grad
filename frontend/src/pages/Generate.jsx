import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const Generate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    credit,
    setCredit,
    backendUrl,
    id,
    chatbot,
    setConversationId,
    updateChat,
  } = useContext(Context);
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

  const saveChat = async (userId, chatId, title) => {
    try {
      await axios.post(`${backendUrl}/api/user/saveChat`, {
        userId,
        chatId,
        title,
      });
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const updateUserCredit = async (userId, amount) => {
    try {
      const response = await axios.put(`${backendUrl}/api/user/updateCredit`, {
        userId,
        amount,
      });
      setCredit(response.data.user.credit);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, temp: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const creditRequirements = { simple: 3, moderate: 4, complex: 5 };
    if (credit < creditRequirements[formData.docDepth]) {
      setIsOpen(true);
      return;
    }

    try {
      // Create conversation
      const convRes = await axios.post(
        `${chatbot}/conversations`,
        {},
        {
          headers: {
            accept: "application/json",
            "x-user-key": localStorage.getItem("chatToken"),
            "content-type": "application/json",
          },
        }
      );

      const newConvId = convRes.data.conversation.id;
      setConversationId(newConvId);

      const message = `Project Title: ${formData.projectName}\nDescription: ${formData.desc}\nFeatures: ${formData.features}\nPreferences and Tools: ${formData.prefTools}\nPlease generate a complete document with all sections included. Do not skip any part, and make sure every section is fully provided.`;


      await axios.post(
        `${chatbot}/messages`,
        {
          payload: { type: "text", text: message },
          conversationId: newConvId,
        },
        {
          headers: {
            accept: "application/json",
            "x-user-key": localStorage.getItem("chatToken"),
            "content-type": "application/json",
          },
        }
      );

      // Update credits
      const creditDeduction = creditRequirements[formData.docDepth];
      if (localStorage.getItem("id")) {
        await updateUserCredit(localStorage.getItem("id"), creditDeduction);
        await saveChat(
          localStorage.getItem("id"),
          newConvId,
          formData.projectName
        );
      } else {
        const newCredit =
          Number(localStorage.getItem("credit")) - creditDeduction;
        localStorage.setItem("credit", newCredit);
        setCredit(newCredit);
      }

      navigate("/view", {
        state: {
          initialMessage: message,
          conversationId: newConvId,
          projectName: formData.projectName,
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to generate document. Please try again.");
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg shadow-lg">
              <DialogTitle className="font-bold text-gray-800 text-lg">
                Not Enough Credit
              </DialogTitle>
              <Description className="text-gray-700">
                You don't have enough credit to continue the process
              </Description>
              <div className="flex gap-4 mt-4">
                <Link
                  to="/pricing"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  See Pricing Plans
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
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
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            Generate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Generate;
