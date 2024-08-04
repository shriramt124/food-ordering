import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export default function CartSidex() {
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()

  //calculate the totalquantity
  const TotalQuantity = cart.totalQuantity;
  const totalPrice = cart.totalPrice;
  console.log(TotalQuantity, totalPrice);

 function handleAddCart(item){
   dispatch(increaseQuantity(item));
   
 }
 function handleRemoveItem(item){
 dispatch(removeFromCart(item))
 toast.success("item removed successfully")
 }

  return (
    <>
      <div className="flex justify-between items-center text-white px-[20px ] sm:px-[50px] py-[10px]  ">
        <div className="flex gap-4 ">
          <span>total quantity : {TotalQuantity}</span>
          <span>total price : ${totalPrice}</span>
        </div>
        <div className="flex justify-center items-center" onClick={onToggle}>
          <button className="flex gap-2 bg-orange-500 rounded-2xl px-4 py-2">
            view Cart
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="gray.900"
          rounded="md"
          shadow="md"
        >
          <div className="relative flex w-full flex-col gap-4 justify-center items-center px-[10px] sm:px-[100px] ">
            <button className="absolute right-0 top-0" onClick={onToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-7"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex w-full justify-between ">
              <h1 className="text-3xl text-center">Your cart</h1>
              <div className="flex   gap-4 cursor-pointer">
                <p className="bg-orange-500 px-3 py-2  rounded-2xl ">
                  total quantity : {TotalQuantity}
                </p>
                <p className="bg-orange-500 px-3 py-2  rounded-2xl ">
                  total price : ${totalPrice}
                </p>
              </div>
            </div>
            <div className=" flex w-full flex-col gap-4">
              {cart.cartItems.map((item) => (
                <div
                  key={Date.now()*Math.random()}
                  className="flex justify-between  bg-slate-800 items-center rounded-md "
                >
                  <div className="flex gap-4 justify-center items-center">
                    <img
                      src={item.prodImage}
                      alt=""
                      className="w-[100px] h-[100px] rounded-md "
                    />
                    <div className="flex flex-col justify-start ">
                      <p className="text-xl capitalize">{item.title}</p>
                      <p className="text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pr-[20px] justify-center items-center">
                    <button
                      className="bg-orange-500 rounded-2xl px-4 py-2 hover:bg-orange-800 transition-all duration-300"
                      onClick={() => handleAddCart(item)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-orange-500 rounded-2xl px-4 py-2 hover:bg-orange-800 transition-all duration-300"
                      onClick={() => dispatch(decreaseQuantity(item))}
                    >
                      -
                    </button>
                    <button
                      className="bg-red-500 rounded-2xl px-4 py-2 hover:bg-orange-800 transition-all duration-300"
                      onClick={() => handleRemoveItem(item)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 capitalize">
              <button className="bg-orange-500 px-4 py-2 rounded-2xl hover:bg-orange-700 transition-all duration-300 flex gap-2 "
              onClick={()=>navigate("/checkout")}
              >
                checkout
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded-2xl hover:bg-orange-700 transition-all duration-300 "
                onClick={() => dispatch(clearCart())}
              >
                clear cart
              </button>
            </div>
          </div>
        </Box>
      </Slide>
    </>
  );
}
