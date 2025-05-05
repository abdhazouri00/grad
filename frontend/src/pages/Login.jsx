import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context/Context.jsx";
import { useNavigate } from "react-router";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const {
    token,
    setToken,
    backendUrl,
    setId,
    setCredit,
    setLoggedIn,
    chatbot,
  } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        toast.promise(
          (async () => {
            const response = await axios.post(chatbot + "/users", {
              name,
            });
            console.log(response);

            localStorage.setItem("chatToken", response.data.key);

            console.log(localStorage.getItem("chatToken"));

            return axios.post(backendUrl + "/api/user/register", {
              name,
              email,
              password,
              chatId: response.data.user.id,
              chatToken: response.data.key,
              credit: localStorage.getItem("credit"),
            });
          })(),
          {
            pending: "Creating account...",
            success: {
              render({ data }) {
                setToken(data.data.token);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("id", data.data.id);
                setId(data.data.id);
                setName("");
                setEmail("");
                setPassword("");
                setLoggedIn(true);
                return "User Created Successfully";
              },
            },
            error: "Sign-up failed. Please try again.",
          }
        );
      } else {
        toast.promise(
          axios.post(backendUrl + "/api/user/login", {
            email,
            password,
          }),
          {
            pending: "Logging in...",
            success: {
              render({ data }) {
                setCredit(data.data.credit);
                setToken(data.data.token);
                localStorage.setItem("chatToken" , data.data.chatToken)
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("id", data.data.id);
                setId(data.data.id);
                setName("");
                setEmail("");
                setPassword("");
                setLoggedIn(true);
                return "Login Successful";
              },
            },
            error: "Login failed. Please check your credentials.",
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <input
          className="w-full px-3 py-2 border border-gray-800"
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="text"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p
          onClick={() => toast.error("Fix Later Please")}
          className="cursor-pointer"
        >
          Forgot your Password ?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default Login;
