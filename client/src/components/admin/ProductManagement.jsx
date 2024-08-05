import React, { useState, useEffect } from "react";
import DashBoard from "./DashBoard";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/product?page=${page}&limit=${limit}&category=${category}&sort=${sort}&order=${order}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        throw new Error(data.message);
      }
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, category, sort, order]);

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div>
      <DashBoard
        products={products}
        loading={loading}
        error={error}
        updateProduct={updateProduct}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        setProducts={setProducts}
      />
    </div>
  );
}

export default ProductManagement;
