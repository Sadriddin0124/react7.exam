import React from 'react'
import axiosClient from '../axiosClient/axiosClient'
import { Modal, ModalBody } from 'reactstrap'

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
            <h1>Are you sure you want to delete {remove?.full_name}?</h1>
            <button className='px-[15px] py-[8px] text-teal-50 bg-indigo-500 rounded-md mr-3' onClick={toggle}>cancel</button>
            <button className='px-[15px] py-[8px] text-teal-50 bg-red-600 rounded-md' onClick={removeAuthor}>delete</button>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DeleteAuthor
