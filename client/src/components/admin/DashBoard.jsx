import { Link } from "react-router-dom";
import Drawerui from "../ui/Drawer";
import Navbar from "../pages/Navbar";
import UpdateProductModal from "./UpdateProductModal";
import { Spinner } from "@chakra-ui/react";
import Skeletonui from "../ui/Skeleton";
import { formatCurrency } from "./../../utils/helpers";
import toast from "react-hot-toast";
import { useState } from "react";

function DashBoard({
  products,
  loading,
  error,
  updateProduct,
  page,
  setPage,
  limit,
  setLimit,
  category,
  setCategory,
  sort,
  setSort,
  order,
  setOrder,
  setProducts,
}) {
  const [isProductDeleting, setIsProductDeleting] = useState(false);
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

  async function deleteProduct(productId) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:4000/api/v1/product/delete/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      if (data.code && data.code === "AccessTokenExpired") {
        toast.error("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }
      throw new Error(data.message);
    }
    return data;
  }
  const handleDeleteProduct = async (productId) => {
    try {
      setIsProductDeleting(true);
      const data = await deleteProduct(productId);
      if (data.status === 500) {
        throw new Error(data.message);
      }
      toast.success("Product deleted successfully");
      // Remove the deleted product from the state
        setIsProductDeleting(false);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      setIsProductDeleting(false);
      console.error("Failed to delete product:", error.message);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      {loading ? (
        <div className="px-[20px] sm:px-[50px] lg:px-[70px]">
          <Skeletonui />
        </div>
      ) : (
        <div className="flex flex-col gap-8 justify-center w-full px-[20px] sm:px-[50px] lg:px-[70px] xl:px-[100px]">
          <h1 className="text-2xl sm:text-5xl mt-[20px] text-center font-semibold font-customFont">
            Dashboard
          </h1>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <label className="text-md font-semibold flex justify-center items-center">
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
            <label className="text-md font-semibold flex justify-center items-center">
              Sort by:
              <select
                className="bg-orange-500 rounded-xl px-2 py-1 text-slate-100 focus:outline-none active:bg-slate-900"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sort}
              >
                <option value="createdAt">Created At</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </label>
            <label className="text-md font-semibold flex justify-center items-center">
              Order:
              <select
                className="bg-orange-500 rounded-xl px-2 py-1 text-slate-100 focus:outline-none active:bg-slate-900"
                onChange={(e) => handleOrderChange(e.target.value)}
                value={order}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
          <div>
            <div className="flex w-full flex-col gap-4 text-white">
              {products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between bg-slate-800 items-center rounded-md"
                  >
                    <div className="flex gap-4 justify-center items-center">
                      <img
                        src={item.prodImage}
                        alt=""
                        className="w-[100px] h-[100px] rounded-md"
                      />
                      <div className="flex flex-col justify-start">
                        <p className="text-xl capitalize">{item.title}</p>
                        <p className="text-sm capitalize">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center ">
                      <p className="text-xl">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex gap-4 pr-[20px] justify-center items-center">
                      <UpdateProductModal
                        item={item}
                        updateProduct={updateProduct}
                      />
                      <button
                        onClick={() => handleDeleteProduct(item._id)}
                        className="bg-red-500 rounded-2xl px-4 py-2 hover:bg-orange-800 transition-all duration-300"
                      >
                        {isProductDeleting ? "Deleting..":"Delete"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-black text-center w-full justify-center text-2xl sm:text-3xl capitalize">
                  No product found on this page
                </div>
              )}
            </div>
            <div className="flex gap-4 justify-center items-center my-10">
              <button
                disabled={page === 1}
                className="text-xl bg-orange-500 rounded-2xl px-4 py-2 text-white hover:bg-orange-700 disabled:bg-orange-700 disabled:opacity-50"
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
              <span>{page}</span>
              <button
                disabled={products.length === 0}
                className="text-xl bg-orange-500 rounded-2xl px-4 py-2 text-white hover:bg-orange-700 disabled:bg-orange-700 disabled:opacity-50"
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
