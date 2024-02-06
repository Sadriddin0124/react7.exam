import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient/axiosClient";
import AddBook from "../../components/AddBook";
import Sidebar from "../SideBar/Sidebar";
import { Link } from "react-router-dom";
import DeleteBook from "../../components/DeleteBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState("")
  const [deleteBook, setDeleteBook] = useState(false)
  const [removeitem, setRemoveItem] = useState("")
  useEffect(() => {
    axiosClient.get("/book").then((res) => {
      setBooks(res?.data);
    });
    
  }, []);
  const [bookModal, setBookModal] = useState(false);
  const toggle = () => {
    setBookModal(false);
  };
  const editBook =(item)=> {
    setBookModal(true)
        setEdit(item)
  }
  const removeBook =(item)=> {
    setRemoveItem(item)
    setDeleteBook(true)
  }
  return (
    <div className="flex">
      <Sidebar />
      <AddBook open={bookModal} toggle={toggle} edit={edit} />
     <DeleteBook open={deleteBook} toggle={()=>setDeleteBook(false)} removeItem={removeitem}/>
      <div className="pr-[10px] pl-[300px] w-[100%]">
        <button className="px-[20px] py-[10px] bg-purple-600 text-white rounded-xl mt-[20px] my-[20px]" onClick={() => setBookModal(true)}>Add Book</button>
        <div className="flex w-[100%] gap-3 flex-wrap">
        {books.map((item, index) => {
            return (
                <div key={index} className="w-[280px] p-[10px] border-2 rounded-md">
                  <img src={item.image} alt={item.name} className="w-[100%] h-[200px] object-cover border-2"/>
                <div className="card-footer">
                  <h3>Name: {item.name}</h3>
                  <h3>Author: {item.author?.full_name}</h3>
                  <h5>Price: ${item.price}</h5>
                </div>
                <Link to={`/single__book/${item.id}`} className="no-underline mt-[10px] block text-center px-[20px] py-[10px] bg-purple-400 rounded-md text-white w-[100%] hover:bg-purple-600 transition-all">View more</Link>
                <div className="flex justify-between w-[100%]">
                    <button onClick={()=>editBook(item)} className="w-[45%] px-[15px] py-[8px] bg-violet-500 text-white rounded-md mt-[10px]">edit</button>
                    <button onClick={()=>removeBook(item)} className="w-[45%] px-[15px] py-[8px] bg-red-500 text-white rounded-md mt-[10px]">delete</button>
                </div>
              </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Books;
