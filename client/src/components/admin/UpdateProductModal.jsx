// UpdateProductModal.js
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ImagePicker from "../ui/ImagePicker";
import toast from "react-hot-toast";

export default function UpdateProductModal({ item }) {
    console.log(item._id,"from item update product")
  const [formData, setFormdata] = useState({
    title: item.title,
    description: item.description,
    category: item.category,
    price: item.price,
    image: item.prodImage,
  });
  function handleChangeFormData(e) {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  }
  async function submitData(data){
    const res = await fetch(`http://localhost:4000/api/v1/product/updateProduct/${item._id}`,{
      method:"PUT",
      credentials:'include',
        headers:{
            "Content-Type":"application/json"
        }, 
      body:JSON.stringify({...formData,id:item._id})
    })
    const resdata = await res.json();
    if(!res.ok){
        throw new Error(resdata.message);
    }
    console.log(resdata);
    return resdata;
  }
  async function handleSubmit(e){
   e.preventDefault();
    try {
      const data = await submitData(formData);
       if(data.status === 500){
        throw new Error(data.message);
       }
       toast.success("Product updated successfully");
       onClose();
      
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }

  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imagePath, setImagePath] = useState(null); // State to store the image path

  const handleImageSelect = (path) => {
    
    setImagePath(path);
  

  };

  return (
    <>
      <p onClick={onOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
      </p>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-4">
              <div>
                <ImagePicker onImageSelect={handleImageSelect} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="capitalize text-xl font-bold" htmlFor="title">
                  title
                </label>
                <input
                  className="p-4 border-2 border-slate-900 rounded-md outline-none focus:outline-none capitalize active:bg-orange-600 active:text-white transition-all duration-300"
                  type="text"
                  value={formData.title}
                  onChange={handleChangeFormData}
                  name="title"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="capitalize text-xl font-bold"
                  htmlFor="description"
                >
                  description
                </label>
                <textarea
                  cols="15"
                  rows="4"
                  value={formData.description}
                  onChange={handleChangeFormData}
                  name="description"
                  className="p-2 capitalize border-2 border-slate-900 rounded-md focus:outline-none focus:border-orange-600 active:bg-orange-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="capitalize text-xl font-bold"
                  htmlFor="category"
                >
                  category
                </label>
                <select
                  className="bg-orange-500 p-2 rounded-md text-white capitalize"
                  name="category"
                  id=""
                  value={formData.category}
                  onChange={handleChangeFormData}
                >
                  <option value="dinner">dinner</option>
                  <option value="breakfast">breakfast</option>
                  <option value="burger">burger</option>
                  <option value="pizza">pizza</option>
                  <option value="pasta">pasta</option>
                  <option value="sandwitch">sandwitch</option>
                  <option value="vegetable">vegetable</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="capitalize text-xl font-bold" htmlFor="price">
                  Price
                </label>
                <input
                  className="text-xl border-2 border-slate-900 rounded-md p-2"
                  type="text"
                  value={formData.price}
                  onChange={handleChangeFormData}
                  name="price"
                />
              </div>
              <button>submit</button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
