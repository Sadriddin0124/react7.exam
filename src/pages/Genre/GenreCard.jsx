import React from "react";
import { MdDeleteOutline } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'

const GenreCard = ({item, updateJanr, delete_janr}) => {
  return (
    <div>
      <div className="border-2 p-[10px] rounded-lg bg-white flex gap-[10px]">
        <h1 className="text-[26px]">{item.name}</h1>
        <div className="flex gap-[10px]">
          <button
            onClick={() => updateJanr(item)}
            className="text-[24px] text-violet-500"
          >
            <CiEdit/>
          </button>
          <button
            onClick={() => delete_janr(item)}
            className="text-[24px] text-red-600"
          >
            <MdDeleteOutline/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
