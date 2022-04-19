import { useState,useEffect } from 'react';
import axios from "axios";

function ProductsAPI() {
   // Chúng ta ko thể dùng AuthContext trong trường hợp này, vì ProductsAPI là thành phần bên trong của kho AuthContext, và nó là dữ liệu riêng của APIState (trong AuthContext) 
    //Nên chúng ta phải tải lại dữ liệu đó để nó bỏ vào kho, và tất nhiên làm theo phương pháp này ta sẽ ko cần dùng đến AuthReducer.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.products)
    };
    getProducts();
  },[]);


  return {
      products: [products, setProducts]
  }
}

export default ProductsAPI;
