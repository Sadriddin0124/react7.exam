import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import axiosClient from '../plugins/axiosClient'

const GenreModal = ({open, toggle, editJanr, required}) => {
    const addJanr =(e)=> {
        e.preventDefault()
        let payload = {
            name: e.target[0].value ? e.target[0].value : editJanr.name
        }
        if(editJanr !== "") {
          axiosClient.patch(`/category/update/${editJanr.id}`, {...payload}).then((res)=> {
            if(res.status === 200){
              window.location.reload()
            }
          })
        }
        else {
          axiosClient.post("/category/create", {...payload}).then((res)=> {
            if(res.status === 201){
              window.location.reload()
            }
          })
        }
    }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <div className='w-[100%] flex flex-col items-center'>
            <h1 className='text-[28px] text-center my-[20px]'>{editJanr ? "Edit Genre" : "Add Genre"}</h1>
            <form onSubmit={addJanr} className='flex flex-col items-center w-[70%]'>
                <input required={required} type="text" className='form-control my-[20px]'  placeholder="Genre" defaultValue={editJanr.name}/>
                <button className='  px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]'>Save</button>
            </form>
            </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default GenreModal
