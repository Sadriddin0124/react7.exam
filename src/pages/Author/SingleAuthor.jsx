import React, { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../../plugins/axiosClient";

const SingleAuthor = () => {
  const id = window.location.href.split("/")[4];
  const [singleAuthor, setSingleAuthor] = useState("");
  const [data, setData] = useState([])
  useEffect(() => {
    axiosClient.get(`/author/${id}`).then((res) => {
      setSingleAuthor(res.data);
      setData(res?.data?.birthdate.slice(0,10))
    });
  }, []);
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col bg-slate-200">
        <h1>{singleAuthor.full_name}</h1>
      <div className="w-[700px] flex h-[450px] p-[10px] rounded-lg bg-white shadow-md relative overflow-hidden">
        <div className="w-[50%]"></div>
        <div className="w-[1000px] h-[1000px] border-[20px] border-[#7e22ce] rounded-full absolute top-[-549px] left-[-460px] overflow-hidden">
        <img src={singleAuthor.image} alt={singleAuthor.full_name} className="w-[530px] h-[430px] absolute z-20 bottom-0 right-0 object-cover"/>
        </div>
        <div className="w-[50%] h-[100%] flex flex-col justify-end items-end py-[50px] gap-[10px] px-[20px]">
        <h3>{singleAuthor.full_name}</h3>
        <h3>Birthdate: {data}</h3>
        <h3>Country: {singleAuthor.country}</h3>
        </div>
      </div>
    </div>
  );
};

export default SingleAuthor;
