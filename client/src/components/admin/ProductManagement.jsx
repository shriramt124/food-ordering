import React, { useState, useEffect } from "react";
import DashBoard from "./DashBoard";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/api/v1/product/`);
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
  }, []);

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
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default ProductManagement;
