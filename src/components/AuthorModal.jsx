import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import axiosClient from "../axiosClient/axiosClient";

const AuthorModal = ({ open, toggle, update }) => {
  const [img, setImg] = useState(null);
  const [imagelink, setImageLink] = useState("");
  const [required, setRequired] = useState(false)
  const addAuthor = (e) => {
    e.preventDefault();
    const imgData = new FormData();
    imgData.append("file", img);
    let payload = {
      full_name: e.target[1].value ? e.target[1].value : update.full_name,
      birthdate: e.target[2].value ? e.target[2].value : update.birthdate,
      country: e.target[3].value ? e.target[3].value : update.country,
    };
    if (update !== "") {
      setRequired(false)
        if (img) {
          axiosClient.post("/files/upload", formData).then((res) => {
              setImageLink(res?.data?.link);
              if (res.status === 201) {
                axiosClient.patch(`/author/${update.id}`, {...payload, image: res?.data?.link})
                  .then((res) => {
                    if (res?.status === 200) {
                      window.location.reload();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          axiosClient
            .patch(`/author/${update.id}`, { ...payload, image: update.image })
            .then((res) => {
              if (res?.status === 200) {
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
      }
    } else {
      setRequired(true)
      axiosClient.post("/files/upload", imgData).then((res) => {
        setImageLink(res?.data?.link);
        console.log(res);
        if (res.status == 201) {
          axiosClient.post("/author", {...payload, image: res?.data?.link}).then((res) => {
            if (res.status === 201) {
              toggle();
            }
          });
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
                className="absolute w-[100%] h-[100%] opacity-0 z-20"
                onChange={(e) => setImg(e.target.files[0])}
                required={required}
              />
              <img
                className="w-[100%] absolute top-0 h-[100%] object-contain"
                src={`${
                  imagelink === ""
                    ? "https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-image-upload-icon-photo-upload-icon-png-image_2047546.jpg"
                    : imagelink
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
