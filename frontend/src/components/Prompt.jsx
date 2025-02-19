import React, { useEffect, useRef, useState } from "react";
import assets from "../assets/assets.js";
import run from "../config/gemini";

//million-ignore

function Prompt({ onChat, readyMsg }) {
  const previousResponseRef = useRef(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setInput(selectedFile.name);
    }
  }

  async function handleSubmit() {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
    }

    const response = await run(input + "give answer maximum 6 lines");

    setInput("");
    setFile(null);
    onChat(input, response);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        if (readyMsg !== "") {
          const response = await run(readyMsg);

          setInput("");

          if (response !== previousResponseRef.current) {
            onChat(readyMsg, response);
            previousResponseRef.current = response;
          }
        }
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    };

    fetchResponse();
  }, [readyMsg]);

  return (
    <div className="p-4 text-gray-100">
      <div className="flex items-center border border-gray-300 rounded-full w-full bg-gray-100 h-12">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a prompt here"
          className="p-4 rounded-full flex-grow bg-[#f0f4f9] h-12 text-gray-700 font-semibold border-0 outline-none drop-shadow-none"
        />
        <div className="flex space-x-2 pr-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-input"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <img
              src={assets.gallery_icon}
              alt="Gallery Icon"
              className="w-6 h-6 hover:cursor-pointer border-0 outline-none drop-shadow-none"
            />
          </label>

          <img
            src={assets.mic_icon}
            alt="Mic Icon"
            className="w-6 h-6 hover:cursor-pointer border-0 outline-none drop-shadow-none"
          />
          {input !== "" && (
            <img
              onClick={handleSubmit}
              src={assets.send_icon}
              alt="Send Icon"
              className="w-6 h-6 hover:cursor-pointer border-0 outline-none drop-shadow-none"
            />
          )}
        </div>
      </div>
      <div className="flex justify-center text-center">
        <p className="text-xs text-black mt-2 opacity-65">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
}

export default Prompt;
