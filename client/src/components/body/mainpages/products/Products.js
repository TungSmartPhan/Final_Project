import React, { useContext } from "react";
import ProductItem from "../utils/productItem/ProductItem";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../utils/loading/Loading";
function Products() {
  const auth = useContext(AuthContext);
  const { isAdmin } = auth;
  const [products] = auth.APIState.productsAPI.products; //watch browser is returned
  console.log(products);
  return (
    <>
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
