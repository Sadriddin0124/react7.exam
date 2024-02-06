import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddBook from "../../components/AddBook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = () => {
  const [links, setLinks] = useState([
    { id: 1, value: "Books", path: "/books" },
    { id: 2, value: "Authors", path: "/authors" },
    { id: 3, value: "Genres", path: "/janrlar" },
  ]);
 
  return (
    <div className=" fixed w-[250px] h-[100vh] bg-black py-[20px] flex flex-col">
      <ToastContainer/>
      <div className="h-[200px] w-[100%] flex justify-center">
        <img
          className="p-[2px] w-[200px] h-[200px] rounded-full border-[5px] hover:p-[10px] opacity-[.5] hover:opacity-[1] cursor-pointer hover:border-[10px] hover:w-[220px] hover:h-[220px] transition-[1s] mt-[10px] hover:mt-[0px]"
          src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
          alt="topimg"
        />
      </div>
      <ul className="h-[60%] flex flex-col justify-evenly w-[250px] items-start ps-0">
        {links.map((item, index) => {
          return (
            <li key={index} className="">
              <Link
                to={item.path}
                className="no-underline text-white text-[30px] px-[10px] hover:bg-purple-500 w-[250px] ps-[20px] block transition-all hover:translate-x-[10px] hover:w-[240px]"
              >
                {item.value}
              </Link>
            </li>
          );
        })}
        
      </ul>
    </div>
  );
};

export default Sidebar;
