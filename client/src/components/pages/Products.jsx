import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("http://localhost:4000/api/v1/product/", {
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
  }, []);
  if (loading) {
    return <p>Products are loading</p>;
  }
  return (
    <>
    <div className="flex flex-col justify-center items-center gap-[50px]  my-[50px] sm:my-[100px]"> 
      <h1 className="text-3xl sm:text-5xl  capitalize font-customFont font-medium">Our Menu</h1>
      <div className="flex justify-center items-center gap-4 sm:gap-8 text-md sm:text-xl font-semibold ">
        <Link className=" bg-slate-900  text-white transition-all duration-300 px-4 py-2 rounded-2xl" >All</Link>
        <Link className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black" >Food</Link>
        <Link className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black" >Dinner</Link>
        <Link className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black" >Pizza</Link>
        <Link className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black" >Burger</Link>
        <Link className="hover:bg-slate-900 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl text-black" >Breakfast</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-[30px] px-[10px] sm:px-[50px]">
        {products.map((product) => {
        return <Card product={product} key={product._id}/>
        })}
        <h1>hello</h1>
      </div>
    </>
  );
}

export default Products;
