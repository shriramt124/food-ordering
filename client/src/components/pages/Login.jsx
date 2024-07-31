import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const rowclasses = "flex flex-col gap-2 sm:gap-4";
const inputClasses =
  "p-2 rounded-md focus:outline-none focus:border-orange-500 focus:border-2 transition-all duration-300 active:bg-slate-400 ";
const initialData = {
  email: "",
  password: "",
  role:"admin"
};
function Login() {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function fetchData() {
    const res = await fetch("http://localhost:4000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log(formData)
      const data = await fetchData();
      if (data.status === 500) {
        throw new Error(data.message);
      }
      setFormData(initialData);
       setIsLoading(false);
      toast.success("User loggedin successfull")
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      
      toast.error(error.message)
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:items-stretch mt-[100px] pb-[100px]">
      <div className="w-full sm:w-2/4 lg:w-1/4">
        <img
          src="login.jpg"
          alt="food "
          className="w-[90%] sm:w-full m-auto hover:scale-[1.012] rounded-md transition-all duration-400  "
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4 w-full sm:w-2/4 lg:w-1/4 bg-slate-300 p-6 sm:p-6 rounded-md shadow-md shadow-slate-800">
        <h1 className="text-center capitalize text-xl sm:text-4xl">Login</h1>
        <div className={rowclasses}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div className={rowclasses}>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            placeholder="password"
            className={inputClasses}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={rowclasses}>
          <label htmlFor="role">Role : </label>
          <select name="role" id="role" value={formData.role} onChange={handleChange}>
            <option name="user" id="user">user</option>
            <option name="admin" id="admin">admin</option>
          </select>
        </div>
        <div className={rowclasses}>
          <button className="p-2 bg-orange-500 text-white capitalize text-xl rounded-md hover:bg-orange-800 transition-all duration-300">
            {isLoading ? "Loading..":"Login"}
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p>
            Dont have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-semibold capitalize"
            >
              Signup
            </a>
          </p>
          <p>
            <a
              href="/forgot-password"
              className="text-blue-600 text-md font-semibold capitalize "
            >
              forgot password
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
