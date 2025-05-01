import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Context } from "../context/Context";
import Navbar from "../components/Navbar";

// Loader Modal Component (using portal)
const LoaderModal = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white bg-opacity-100 flex justify-center items-center z-50">
      <span className="loader"></span>
    </div>,
    document.body
  );
};

function View() {
  const { chatbot, conversationId, setConversationId, backendUrl } =
    useContext(Context);
  const [conversation, setConversation] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
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

      setConversation(response.data.messages.slice(0, -2));

      // console.log("fetching");
      // console.log(response.data.messages);

      if (response.data.messages.length <= 2) {
        setIsLoading(true);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (conversation.length <= 3) {
        fetchMessages();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [conversation]);

  const searchForFile = () => {
    for (let i = 0; i < conversation.length; i++) {
      if (conversation[i].payload.fileUrl) {
        setFileUrl(conversation[i].payload.fileUrl);
        return;
      }
    }
  };

  useEffect(() => {
    searchForFile();
  }, [conversation]);

  return (
    <div className="flex flex-col md:flex-row">

      {isLoading && <LoaderModal />}
      {!isLoading && (
        <>
          {/* <Navbar /> */}
          <div className="flex flex-row md:w-[55%]">
            <Sidebar />
            <Chat
              chatConversation={conversation}
              conversationId={conversationId}
              reloadConversation={fetchMessages}
              setFileUrl={setFileUrl}
            />
          </div>
          <div className="flex justify-center">
            <div className="w-[600px] h-[600px] overflow-hidden my-12 md:my-0">
              <embed
                src={fileUrl}
                type="application/pdf"
                className="w-[650px] h-[800px] scale-[0.9] origin-top-left"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default View;
