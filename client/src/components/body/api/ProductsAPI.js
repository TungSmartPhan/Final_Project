import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  // Chúng ta ko thể dùng AuthContext trong trường hợp này, vì ProductsAPI là thành phần bên trong của kho AuthContext, và nó là dữ liệu riêng của APIState (trong AuthContext)
  //Nên chúng ta phải tải lại dữ liệu đó để nó bỏ vào kho, và tất nhiên làm theo phương pháp này ta sẽ ko cần dùng đến AuthReducer.
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.products);
    };
    getProducts();
  }, [callback]);
  // cũng tương tự phần giải thích ở chỗ khác, khi ta update hoặc tạo product mới thì trang chứa product chưa tự load lại để get database mới, khiến chúng ta phải reload
  // lúc này chỉ cần tạo một hàm với giá trị thay đổi => dependence thay đổi => useEffect tự load lại

  return {
    products: [products, setProducts],
    callback:[callback, setCallback]
  };
}

export default ProductsAPI;
