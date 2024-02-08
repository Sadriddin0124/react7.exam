import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../plugins/axiosClient";
import upload from "../assets/upload.jpg"
const AddBook = ({ open, toggle, edit, imglink, setImgLink, required }) => {
  const [janrlar, setJanrlar] = useState([])
  const [authors, setAuthors] = useState([])
  useEffect(()=> {
    axiosClient.get("/category/get/all").then((res)=> {
      setJanrlar(res?.data)
    })
    axiosClient.get("/author").then((res)=> {
      setAuthors(res?.data)
    })
    
  },[])
  const imageUpload =(e)=> {
    let file = e.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
      axiosClient.post("/files/upload", formData).then((res)=> {
        console.log(res.data);
        setImgLink(res?.data?.link)
      }).catch((err)=> {
        console.log(err);
      })
    console.log(file);
  }
  const addNewBook =(e)=> {
    e.preventDefault()
    let payload = {
      name: e.target[1].value? e.target[1].value : edit.name,
      author_id: +e.target[2].value ? +e.target[2].value : edit.author_id,
      price: +e.target[3].value ? +e.target[3].value : edit.price,
      code: e.target[4].value ? e.target[4].value : edit.code,
      janr_id: +e.target[5].value ? +e.target[5].value : edit.janr_id,
      description: e.target[6].value ? e.target[6].value : edit.description,
      image: imglink ? imglink : edit.image
    }
    
    if (edit !== "") {
        axiosClient.patch(`/book/${edit.id}`, {...payload}).then((res)=> {
          if(res?.status === 200){
            window.location.reload()
          }
        }).catch((err)=> {
          console.log(err);
        })
    }    
    else {
      axiosClient.post("/book/create", {...payload}).then((res)=>{
            if(res?.status === 201){
              window.location.reload()
            }
          }).catch((err)=> {
            console.log(err);
          })
    }
  }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <form onSubmit={addNewBook} className="flex flex-wrap">
            <div className="w-[30%] relative flex items-center">
              <img src={`${imglink === "" ? upload: imglink}`} alt="upload" className="w-[90%] mx-2 object-cover h-[50%] absolute z-0 mix-blend-multiply"/>
              <input required={required} type="file" className="w-[100%] cursor-crosshair h-[100%] z-10 absolute opacity-0"  onChange={imageUpload}/>
            </div>
            <div className="w-[70%]">
              <input required={required}
                type="text"
                className="form-control my-2"
                placeholder="Name"
                defaultValue={edit.name}
              />
              <select className="form-control my-2" defaultValue={edit?.author?.full_name}>
                <option value="" hidden>Author</option>
                {
                  authors.map((item, index)=> <option key={index} value={item.id}>{item.full_name}</option>)
                }
              </select>
              <input required={required}
                type="number"
                className="form-control my-2"
                placeholder="Price"
                defaultValue={edit.price}
              />
              <input required={required}
                type="text"
                className="form-control my-2"
                placeholder="Book code"
                defaultValue={edit.code}
              />
              <select className="form-control my-2"  placeholder="Janr ID" defaultValue={edit?.janr?.name}>
                <option value="" hidden>Genre</option>
                {
                  janrlar.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                }
                </select>
            </div>
              <textarea
                type="text"
                className="form-control my-2 w-[100%]"
                placeholder="Description"
                rows="5"
                defaultValue={edit.description}
              ></textarea>
              <button className="btn btn-primary">Save</button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddBook;
