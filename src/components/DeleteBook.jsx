import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import axiosClient from '../axiosClient/axiosClient'

const DeleteBook = ({open, toggle, removeItem}) => {
    const removeBook =()=> {
        axiosClient.delete(`/book/${removeItem.id}`).then((res)=>{
            if (res.status === 200) {
                window.location.reload()
            }
        })
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <h1>Are you sure you want to delete {removeItem?.name}?</h1>
            <button className='px-[15px] py-[8px] text-teal-50 bg-indigo-500 rounded-md mr-3' onClick={toggle}>cancel</button>
            <button className='px-[15px] py-[8px] text-teal-50 bg-red-600 rounded-md' onClick={removeBook}>delete</button>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DeleteBook
