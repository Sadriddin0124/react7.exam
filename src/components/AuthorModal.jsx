import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import axiosClient from "../plugins/axiosClient";
import upload from "../assets/upload.jpg"
import "react-datepicker/dist/react-datepicker.css";
const AuthorModal = ({ open, toggle, update, required }) => {
  const [imagelink, setImageLink] = useState("");
  const imageUpload = (e) => {
    let image = e.target.files[0]
    const imgData = new FormData();
    imgData.append("file", image);
    axiosClient.post("/files/upload", imgData).then((res) => {
      setImageLink(res?.data?.link);
    }).catch((err)=> {
      console.log(err);
    })
  }
  const addAuthor = (e) => {
    e.preventDefault();
    
    let payload = {
      full_name: e.target[1].value ? e.target[1].value : update.full_name,
      birthdate: e.target[2].value ? e.target[2].value : update.birthdate,
      country: e.target[3].value ? e.target[3].value : update.country,
      image: imagelink? imagelink : update.image
    };
    if (update !== "") {
          axiosClient
            .patch(`/author/${update.id}`, { ...payload })
            .then((res) => {
              if (res?.status === 200) {
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
    } else {
      axiosClient.post("/author", {...payload, image: imagelink}).then((res) => {
        if (res.status === 201) {
          window.location.reload();
        }
      });      
    }
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <form onSubmit={addAuthor} className="flex flex-wrap">
            <div className="w-[40%] relative">
              <input
                type="file"
                className="absolute w-[100%] h-[100%] opacity-0 z-20 cursor-crosshair"
                onChange={imageUpload}
                required={required}
              />
              <img
                className="w-[100%] absolute top-0 h-[100%] object-contain p-[10px]"
                src={`${
                  imagelink
                  ? imagelink
                  : upload
                }`}
                alt="author"
              />
            </div>
            <div className="w-[60%]">
              <input
                type="text"
                className="form-control my-2"
                placeholder="Fullname"
                defaultValue={update.full_name}
                required={required}
              />
              <input
                type="date"
                className="form-control my-2"
                placeholder="Birthdate"
                defaultValue={update.birthdate}
                required={required}
              />
              <input
                type="text"
                className="form-control my-2"
                placeholder="Country"
                defaultValue={update.country}
                required={required}
              />
            </div>
            <button className="btn btn-primary " type="submit">
              Save
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AuthorModal;
