import React, { useEffect, useState } from "react";
import axiosClient from "../../plugins/axiosClient";
import GenreCard from "./GenreCard";
import GenreModal from "../../components/GenreModal";
import DeleteGenre from "../../components/DeleteGenre";

const Genre = () => {
  const [janr, setJanr] = useState([]);
  const [required, setRequired] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [removeJanr, setRemoveJanr] = useState("")
  useEffect(() => {
    axiosClient.get("/category/get/all").then((res) => {
      setJanr(res?.data);
      console.log(res.data);
    });
  }, []);
  const [janrModal, setJanrModal] = useState(false);
  const toggle = () => {
    setJanrModal(false);
    setEditJanr("");
    setDeleteModal(false)
  };
  const [editJanr, setEditJanr] = useState("");
  const updateJanr = (item) => {
    setEditJanr(item);
    setJanrModal(true);
    setRequired(false)
  };
  const delete_janr =(item)=> {
    setRemoveJanr(item)
    setDeleteModal(true)
  }
  const postGenre =()=> {
    setJanrModal(true)
    setRequired(true)
    console.log(required);
  }
  return (
    <div className="p-0 m-0 flex">
      <GenreModal open={janrModal} toggle={toggle} editJanr={editJanr} required={required}/>
      <DeleteGenre open={deleteModal} toggle={toggle} removeJanr={removeJanr}/>
     
      <div className="flex flex-col items-center w-[100%]">
        <button
          className="self-start  px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]"
          onClick={postGenre}
        >
          Add Genres
        </button>
        <div className="flex flex-wrap gap-[20px]">
          {janr.map((item, index) => {
            return (
             <GenreCard key={index} item={item} updateJanr={updateJanr} delete_janr={delete_janr} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Genre;
