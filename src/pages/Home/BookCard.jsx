import React from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const BookCard = ({ item, updateBook, removeBook }) => {
  return (
    <div>
      <div className="w-[480px] shadow-md rounded-md bg-white p-[10px] flex flex-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="w-[60%] h-[200px] object-cover border-2"
        />
        <div className=" w-[40%] p-[10px]">
          <h3 className="text-[20px]">Name: {item?.name}</h3>
          <h3 className="text-[20px]">Author: {item?.author?.full_name}</h3>
          <h5>Price: ${item?.price}</h5>
          <div className="flex gap-[20px] w-[100%]">
            <button
              onClick={() => updateBook(item)}
              className="text-violet-500 mt-[10px] text-[25px]"
            >
              <CiEdit/>
            </button>
            <button
              onClick={() => removeBook(item)}
              className="text-red-500 mt-[10px] text-[25px]"
            >
              <MdDeleteOutline/>
            </button>
          </div>
        </div>
        <Link
          to={`/single__book/${item.id}`}
          className="no-underline mt-[10px] block text-center px-[20px] py-[10px] bg-purple-400 rounded-md text-white w-[100%] hover:bg-purple-600 transition-all"
        >
          View more
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
