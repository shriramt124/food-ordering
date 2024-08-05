import React from "react";
import Footerui from "./Footerui";
import Sliderui from "../ui/Slider";
import Slider from "../ui/Slider";

function Home() {
  return (
    <div>
      <div className="bg-homebg  bg-cover bg-no-repeat  bg-center   h-[70vh] lg:h-screen text-white px-[20px] sm:px-[50px] py-[50px]">
        <div className="w-full sm:w-2/4  flex flex-col gap-4 sm:gap-14 mt-[30px]">
          <h1 className="text-2xl sm:text-5xl font-customFont">Food order</h1>
          <p className="text-md sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            dolorum illo illum quasi, nostrum quisquam delectus eaque, eligendi
            quaerat recusandae aliquid quas esse! Cumque magnam veritatis
            deserunt odit soluta dolores.
          </p>
          <p className="bg-orange-500 px-6 py-4 rounded-full self-start text-2xl">
            Order now
          </p>
        </div>
      </div>
      {/* Home card */}
      <div className="flex gap-4 flex-col lg:flex-row text-white px-[20px] sm:px-[100px] justify-around items-center py-[20px] sm:py-[50px] lg:py-[100px]">
        <div className="flex flex-col sm:flex-row  justify-center items-center bg-slate-900 p-[20px] px-[50px] rounded-xl gap-4">
          <div className="w-[200px] rounded-full border-4 border-yellow-500">
            <img src="o1.jpg" alt="" className="w-[200px] rounded-full " />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <h1 className="text-3xl ">Tasty Friendship day</h1>
            <p className="font-customFont text-xl">20% off</p>
            <button className="self-start">order now</button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center bg-slate-900 p-[20px] px-[50px] rounded-xl gap-4">
          <div className="w-[200px] rounded-full border-4 border-yellow-500">
            <img src="o2.jpg" alt="" className="w-[200px] rounded-full " />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <h1 className="text-3xl ">Tasty Friendship day</h1>
            <p className="font-customFont text-xl">20% off</p>
            <button className="self-start">order now</button>
          </div>
        </div>
      </div>

      {/* full card again */}
      <div className="bg-slate-900 flex flex-col sm:flex-row justify-center gap-8 items-center w-full text-white px-[20px] sm:px-[50px] py-[40px] sm:py-[80px] lg:py-[130px] ">
        <div>
          <img src="burgur.png" alt="" className="w-[300px] sm:w-[400px]" />
        </div>
        <div className="w-full lg:w-2/6 flex flex-col gap-4 sm:gap-8">
          <h1 className="text-3xl sm:text-5xl font-customFont">We Are Feane</h1>
          <p className="text-xl ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Odio esse modi dolorum obcaecati rem voluptas ullam pariatur nam, doloremque, 
            doloribus quis excepturi officia autem sequi odit hic mollitia id? Deserunt fuga
             accusantium cum dicta autem.</p>
             <button className="self-start bg-orange-500 px-10 py-4 rounded-full text-xl">ReadMore</button>
        </div>
      </div>
      <div className="w-full sm:w-2/5 mx-auto my-[50px] px-[20px] ">
        <h1 className="text-3xl sm:text-5xl my-[50px] font-customFont text-center font-semibold  ">
          what says our customer&apos;s
        </h1>
      
     <Slider />

      </div>
      <div className=" ">
          <Footerui /> 
        </div>
    </div>
  );
}

export default Home;
