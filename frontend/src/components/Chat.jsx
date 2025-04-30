import { useContext, useRef, useEffect, useState } from "react";
import assets from "../assets/assets.js";
import { Context } from "../context/Context.jsx";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";

const Chat = ({
  chatConversation,
  conversationId,
  reloadConversation,
  setFileUrl,
}) => {
  const { chatbot } = useContext(Context);
  const [input, setInput] = useState("");
  const [lastUserInput, setLastUserInput] = useState("");
  const [pollingInterval, setPollingInterval] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);

  const searchForFile = () => {
    for (let i = 0; i <= chatConversation.length - 1; i++) {
      if (chatConversation[i].payload.fileUrl) {
        setFileUrl(chatConversation[i].payload.fileUrl);
        return;
      }
    }
  };

  // useEffect(() => {

  //   const token = localStorage.getItem(
  //       "chatToken"
  //   )

  //   const source = new EventSource(
  //     `${chatbot}/conversations/${conversationId}/listen?x-user-key=${token}`
  //   );

  //   source.onopen = () => {
  //     console.log("listening opened");
  //   };

  //   source.onmessage = (event) => {
  //     console.log("message : " + event.data);
  //   };

  //   source.onerror = (event) => {
  //     console.log("error occurred : ", event);
  //   };

  //   return () => {
  //     source.close(); // clean up on unmount
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!conversationId) return;

  //   const source = new EventSource(
  //     `${chatbot}/conversations/${conversationId}/listen`,
  //     {
  //       headers: {
  //         "x-user-key": localStorage.getItem("chatToken"),
  //       },
  //     }
  //   );

  //   source.onopen = () => {
  //     console.log("listening opened");
  //   };

  //   source.onmessage = (event) => {
  //     console.log("message : " + event.data);
  //   };

  //   source.onerror = (event) => {
  //     console.log("error occurred : ", event);
  //   };

  //   return () => source.close();
  // }, []);

  // useEffect(() => {
  //    const token = localStorage.getItem("chatToken");
  //    console.log(conversationId);

  //    const options = { method: "GET", headers: { "x-user-key": token } };
  //    console.log(localStorage.getItem("chatToken"));

  //    fetch(`${chatbot}/conversations/${conversationId}/listen`, options)
  //      .then((response) => response.json())
  //      .then((response) => console.log(response))
  //      .catch((err) => console.error(err));

  //    console.log(`${chatbot}/conversations/${conversationId}/listen`);
  // },[])

  useEffect(() => {
    searchForFile();
  }, [chatConversation]);

  // Start polling when component mounts
  useEffect(() => {
    const startPolling = () => {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(
            `${chatbot}/conversations/${conversationId}/messages`,
            {
              headers: {
                accept: "application/json",
                "x-user-key": localStorage.getItem("chatToken"),
              },
            }
          );

          const messages = response.data.messages;
          if (!messages || messages.length === 0) return;

          const latestMessage = messages[0];

          // Check for files in all messages
          const fileMessage = messages.find((m) => m.payload.fileUrl);
          if (fileMessage) {
            setFileUrl(fileMessage.payload.fileUrl);
          }

          setIsWaitingForResponse(false);
          await reloadConversation();
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 3000); // Poll every 3 seconds

      setPollingInterval(interval);
      return interval;
    };

    const interval = startPolling();

    // Clean up interval on unmount
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [conversationId]); // Add dependencies as needed

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatConversation]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler(e);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim() || isWaitingForResponse) return;

    try {
      setLastUserInput(input); // Store the user's input before sending

      // Send user message
      await axios.post(
        `${chatbot}/messages`,
        {
          payload: {
            type: "text",
            text: input,
          },
          conversationId: conversationId,
          userMessage: true,
        },
        {
          headers: {
            accept: "application/json",
            "x-user-key": localStorage.getItem("chatToken"),
            "content-type": "application/json",
          },
        }
      );

      setInput("");
      setIsWaitingForResponse(true);
      await reloadConversation();
      searchForFile();
    } catch (error) {
      console.error("Message send error:", error);
    }
  };

  // useEffect(() => {
  //   if (!chatbot || !conversationId) return;

  //   const interval = setInterval(() => {
  //     axios
  //       .get(`${chatbot}/conversations/${conversationId}/listen`, {
  //         headers: {
  //           "x-user-key": localStorage.getItem("chatToken"),
  //         },
  //       })
  //       .then((res) => {
  //         console.log("New messages:", res.data);
  //       })
  //       .catch((err) => {
  //         console.error("Error listening to chat:", err);
  //       });
  //   }, 3000);

  //   return () => clearInterval(interval); // cleanup
  // }, [chatbot, conversationId]);

  return (
    <div className="flex-1 h-[85vh] pb-[25vh] relative">
      <div className="flex items-center justify-between text-[22px] p-5 text-[#585858]"></div>
      <div className="max-w-[900px] mx-auto flex-1 overflow-y-auto max-h-[70vh] p-2.5 scrollbar-thin scrollbar-thumb-[#ccc] scrollbar-track-transparent">
        {chatConversation.length === 0 ? (
          <div className="greet my-[50px]">
            <p className="text-[36px] lg:text-[48px] md:text-[22px] text-[#c4c7c5] font-semibold">
              Feel free to modify, edit, or adjust the styling as needed.
            </p>
          </div>
        ) : (
          <div className="conversation px-[5%] max-h-[80vh] overflow-y-auto mb-20">
            {[...chatConversation].reverse().map((message, index) => {
              const role = index % 2 === 0 ? "assistant" : "user";

              return (
                <div key={index} className={`message ${role} my-4`}>
                  <div className="flex items-start gap-5">
                    <div>
                      {role === "user" ? (
                        <FaRegUser size="22px" />
                      ) : (
                        <GiArtificialIntelligence size="24px" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        role === "user" ? "bg-[#f0f4f9]" : "bg-[#e2e6eb]"
                      }`}
                    >
                      <p className="text-[17px] font-light leading-relaxed">
                        {message.payload.title || message.payload.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* {isWaitingForResponse && (
              <div className="flex items-start gap-5 my-4">
                <GiArtificialIntelligence size="24px" />
                <div className="p-3 rounded-lg bg-[#e2e6eb]">
                  <div className="loader flex flex-col gap-2.5">
                    <hr className="rounded h-5 bg-gradient-to-r from-[#b1d5ee] via-[#1610188a] to-[#9ed7ff] bg-[800px_50px] animate-loader" />
                    <hr className="rounded h-5 bg-gradient-to-r from-[#b1d5ee] via-[#1610188a] to-[#9ed7ff] bg-[800px_50px] animate-loader" />
                    <hr className="rounded h-5 bg-gradient-to-r from-[#b1d5ee] via-[#1610188a] to-[#9ed7ff] bg-[800px_50px] animate-loader" />
                  </div>
                </div>
              </div>
            )} */}
          </div>
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-40">
          <form
            className="search-box flex items-center justify-between gap-5 bg-[#f0f4f9] p-2.5 rounded-full mt-20"
            onSubmit={onSubmitHandler}
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-0 outline-0 p-2 text-[18px]"
              disabled={isWaitingForResponse}
            />
            <div className="flex items-center gap-3.5">
              <button type="submit" disabled={isWaitingForResponse}>
                <img
                  src={assets.send_icon}
                  alt="Send"
                  className="w-6 cursor-pointer"
                />
              </button>
            </div>
          </form>
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
