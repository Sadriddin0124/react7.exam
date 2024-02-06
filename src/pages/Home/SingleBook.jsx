import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient/axiosClient";

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
    <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col gap-[20px]">
      <h1>{singleBook.name}</h1>
      <div className="w-[60%] h-[70vh] bg-gradient-to-r from-violet-500 to-fuchsia-500 p-[10px] rounded-lg flex gap-[10px]">
        <div className="w-[50%] h-[100%]">
            <img className="w-[100%] h-[100%] object-cover rounded-2xl" src={singleBook.image} alt={singleBook.name} />
        </div>
        <div className="w-[50%] bg-white h-[100%] rounded-2xl p-[20px]">
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
