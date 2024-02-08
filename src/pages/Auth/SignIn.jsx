import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../plugins/axiosClient";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Notification } from "../../components/Notification/Notification";
const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const handleSignIn = (e) => {
    e.preventDefault();
    let payload = {
      username,
      password,
    };
    console.log(payload);
    axiosClient
      .post("/auth/signin", { ...payload })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res?.data?.tokens?.access_token);
        if (res?.status === 201) {
          setTimeout(() => {
            navigate("/main");
          }, 2000);
          Notification({text: res?.data?.message, type: "success"})
        }
      })
      .catch((err) => {
        console.log(err);
        Notification({text: err?.response?.data?.message[0], type: "error"})
      });
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-slate-200">
      <ToastContainer />
      <div className="w-[100%] flex justify-center items-center">
        <div className="w-[400px] h-[400px] border-2 flex flex-col items-center p-[20px] rounded-[10px] gap-[30px] bg-white">
          <h1 className="text-[30px] font-[600]">Sign In</h1>
          <form
            className="flex flex-col items-start w-[90%] gap-[10px]"
            onSubmit={handleSignIn}
          >
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              className="w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
              id="username"
              placeholder="Username"
              onChange={(e)=>setUsername(e.target.value)}
              />
            <div className="w-[100%] relative">
              <label htmlFor="password">Password</label>
              <input
                required
                type={type ? "text" : "password"}
                className="mt-[10px] w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
                id="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <FaRegEyeSlash
                className={`absolute right-[15px] top-[48px] text-[20px] cursor-pointer ${
                  type ? "hidden" : "block"
                }`}
                onClick={() => setType((prev) => !prev)}
              />
              <FaRegEye
                className={`absolute right-[15px] top-[48px] text-[20px] cursor-pointer ${
                  type ? "block" : "hidden"
                }`}
                onClick={() => setType((prev) => !prev)}
              />
            </div>
            <button
              type="submit"
              className="self-center px-[20px] py-[10px] bg-purple-700 rounded-lg text-white"
            >
              Sign In
            </button>
            <div className="flex w-[100%] gap-[20px] justify-center mt-[20px]">
              <p>Don't have an Account?</p>
              <Link to="/" className="no-underline text-purple-700">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
