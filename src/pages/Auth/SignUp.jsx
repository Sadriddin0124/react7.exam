import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient/axiosClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
    const navigate = useNavigate()
    const handleSignUp = (e) => {
        e.preventDefault();
    let payload = {
      full_name: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value,
    };
    axiosClient
      .post("/auth/signup", { ...payload })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res?.data?.tokens?.access_token)
        if (res?.status === 201) {
          setTimeout(()=> {
              navigate('/signin')
            }, 2000)
            toast.success("Registered successfully!")
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, "Registration failed!")
      });
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <ToastContainer/>
      <div className="w-[100%] flex justify-center items-center">
        <div className="w-[400px] h-[500px] border-2 flex flex-col items-center p-[20px] rounded-[10px] gap-[30px]">
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
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
              id="username"
              placeholder="Username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none"
              id="password"
              placeholder="Password"
            />
            <div className="flex w-[100%] gap-[20px] justify-center mt-[20px]">
              <button
                type="submit"
                className="px-[20px] py-[10px] bg-purple-700 rounded-lg text-white"
              >
                Sign Up
              </button>
              <Link
                to="/signin"
                className="px-[20px] py-[10px] bg-slate-50 border-2 rounded-lg border-[purple] hover:bg-purple-700 hover:text-white no-underline text-purple-700"
              >
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
