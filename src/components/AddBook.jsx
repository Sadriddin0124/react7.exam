import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import axiosClient from "../axiosClient/axiosClient";
import 'react-toastify/dist/ReactToastify.css';
const AddBook = ({ open, toggle, edit }) => {
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
  const [file, setFile] = useState(null)
  const [imglink, setImgLink] = useState("")
  const [required, setRequired] = useState(false)
  const addNewBook =(e)=> {
    e.preventDefault()
    let payload = {
      name: e.target[1].value? e.target[1].value : edit.name,
      author_id: +e.target[2].value ? +e.target[2].value : edit.author_id,
      price: +e.target[3].value ? +e.target[3].value : edit.price,
      code: e.target[4].value ? e.target[4].value : edit.code,
      janr_id: +e.target[5].value ? +e.target[5].value : edit.janr_id,
      description: e.target[6].value ? e.target[6].value : edit.description,
    }
    const formData = new FormData()
    formData.append("file", file)
    if (edit !== "") {
      setRequired(false)
      if(file) {
        axiosClient.post("/files/upload", formData).then((res)=> {
          setImgLink(res?.data?.link)
          axiosClient.patch(`/book/${edit.id}`, {...payload, image: res?.data?.link}).then((res)=> {
            if(res?.status === 200){
              window.location.reload()
            }
          }).catch((err)=> {
            console.log(err);
          })
        }).catch((err)=> {
          console.log(err);
        })
      } else {
        axiosClient.patch(`/book/${edit.id}`, {...payload, image: edit.image}).then((res)=> {
          if(res?.status === 200){
            window.location.reload()
          }
        }).catch((err)=> {
          console.log(err);
        })
      }
    }    
    else {
      setRequired(true)
      axiosClient.post("/files/upload", formData).then((res)=> {
        console.log(res.data);
        setImgLink(res?.data?.link)
        if (res?.status === 201) {
          axiosClient.post("/book/create", {...payload, image: res?.data?.link}).then((res)=>{
                if(res?.status === 201){
                  window.location.reload()
                }
              }).catch((err)=> {
                console.log(err);
              })
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
            <div className="w-[30%] relative ">
              <img src={`${imglink === "" ? "https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg": imglink}`} alt="upload" className="w-[100%] h-[100%] absolute z-0 object-contain mix-blend-multiply"/>
              <input required={required} type="file" className="w-[100%] h-[100%] z-10 absolute opacity-0 cursor-pointer"  onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
            <div className="w-[70%]">
              <input required={required}
                type="text"
                className="form-control my-2"
                placeholder="Name"
                defaultValue={edit.name}
              />
              <select className="form-control my-2"  placeholder="Author ID" defaultValue={edit?.author?.full_name}>
                {
                  authors.map(item=> <option value={item.id}>{item.full_name}</option>)
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
                {
                  janrlar.map(item => <option value={item.id}>{item.name}</option>)
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
