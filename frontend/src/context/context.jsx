import { createContext, useState } from "react";
import runChat from "../config/gemini.js";
import { useEffect } from "react";

//DEFINE PREVPROMPTS AND SOLVE PROBLEM

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setConversation((prev) => {
        const lastMessage = prev[prev.length - 1];
        const updatedMessage = {
          ...lastMessage,
          content: lastMessage.content + nextWord,
        };
        return [...prev.slice(0, -1), updatedMessage];
      });
    }, 10 * index);
  };

  const newChat = () => {
    setConversation([]);
  };

  const onSent = async (prompt) => {
    setLoading(true);
    const userMessage = { role: "user", content: prompt || input };
    setConversation((prev) => [...prev, userMessage]);

    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
    } else {
      response = await runChat(input);
    }

    try {
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split("");

      const assistantMessage = { role: "assistant", content: "" };
      setConversation((prev) => [...prev, assistantMessage]);

      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + "");
      }
    } catch (error) {
      console.error("Error while running chat:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const backendUrl = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!token && savedToken) {
      setToken(savedToken);
    }
  }, []);

  const contextValue = {
    conversation,
    setConversation,
    onSent,
    input,
    setInput,
    loading,
    newChat,
    backendUrl,
    token,
    setToken,
    setId,
    id,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
