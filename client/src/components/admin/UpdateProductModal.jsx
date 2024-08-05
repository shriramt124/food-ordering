import { useState } from "react";
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
import { Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function UpdateProductModal({ item, updateProduct }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    category: item.category,
    price: item.price,
  });
   
  const navigate = useNavigate()

  const [imageFile, setImageFile] = useState(null);

  function handleChangeFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSelectImage(e) {
    const file = e.target.files[0];
    setImageFile(file);
  }

  async function submitData() {
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    const res = await fetch(
      `https://food-ordering-67si.onrender.com/api/v1/product/updateProduct/${item._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      }
    );

    const resData = await res.json();
    if (!res.ok) {
      if (resData.code && resData.code === "AccessTokenExpired") {
        toast.error("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      throw new Error(resData.message);
    }

    return resData;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await submitData();

      if (data.status === 500) {
        throw new Error(data.message);
      }

      toast.success("Product updated successfully");
      setIsLoading(false);
      updateProduct(data.data); // Update the product in the parent component
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {isLoading ? (
            <div className="flex justify-center items-start">
              <Spinner
                thickness="6px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          ) : (
            <ModalBody pb={6}>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-4"
              >
                <div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleSelectImage}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="capitalize text-xl font-bold"
                    htmlFor="title"
                  >
                    Title
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
                    Description
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
                    Category
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
                  <label
                    className="capitalize text-xl font-bold"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    className="text-xl border-2 border-slate-900 rounded-md p-2"
                    type="number"
                    value={formData.price}
                    onChange={handleChangeFormData}
                    name="price"
                  />
                </div>
                
              </form>
            </ModalBody>
          )}

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3} onClick={handleSubmit}>
              {isLoading ? "submitting..":"update"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
