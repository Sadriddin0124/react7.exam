import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../axiosClient/axiosClient'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
    const navigate = useNavigate()
    const handleSignIn =(e)=> {
        e.preventDefault()
        let payload = {
            username: e.target[0].value,
            password: e.target[1].value,
        }
        console.log(payload);
        axiosClient.post("/auth/signin", {...payload}).then((res)=> {
            console.log(res);
            localStorage.setItem("token", res?.data?.tokens?.access_token)
            if(res?.status === 201) {
                setTimeout(() => {
                    navigate('/books')
                }, 2000);
                toast.success("Signed in successfully!")
            }
        }).catch((err)=> {
            console.log(err);
            toast.error("Signing in failed! Try again!")
        })
    }
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
        <ToastContainer/>
      <div className="w-[100%] flex justify-center items-center">
        <div className="w-[400px] h-[400px] border-2 flex flex-col items-center p-[20px] rounded-[10px] gap-[30px]">
            <h1 className='text-[30px] font-[600]'>Sign In</h1>
            <form className='flex flex-col items-start w-[90%] gap-[10px]'onSubmit={handleSignIn}>
                <label htmlFor="username">Username</label>
                <input type="text" className='w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none' id="username" placeholder="Username"/>
                <label htmlFor="password">Password</label>
                <input type="password" className='w-[100%] px-[10px] py-[10px] border-2 rounded-md outline-none' id="password" placeholder="Password"/>
                <div className='flex w-[100%] gap-[20px] justify-center mt-[20px]'>
                    <button type='submit' className='px-[20px] py-[10px] bg-purple-700 rounded-lg text-white'>Sign In</button>
                    <Link to="/" className='px-[20px] py-[10px] bg-slate-50 border-2 rounded-lg border-[purple] hover:bg-purple-700 hover:text-white no-underline text-purple-700'>Sign Up</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
