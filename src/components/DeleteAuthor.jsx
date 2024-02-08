import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import axiosClient from '../plugins/axiosClient'
import deleteLogo from "../assets/delete.png"

const DeleteAuthor = ({open, toggle, remove}) => {
    const removeAuthor =()=> {
        axiosClient.delete(`/author/${remove.id}`).then((res)=> {
            if(res?.status === 200) {
                window.location.reload()
            }
        })
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
        <div className='w-[100%] h-[100%] flex flex-col items-center gap-3'>
            <img className='w-[100px] h-[100px] rounded-full border-4 border-[#a83636]' src={deleteLogo} alt="delete" />
            <h1 className='text-center text-[20px]'>Are you sure you want to delete <span className='text-[red]'>{remove?.full_name}</span>?</h1>
            <div className='flex '>
            <button className='px-[15px] py-[8px] text-teal-50 bg-purple-500 rounded-md mr-3' onClick={toggle}>cancel</button>
            <button className='px-[15px] py-[8px] text-teal-50 bg-red-600 rounded-md' onClick={removeAuthor}>delete</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DeleteAuthor
