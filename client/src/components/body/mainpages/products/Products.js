import React, {useContext} from 'react'
import ProductItem from '../utils/productItem/ProductItem'
import { AuthContext } from "../../context/AuthContext";

function Products() {
  const auth = useContext(AuthContext);
const [products] = auth.ProductState.productsAPI.products //watch browser is returned
console.log(products)
  return (
    <div className="products">
        {
            products.map(product =>{
                return <ProductItem key={product._id} product={product}/>
            })
        }
    </div>
  )
}

export default Products