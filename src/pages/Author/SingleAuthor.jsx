import React, { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../../axiosClient/axiosClient";

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
    <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col">
        <h1>{singleAuthor.full_name}</h1>
      <div className="w-[500px] flex flex-col border-2 p-[10px] rounded-lg">
        <img src={singleAuthor.image} alt={singleAuthor.full_name} className="border-2"/>
        <h3>Fullname: {singleAuthor.full_name}</h3>
        <h3>Birthdate: {data}</h3>
        <h3>Country: {singleAuthor.country}</h3>
      </div>
    </div>
  );
};

export default SingleAuthor;
