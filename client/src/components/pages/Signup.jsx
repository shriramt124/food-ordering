import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const rowclasses = "flex flex-col gap-2 sm:gap-4";
const inputClasses =
  "p-2 rounded-md focus:outline-none focus:border-orange-500 focus:border-2 transition-all duration-300 active:bg-slate-400 ";

const intialData = {
  username: "",
  email: "",
  password: "",
};
function Signup() {
  const [formData, setFormData] = useState(intialData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function fetchData() {
    const res = await fetch("http://localhost:4000/api/v1/user/register", {
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await fetchData();
      if (data.status === 500) {
        throw new Error(data.message);
      }

      toast.success("User created successfully");
      setFormData(intialData);
      navigate("/login");
    } catch (error) {
      console.log(error.message);

      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:items-stretch mt-[100px] p-[20px] lg:p-[50px] xl:p-[100px]">
      <div className="w-full sm:w-2/4 tab:w-1/4">
        <img
          src="login.jpg"
          alt="food "
          className="w-full m-auto hover:scale-[1.012] rounded-md transition-all duration-400  "
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-4 w-full sm:w-2/4 tab:w-1/4 bg-slate-300 p-6 sm:p-6 rounded-md shadow-md shadow-slate-800"
      >
        <h1 className="text-center capitalize text-xl sm:text-4xl">Signup</h1>
        <div className={rowclasses}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="username.."
            className={inputClasses}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={rowclasses}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            className={inputClasses}
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          <button className="p-2 bg-orange-500 text-white capitalize text-xl rounded-md hover:bg-orange-800 transition-all duration-300">
            Login
          </button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p>
            have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold capitalize"
            >
              login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
