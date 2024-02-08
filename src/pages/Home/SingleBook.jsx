import React, { useEffect, useState } from "react";
import axiosClient from "../../plugins/axiosClient";

const SingleBook = () => {
  const [singleBook, setSingleBook] = useState([]);
  const id = window.location.href.split("/")[4];
  useEffect(() => {
    axiosClient.get(`/book/${id}`).then((res) => {
      setSingleBook(res?.data);
      console.log(res?.data);
    });
  }, []);
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col gap-[20px] bg-slate-200">
      <h1>{singleBook.name}</h1>
      <div className="w-[900px] h-[70vh] bg-white p-[10px] rounded-lg flex justify-end gap-[10px] relative overflow-hidden shadow-md">
        <div className=" overflow-hidden w-[1000px] border-[#7e22ce] h-[1000px] absolute rounded-full border-[20px] top-[-200px] left-[-500px]">
            <img className="absolute top-[160px] right-0 w-[500px] h-[550px] object-cover rounded-2xl" src={singleBook.image} alt={singleBook.name} />
        </div>
        <div className="w-[55%] h-[100%]"></div>
        <div className="w-[45%] bg-white h-[100%] rounded-2xl p-[20px]">
            <h3 className="mt-[20px]">Name: {singleBook?.name}</h3>
            <h3>Author: {singleBook?.author?.full_name}</h3>
            <h3>Price: ${singleBook?.price}</h3>
            <h3>Book code: {singleBook.code}</h3>
            <h3>Janr: {singleBook?.janr?.name}</h3>
            <h3>Description:</h3>
            <hr />
            <p>{singleBook.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
