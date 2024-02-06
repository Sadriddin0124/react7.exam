import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import AuthorModal from "../../components/AuthorModal";
import axiosClient from "../../axiosClient/axiosClient";
import { Link } from "react-router-dom";
import DeleteAuthor from "../../components/DeleteAuthor";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axiosClient.get("/author").then((res) => {
      setAuthors(res?.data);
    });
  }, []);
  const [authorModal, setAuthorModal] = useState(false);
  const [editAuthor, setEditAuthor] = useState('')
  const [removeAuthor, setRemoveAuthor] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const toggle = () => {
    setAuthorModal(false);
  };
  const updateAuthor =(item)=> {
    setEditAuthor(item)
    setAuthorModal(true)
  }
  const deleteItem =(item)=> {
    setRemoveAuthor(item)
    setDeleteModal(true)
  }
  const closeDelete =()=> {
    setDeleteModal(false)
    setRemoveAuthor("")
  }
  return (
    <div className="flex">
      <AuthorModal open={authorModal} toggle={toggle} update={editAuthor}/>
      <DeleteAuthor open={deleteModal} toggle={closeDelete} remove={removeAuthor}/>
      <div>
        <Sidebar />
      </div>
      <div className="ml-[300px]">
        <button
          className="btn btn-success my-[20px]"
          onClick={() => setAuthorModal(true)}
        >
          Add Author
        </button>
        <div className="flex flex-wrap gap-[15px]">
          {authors?.map((item, index) => {
            return (
              <div key={index} className="w-[200px] border-2 rounded-md flex flex-col justify-between p-[10px]">
                <img
                  src={item.image}
                  alt={item.full_name}
                  className="w-[100%] h-[150px] object-cover  border-2"
                />
                <div className="flex flex-col">
                  <h3 className="p-[10px]">{item.full_name}</h3>
                  <div className="p-[10px]">
                    <button onClick={()=>updateAuthor(item)} className="px-[15px] py-[8px] text-teal-50 bg-indigo-500 rounded-md mr-3">
                      edit
                    </button>
                    <button onClick={()=>deleteItem(item)} className="px-[15px] py-[8px] text-teal-50 bg-red-600 rounded-md">
                      delete
                    </button>
                  </div>
                    <Link to={`/single__author/${item.id}`} className=" no-underline px-[15px] py-[8px] text-teal-50 bg-indigo-500 rounded-md mr-3 w-[100%]">
                      view more
                    </Link>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Author;
