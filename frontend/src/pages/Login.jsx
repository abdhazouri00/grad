import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "src/context/Context";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, backendUrl, setId, setCredit, setLoggedIn } =
    useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          credit: localStorage.getItem("credit"),
        });

        if (response.data.statusCode === 200) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          toast.success("User Created Successfully");
          setId(response.data.id);
          setName("");
          setEmail("");
          setPassword("");
          setLoggedIn(true);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.statusCode === 200) {
          console.log(response.data);
          setCredit(response.data.credit);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          toast.success("Login Successful");
          setId(response.data.id);
          setName("");
          setEmail("");
          setPassword("");
          setLoggedIn(true);
        } else {
          toast.error(response.data.message);
        }
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
