import { useEffect, useState } from "react";

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
      <div className="flex justify-between items-center px-[50px] ">
        <p>category 1</p>
        <p>category 1</p>
        <p>category 1</p>
        <p>category 1</p>
        <p>category 1</p>
        <p>category 1</p>
        <p>category 1</p>
        <p>category 1</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-2 px-[10px]">
        {products.map((product) => {
          return (
            <div key={product._id} className="bg-slate-100  rounded-md">
              <div className="w-full rounded-md ">
                <img
                  src={product.prodImage}
                  alt=""
                  className="w-full rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 relative capitalize p-2 ">
                <div className="flex justify-start gap-4 items-center">
                  <h1 className="capitalize text-xl font-semibold ">
                    {product.title}
                  </h1>
                  <p className="">{product.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl">${product.price}</p>
                  <p>quantity : {product.quantity}</p>
                </div>

                <div className="flex justify-between items-center ">
                  <button className="bg-green-500 px-2 py-2 text-sm  rounded-md text-white hover:bg-orange-800 transition-all duraion-300">
                    Details
                  </button>
                  <button className="bg-green-500 px-2 py-2 text-sm rounded-md text-white hover:bg-orange-800 transition-all duraion-300">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <h1>hello</h1>
      </div>
    </>
  );
}

export default Products;
