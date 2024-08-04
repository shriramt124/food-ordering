import React from 'react'
import TabPanelui from '../ui/TabPanel'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from './../../utils/helpers';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearCart } from '../../store/cartSlice';

const inputClassName = "rounded-md p-2"
function CheckOut() {
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    function handleOrderNow(){

        toast.success("order placed successfully")
        dispatch(clearCart())
       navigate("/")
    }

  return (
     <div className='flex flex-col tab:flex-row justify-center  w-full mt-8 gap-1 px-[10px] sm:px-[100px]'>
            <div className='relative w-full gap-4 tab:w-2/4 lg:2-2/5 xl:w-2/6 bg-orange-600 text-white flex flex-col items-center p-[20px] rounded-md '>
            <h1 className='text-2xl sm:text-3xl capitalize font-customFont mb-[20px]'>Order Summary</h1>
            <div className='flex flex-col gap-4 w-full my-4'>
                {cart.cartItems.map(item=>(
                    <div key={item._id} className='flex justify-between w-full '>
                        <p>{item.title}</p>
                        <p>{item.quantity}</p>
                        <p>{formatCurrency(item.price)}</p>
                    </div>
                ))}
            </div>
            <div className='flex gap-6 absolute bottom-2  '>
                <p>TotalPrice : {formatCurrency(cart.totalPrice)}</p>
                <p>totalQuantity : {(cart.totalQuantity)}</p>
            </div>
        </div>
        <form className=' flex flex-col gap-4 justify-center rounded-xl w-full tab:w-2/4 lg:2-2/5 xl:w-2/6  bg-slate-900 text-white p-4'>
         <Link to={-1} className='text-orange-500 '>back</Link>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="fullname">Full Name :</label>
                <input className={inputClassName} type="text" name="fullname" placeholder='fullname..' />
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="email">Email:</label>
                <input className={inputClassName} type="email" name="email" placeholder='email..' />
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="phoneNo">PhoneNo :</label>
                <input className={inputClassName} type="number" name="phoneNo" placeholder='PhoneNo..' />
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="address">Address :</label>
                <input className={inputClassName} type="text" name="address" placeholder='Address..' />
            </div>
            <div>
               <button className='bg-orange-500 px-4 py-2 rounded-2xl hover:bg-orange-700 transition-all duration-300 ' onClick={handleOrderNow}>Order now</button>  
            </div>
           
        </form>
     
     </div>
  )
}

export default CheckOut