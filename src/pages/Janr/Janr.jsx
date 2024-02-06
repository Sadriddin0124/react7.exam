import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import JanrModal from "../../components/JanrModal";
import axiosClient from "../../axiosClient/axiosClient";
import DeleteJanr from "../../components/DeleteJanr";

const Janr = () => {
  const [janr, setJanr] = useState([]);
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
  };
  const delete_janr =(item)=> {
    setRemoveJanr(item)
    setDeleteModal(true)
  }
  return (
    <div className="p-0 m-0 flex">
      <JanrModal open={janrModal} toggle={toggle} editJanr={editJanr}/>
      <DeleteJanr open={deleteModal} toggle={toggle} removeJanr={removeJanr}/>
      <div>
        <Sidebar />
      </div>
      <div className="ml-[300px]">
        <button
          className="btn btn-success my-[20px]"
          onClick={() => setJanrModal(true)}
        >
          Add Genres
        </button>
        <div className="flex flex-wrap gap-[20px]">
          {janr.map((item, index) => {
            return (
              <div key={index} className="border-2 p-[10px] rounded-lg">
                <h1>{item.name}</h1>
                <div className="flex gap-[10px]">
                  <button
                    onClick={() => updateJanr(item)}
                    className="text-white px-[15px] py-[8px] rounded-md bg-violet-500"
                  >
                    edit
                  </button>
                  <button onClick={()=>delete_janr(item)} className="text-white px-[15px] py-[8px] rounded-md bg-red-900">
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Janr;
