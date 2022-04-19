import React, { useContext, useEffect } from "react";
import ProductItem from "../utils/productItem/ProductItem";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../utils/loading/Loading";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function Products() {
  const auth = useContext(AuthContext);
  const { isAdmin } = auth;
  const [products, setProducts] = auth.APIState.productsAPI.products; //watch browser is returned
  console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.products)
    };
    getProducts();
  },[setProducts]);
  return (
    <>
      <ToastContainer />
      {products.length === 0 && <Loading />}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
    </>
  );
}

export default Products;
