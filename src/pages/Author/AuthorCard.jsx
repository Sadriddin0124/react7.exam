import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AuthorCard = ({item, updateAuthor, deleteItem}) => {
  return (
    <div>
      <div
                className="w-[250px] rounded-md flex flex-col justify-between bg-white  pb-[20px] overflow-hidden shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.full_name}
                  className="w-[100%] h-[150px] object-cover"
                />
                <div className="flex flex-col w-[100%]">
                  <div className="p-[10px] flex justify-between">
                    <h3 className="p-[10px] bg-violet-600 text-[12px] rounded-2xl text-white font-[400]">
                      {item.full_name}
                    </h3>
                    <button
                      onClick={() => updateAuthor(item)}
                      className="text-[25px] text-indigo-500"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => deleteItem(item)}
                      className="text-[25px] text-red-600"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                  <div className="px-[10px] w-[100%] flex">
                    <Link
                      to={`/single__author/${item.id}`}
                      className="no-underline px-[15px] py-[8px] text-teal-50 bg-indigo-500 rounded-md w-[100%]"
                    >
                      view more
                    </Link>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default AuthorCard
