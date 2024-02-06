import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import axiosClient from '../axiosClient/axiosClient'

const DeleteJanr = ({open, toggle, removeJanr}) => {
    const remove_janr =()=> {
        axiosClient.delete(`/category/delete/${removeJanr.id}`).then((res)=> {
            if(res.status === 200){
                window.location.reload()
            }
        })
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <h1>Are you sure you want to delete {removeJanr?.name}?</h1>
            <button className='px-[15px] py-[8px] text-teal-50 bg-indigo-500 rounded-md mr-3' onClick={toggle}>cancel</button>
            <button className='px-[15px] py-[8px] text-teal-50 bg-red-600 rounded-md' onClick={remove_janr}>delete</button>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DeleteJanr