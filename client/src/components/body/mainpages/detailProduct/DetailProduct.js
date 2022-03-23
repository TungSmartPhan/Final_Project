import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function DetailProduct() {
  const params = useParams();
  //console.log(params) it just get the product._id using useParams but not get about information
  const auth = useContext(AuthContext);
  const [products] = auth.ProductState.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([])

  useEffect(() => {
      if(params){
          products.forEach(product => {
              if(product._id === params.id)
              setDetailProduct(product)
          })
      }
  }, [params, products])

  console.log(detailProduct)
  if(detailProduct.length ===0) return null // must have , if not , we can get the value inside detailProduct to show on the front end
  return(
      <div className="detail">
          <img src={detailProduct.images.url} alt="" />
          <div className="box-detail">
            <div className="row">
                <h2>{detailProduct.title}</h2>
                <h6>Code: {detailProduct.product_id}</h6>
            </div>
            <span>${detailProduct.price}</span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>
            <p>Sold: {detailProduct.sold}</p>
            <Link to="/cart" className="cart">Buy Now</Link>
          </div>
      </div>
  )
}

export default DetailProduct;
