import React, { useEffect, useState } from "react";
import AuthorModal from "../../components/AuthorModal";
import DeleteAuthor from "../../components/DeleteAuthor";
import axiosClient from "../../plugins/axiosClient";
import AuthorCard from "./AuthorCard";

const Author = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [authors, setAuthors] = useState([]);
  const [required, setRequired] = useState(false)
  useEffect(() => {
    axiosClient.get("/author").then((res) => {
      setAuthors(res?.data);
    });
  }, []);
  const [authorModal, setAuthorModal] = useState(false);
  const [editAuthor, setEditAuthor] = useState("");
  const [removeAuthor, setRemoveAuthor] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const toggle = () => {
    setAuthorModal(false);
    setRemoveAuthor("");
    setDeleteModal(false);
    setEditAuthor("")
  };
  const updateAuthor = (item) => {
    console.log(startDate);
    setEditAuthor(item);
    setAuthorModal(true)
    setRequired(false)
  };
  const deleteItem = (item) => {
    setRemoveAuthor(item);
    setDeleteModal(true);
  };
 const postAuthor =()=> {
  setRequired(true)
  setAuthorModal(true)
 }
  return (
    <div className="flex">
      <AuthorModal open={authorModal} toggle={toggle} update={editAuthor} required={required}/>
      <DeleteAuthor
        open={deleteModal}
        toggle={toggle}
        remove={removeAuthor}
      />
      <div className="pr-[10px] w-[100%] flex flex-col items-center">
        <button
          className="self-start px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]"
          onClick={postAuthor}
        >
          Add Author
        </button>
        <div className="flex flex-wrap gap-[15px]">
          {authors?.map((item, index) => {
            return (
              <AuthorCard item={item} key={index} updateAuthor={updateAuthor} deleteItem={deleteItem} startDate={startDate} setStartDate={setStartDate}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Author;
