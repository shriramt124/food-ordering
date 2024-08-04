import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartSidex from "../ui/CartSidex";
 
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const cart = useSelector((state) => state.cart);
  const [category,setCategory] = useState(""); 
  //get the cart using useSelector
  
 
  async function fetchProducts(page, limit,category="") {
    setLoading(true);
    let url = `http://localhost:4000/api/v1/product/?page=${page}&limit=${limit}`;
      if(category){
        url = `http://localhost:4000/api/v1/product/?page=${page}&limit=${limit}&category=${category}`;
      }
    
    const res = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      throw new Error(data.message);
    }

    setProducts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts(page, limit,category);
  }, [page, limit,category]);
 

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  if (loading) {
    return <p>Products are loading</p>;
  }
  if (!products) {
    return <p>No products found</p>;
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-[50px] sm:mt-[100px]  sm:text-5xl  capitalize font-customFont font-medium">
        Our Menu
      </h1>
      <div className=" my-[50px] sm:my-[70px] flex  justify-center items-center gap-[50px]   ">
        <div className="flex justify-center items-center gap-4 sm:gap-8 text-md sm:text-xl font-semibold flex-wrap">
          <Link  onClick={()=>{setCategory("")}}    className=" bg-slate-900  text-white transition-all duration-300 px-4 py-2 rounded-2xl">
            All
          </Link>
          <Link onClick={(e)=>{setCategory(e.target.innerText.toLowerCase())}}  className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black">
            vegetable
          </Link>
          <Link onClick={(e)=>{setCategory(e.target.innerText.toLowerCase())}}   className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black">
            Dinner
          </Link>
          <Link onClick={(e)=>{setCategory(e.target.innerText.toLowerCase())}}  className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black">
            Pizza
          </Link>
          <Link onClick={(e)=>{setCategory(e.target.innerText.toLowerCase())}}  className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black">
            Burger
          </Link>
          <Link onClick={(e)=>{setCategory(e.target.innerText.toLowerCase())}}  className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black">
            Breakfast
          </Link>
          <Link onClick={(e)=>{setCategory(e.target.innerText.toLowerCase())}} className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black">
            Pasta
          </Link>
        </div>
      </div>

      <div className="m-auto relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-[30px] px-[10px] sm:px-[50px] w-full ">
        {products.length === 0 ? (
          <p className="text-3xl text-orange-700 font-semibold mx-auto">
            No products found on this page
          </p>
        ) : (
          products.map((product) => {
            return <Card product={product} key={product._id} />;
          })
        )}
      </div>

      <div className="flex justify-center items-center gap-4 sm:gap-8 text-md sm:text-xl   my-[50px] ">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-orange-500 px-3 py-2 rounded-2xl text-slate-200 disabled:bg-orange-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
          </svg>
        </button>
        <span> {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-orange-500 px-3 py-2 rounded-2xl text-slate-200 hover:bg-orange-400 transition-all duration-300 disabled:bg-orange-900"
          disabled={products.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
          </svg>
        </button>
        <select
          value={limit}
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
     {cart.cartItems.length >0 &&(
     
     <div className="w-full bg-slate-800 fixed bottom-0 ">
      <CartSidex />
     </div>
      )}
    </>
  );
}

export default Products;
