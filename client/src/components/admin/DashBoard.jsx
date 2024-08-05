import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Drawerui from "../ui/Drawer";
import Navbar from "../pages/Navbar";
import UpdateProductModal from "./UpdateProductModal";

function DashBoard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt"); // default sort by createdAt
  const [order, setOrder] = useState("desc"); // default sort order is desc

  async function fetchProducts() {
    setLoading(true);
    let url = `http://localhost:4000/api/v1/product/?page=${page}&limit=${limit}&sort=${sort}&order=${order}`;
    if (category) {
      url = `http://localhost:4000/api/v1/product/?page=${page}&limit=${limit}&category=${category}&sort=${sort}&order=${order}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      throw new Error(data.message);
    }

    setProducts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [page, limit, category, sort, order]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  return (
    <div className=" w-full ">
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-8 justify-center   w-full  px-[20px] sm:px-[50px] lg:px-[70px] xl:px-[100px]">
          <h1 className="text-2xl sm:text-5xl mt-[20px] text-center font-semibold font-customFont ">
            Dashboard
          </h1>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <label className="text-md font-semibold flex justify-center items-center ">
              Category:
              <select
                className="bg-orange-500 rounded-xl px-2 py-1 text-slate-100 focus:outline-none active:bg-slate-900"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
              </select>
            </label>
            <label className="text-md font-semibold flex justify-center items-center ">
              Sort by:
              <select
                className="bg-orange-500 rounded-xl px-2 py-1 text-slate-100 focus:outline-none active:bg-slate-900"
               
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={sort}
                
              >
                <option value="createdAt">Created At</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </label>
            <label className="text-md font-semibold flex justify-center items-center ">
              Order:
              <select
                className="bg-orange-500 rounded-xl px-2 py-1 text-slate-100 focus:outline-none active:bg-slate-900"
                 
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={order}
              
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
          <div>
            <div className=" flex w-full flex-col gap-4 text-white">
              {products.map((item) => (
                <div
                  key={Date.now() * Math.random()}
                  className="flex justify-between   bg-slate-800 items-center rounded-md "
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
                    <button className="bg-orange-500 rounded-2xl px-4 py-2 hover:bg-orange-800 transition-all duration-300">
                      <UpdateProductModal item={item}/>
                    </button>

                    <button className="bg-red-500 rounded-2xl px-4 py-2 hover:bg-orange-800 transition-all duration-300">
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center items-center my-10">
              <button
                className="text-xl bg-orange-500 rounded-2xl px-4 py-2 text-white hover:bg-orange-700"
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
              <span>{page}</span>
              <button
                className="text-xl bg-orange-500 rounded-2xl px-4 py-2 text-white hover:bg-orange-700"
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
