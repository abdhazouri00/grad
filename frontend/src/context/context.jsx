import { createContext, useState, useRef } from "react";
import runChat from "../config/gemini.js";
import { useEffect } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [info, setInfo] = useState({});
  const [newChat, setNewChat] = useState(false);
  const [chatId, setChatId] = useState("");
  const [newMessages, setNewMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [credit, setCredit] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [plan, setPlan] = useState("")
  const [creditToBuy, setCreditToBuy] = useState(null)
  const [planTotal , setPlanTotal] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND;
  const newMessagesRef = useRef([]);

  const getInfo = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/${localStorage.getItem("id")}`
      );
      setInfo(response.data);
      setCredit(response.data.credit);
      setChats(response.data.chats);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const saveChat = async (userId, messages) => {
    try {
      console.log("saving chat");
      const response = await axios.post(`${backendUrl}/api/user/saveChat`, {
        userId,
        messages,
      });

      setChatId(response.data.chat.chatId);
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const updateChat = async (userId, chatId, messages) => {
    try {
      const response = await axios.put(`${backendUrl}/api/user/updateChat`, {
        userId,
        chatId,
        messages,
      });

      console.log("Chat updated:", response.data);
      setNewMessages([]);
    } catch (error) {
      console.error(
        "Error updating chat:",
        error.response?.data || error.message
      );
    }
  };

  const onSent = async (prompt) => {
    setLoading(true);
    const userMessage = { role: "user", content: prompt || input };

    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);

    if (!newChat) {
    } else {
      newMessagesRef.current = [...newMessagesRef.current, userMessage];
      setNewMessages(newMessagesRef.current);
    }

    let response = await runChat(prompt || input);

    try {
      let formattedResponse = response
        .split("**")
        .map((part, i) => (i % 2 ? `<b>${part}</b>` : part))
        .join("")
        .split("*")
        .join("<br/>");

      const assistantMessage = {
        role: "assistant",
        content: formattedResponse,
      };

      const finalConversation = [...updatedConversation, assistantMessage];
      setConversation(finalConversation);

      if (newChat) {
        newMessagesRef.current = [...newMessagesRef.current, assistantMessage];
        setNewMessages(newMessagesRef.current);
      }

      if (!newChat) {
        await saveChat(id, finalConversation);
        setNewChat(true);
      } else {
        await updateChat(id, chatId, newMessagesRef.current);
        newMessagesRef.current = [];
        setNewMessages([]);
      }
    } catch (error) {
      console.error("Error while running chat:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!token && savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      if (!localStorage.getItem("credit")) {
        localStorage.setItem("credit", 10);
        setCredit(10);
      } else if (localStorage.getItem("credit")) {
        setCredit(localStorage.getItem("credit"));
      }
    } else if (localStorage.getItem("id")) {
      getInfo();
    }
  }, []);

  const contextValue = {
    conversation,
    setConversation,
    onSent,
    input,
    setInput,
    loading,
    backendUrl,
    token,
    setToken,
    setId,
    id,
    getInfo,
    info,
    setInfo,
    chats,
    setChats,
    setNewChat,
    setCredit,
    credit,
    loggedIn,
    setLoggedIn,
    plan,
    setPlan,
    creditToBuy,
    setCreditToBuy,
    planTotal,
    setPlanTotal
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
