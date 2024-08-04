import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function BookTable() {
  const initialData = {
    fullname: "",
    email: "",
    phoneNo: "",
    persons: 2,
    date: new Date().toLocaleDateString(),
  };
  const navigate = useNavigate();
  const [Data, setData] = useState(initialData);
  console.log(initialData);
  function handleChange(e) {
    setData({ ...Data, [e.target.name]: e.target.value });
  }
  function handleBook() {
    if(!Data.fullname || !Data.email || !Data.phoneNo || !Data.date){
        toast.error("Please provide all the fields")
        return;
    }
    toast.success("your table booked successfully");
    navigate("/products");
  }
  return (
    <div className="flex flex-col justify-center items-center   my-[50px] px-[10px] sm:px-[50px] lg:px-[70px] xl:px-[100px]">
      <h1 className="text-5xl font-customFont my-[20px] ">Book A table</h1>
      <form className="flex flex-col gap-4    p-2 w-full sm:w-2/4 lg:w-2/5 mt-[20px] ">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 sm:p-4 border-2 border-slate-900 active:bg-orange-500 rounded-md focus:outline-none transition-all duration-300 "
          name="fullname"
          value={Data.fullname}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="PHONE Number"
          className="p-3 sm:p-4 border-2 border-slate-900 active:bg-orange-500 rounded-md focus:outline-none transition-all duration-300 "
          name="phoneNo"
          value={Data.phoneNo}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 sm:p-4 border-2 border-slate-900 active:bg-orange-500 rounded-md focus:outline-none transition-all duration-300 "
          name="email"
          value={Data.email}
          onChange={handleChange}
        />
        <select
          name="persons"
          id="persons"
          className="p-3 sm:p-4 border-2 border-slate-900 active:bg-orange-500 rounded-md focus:outline-none transition-all duration-300 "
          value={Data.persons}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input
          type="date"
          className="p-3 sm:p-4 border-2 border-slate-900 active:bg-orange-500 rounded-md focus:outline-none transition-all duration-300 "
          name="date"
          value={Data.date}
          onChange={handleChange}
        />
      </form>
      <div className="flex flex-wrap justify-center"></div>
      <button
        onClick={handleBook}
        className="bg-orange-600 px-4 py-2 rounded-2xl text-white hover:bg-orange-700 text-2xl capitalize my-[20px]"
      >
        book now
      </button>
    </div>
  );
}

export default BookTable;
