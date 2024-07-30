 
import React from "react";
 
const rowclasses = "flex flex-col gap-2 sm:gap-4";
const inputClasses ="p-2 rounded-md focus:outline-none focus:border-orange-500 focus:border-2 transition-all duration-300 active:bg-slate-400 ";
function Login() {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:items-stretch mt-[100px] pb-[100px]">
        
      <div className="w-full sm:w-2/4 lg:w-1/4">
        <img
          src="login.jpg"
          alt="food "
          className="w-[90%] sm:w-full m-auto hover:scale-[1.012] rounded-md transition-all duration-400  "
        />
      </div>
      <form className="flex flex-col  gap-4 w-full sm:w-2/4 lg:w-1/4 bg-slate-300 p-6 sm:p-6 rounded-md shadow-md shadow-slate-800">
                   <h1 className="text-center capitalize text-xl sm:text-4xl">Login</h1>
        <div className={rowclasses}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="email" className={inputClasses} />
        </div>
        <div className={rowclasses}>
          <label htmlFor="password">Password : </label>
          <input type="password" placeholder="password"  className={inputClasses} />
        </div>
        <div className={rowclasses}>
          <button className="p-2 bg-orange-500 text-white capitalize text-xl rounded-md hover:bg-orange-800 transition-all duration-300">Login</button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p>
            Dont have an account? <a href="/signup" className="text-blue-600 font-semibold capitalize">Signup</a>
          </p>
          <p>
           <a href="/forgot-password" className="text-blue-600 text-md font-semibold capitalize ">forgot password</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
