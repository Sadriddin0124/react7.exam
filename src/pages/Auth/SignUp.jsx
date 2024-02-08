import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../plugins/axiosClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Notification } from "../../components/Notification/Notification";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const SignUp = () => {
  const [full_name, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false)
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    let payload = {
      full_name,
      username,
      password,
    };
    axiosClient
      .post("/auth/signup", { ...payload })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res?.data?.tokens?.access_token);
        if (res?.status === 201) {
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
          Notification({ text: res?.data?.message, type: "success" });
        }
      })
      .catch((err) => {
        Notification({ text: err.response.data.message[0], type: "error" });
      });
  };
  let active = Boolean(full_name) && Boolean(username) && Boolean(password);
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-slate-200">
      <ToastContainer />
      <div className="w-[100%] flex justify-center items-center">
        <div className="w-[400px] h-[500px] border-2 bg-white flex flex-col items-center p-[20px] rounded-[10px] gap-[30px]">
          <h1 className="text-[30px] font-[600]">Sign Up</h1>
          <form
            className="flex flex-col items-start w-[90%] gap-[10px]"
            onSubmit={handleSignUp}
          >
            <label htmlFor="full_name">Fullname</label>
            <input
              type="text"
              className="w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
              id="full_name"
              placeholder="Full Name"
              onChange={(e) => setFullname(e.target.value)}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="w-[100%] relative">
              <label htmlFor="password">Password</label>
              <input
                type={type ? "text" : "password"}
                className="mt-[10px] w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            <FaRegEyeSlash className={`absolute right-[15px] top-[48px] text-[20px] cursor-pointer ${type ? "hidden" : "block"}`} onClick={()=>setType(prev=> !prev)}/>
            <FaRegEye className={`absolute right-[15px] top-[48px] text-[20px] cursor-pointer ${type ? "block" : "hidden"}`} onClick={()=>setType(prev=> !prev)}/>
            </div>
            <button
              type="submit"
              disabled={!active}
              className={`self-center px-[20px] py-[10px] bg-purple-700 rounded-lg text-white ${
                active ? "opacity-[1]" : "opacity-[0.7]"
              }`}
            >
              Sign Up
            </button>
            <div className="flex w-[100%] gap-[20px] justify-center mt-[20px]">
              <p>Already have an Account?</p>
              <Link to="/signin" className=" no-underline text-purple-700">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
