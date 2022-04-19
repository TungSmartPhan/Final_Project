import React, { useContext, useEffect } from "react";
import ProductItem from "../utils/productItem/ProductItem";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../utils/loading/Loading";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function Products() {
  const auth = useContext(AuthContext);
  const { isAdmin } = auth;
  const [products] = auth.APIState.productsAPI.products; //watch browser is returned
  const [tokenUser] = auth.APIState.tokenAPI
  const [callback, setCallback] = auth.APIState.productsAPI.callback
  console.log(products);


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
              tokenUser={tokenUser}
              callback={callback}
              setCallback={setCallback}
            />
          );
        })}
      </div>
    </>
  );
}

export default Products;
