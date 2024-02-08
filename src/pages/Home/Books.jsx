import React, { useEffect, useState } from "react";
import AddBook from "../../components/AddBook";
import DeleteBook from "../../components/DeleteBook";
import axiosClient from "../../plugins/axiosClient";
import BookCard from "./BookCard";

const Books = () => {
  const [required, setRequired] = useState(false)
  const [imglink, setImgLink] = useState("")
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState("");
  const [deleteBook, setDeleteBook] = useState(false);
  const [removeitem, setRemoveItem] = useState("");
  useEffect(() => {
    axiosClient.get("/book").then((res) => {
      setBooks(res?.data);
    });
  }, []);
  const [bookModal, setBookModal] = useState(false);
  const toggle = () => {
    setBookModal(false);
    setEdit("")
    setImgLink("")
  };
  const editBook = (item) => {
    setBookModal(true);
    setEdit(item);
    setImgLink(item.image)
    setRequired(false)
  };
  const removeBook = (item) => {
    setRemoveItem(item);
    console.log(item);
    setDeleteBook(true);
  };
  const postBook =()=> {
    setRequired(true)
    setBookModal(true)
  }
  return (
    <div className="flex">
      <AddBook open={bookModal} toggle={toggle} edit={edit} imglink={imglink} setImgLink={setImgLink} required={required}/>
      <DeleteBook
        open={deleteBook}
        toggle={() => setDeleteBook(false)}
        removeItem={removeitem}
      />
      <div className="pr-[10px] w-[100%] flex flex-col items-center">
        <button
          className="self-start px-[20px] py-[10px] bg-purple-600 text-white rounded-xl mt-[20px] my-[20px]"
          onClick={postBook}
        >
          Add Book
        </button>
        <div className="flex gap-3 flex-wrap w-[90%]">
          {books.map((item, index) => {
            return (
              <BookCard key={index} item={item} removeBook={removeBook} updateBook={editBook}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Books;
