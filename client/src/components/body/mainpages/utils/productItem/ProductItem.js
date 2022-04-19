import React from "react";
import BtnRender from "./BtnRender";
import axios from "axios";
function ProductItem({ product, isAdmin, tokenUser, callback, setCallback }) {
  const deleteProduct = async () => {
    // console.log(product)
    try {
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id: product.images.public_id },
        {
          headers: { Authorization: tokenUser },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${product._id}`, {
        headers: { Authorization: tokenUser },
      });

      await destroyImg
      await deleteProduct
      setCallback(!callback);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
