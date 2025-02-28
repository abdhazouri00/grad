import { useContext, useRef, useEffect, useState } from "react";
import assets from "../assets/assets.js";
import { Context } from "/src/context/Context";
import { FaRegUser } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";

const Chat = () => {
  const {
    conversation = [],
    onSent,
    loading,
    setInput,
    input,
    setId,
    getInfo,
  } = useContext(Context);

  const messagesEndRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSent();
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    getInfo();
  }, [conversation]);

  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, []);

  return (
    <div className="flex-1 h-[85vh] pb-[25vh] relative">
      <div className="flex items-center justify-between text-[22px] p-5 text-[#585858]"></div>
      <div className="max-w-[900px] mx-auto flex-1 overflow-y-auto max-h-[70vh] p-2.5 scrollbar-thin scrollbar-thumb-[#ccc] scrollbar-track-transparent">
        {conversation.length === 0 ? (
          <div className="greet my-[50px]">
            <p className="text-[36px] lg:text-[48px] md:text-[22px] text-[#c4c7c5] font-semibold">
              Feel free to modify, edit, or adjust the styling as needed.
            </p>
          </div>
        ) : (
          <div className="conversation px-[5%] max-h-[80vh] overflow-y-auto mb-20">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.role === "user" ? "user" : "assistant"
                } my-4`}
              >
                <div ref={messagesEndRef} />
                <div className="flex items-start gap-5">
                  <div>
                    {message.role === "user" ? (
                      <FaRegUser size="22px" />
                    ) : (
                      <GiArtificialIntelligence size="24px" />
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user" ? "bg-[#f0f4f9]" : "bg-[#e2e6eb]"
                    }`}
                  >
                    <p
                      className="text-[17px] font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="loader w-full flex flex-col gap-2.5 my-4">
                <hr className="rounded h-5 bg-gradient-to-r from-[#b1d5ee] via-[#1610188a] to-[#9ed7ff] bg-[800px_50px] animate-loader" />
                <hr className="rounded h-5 bg-gradient-to-r from-[#b1d5ee] via-[#1610188a] to-[#9ed7ff] bg-[800px_50px] animate-loader" />
                <hr className="rounded h-5 bg-gradient-to-r from-[#b1d5ee] via-[#1610188a] to-[#9ed7ff] bg-[800px_50px] animate-loader" />
              </div>
            )}
          </div>
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-40">
          <div className="search-box flex items-center justify-between gap-5 bg-[#f0f4f9] p-2.5 rounded-full mt-20">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-0 outline-0 p-2 text-[18px]"
            />
            <div className="flex items-center gap-3.5">
              <img
                src={assets.send_icon}
                alt=""
                className="w-6 cursor-pointer"
                onClick={onSent}
              />
            </div>
          </div>
          <div className="bottom-info text-[13px] my-3.5 text-center font-light">
            <p>
              This is a research project and may generate incomplete or
              inaccurate content. Please verify all outputs before use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
