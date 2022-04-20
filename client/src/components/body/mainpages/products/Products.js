import React, { useContext, useState } from "react";
import ProductItem from "../utils/productItem/ProductItem";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../utils/loading/Loading";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Filters from './Filters'
import LoadMore from './LoadMore'

function Products() {
  const auth = useContext(AuthContext);
  const { isAdmin } = auth;
  const [products, setProducts] = auth.APIState.productsAPI.products; //watch browser is returned
  const [tokenUser] = auth.APIState.tokenAPI
  const [callback, setCallback] = auth.APIState.productsAPI.callback

  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  console.log(products);


  //Mục đích của handleCheck và deleProduct là : check là checkbox sẽ chọn những thành phần để xóa nhiều theo ý muốn của admin
  //Delete product là để xóa thủ công 1 - 1 

  const handleCheck = (id) => {
    console.log(id)
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
      //dấu bằng = ở phía sau là toán tử gán trong javascript, mặc định ban đầu checked là false . sau khi điều kiện thỏa thì false sẽ thành true => tức là admin đã tích phần đó 
    })
    //vì muốn check nhìu phần tử nên phải để vào trong [... và lấy hết tất cả những gì mình chọn lưu ý ở [] và ba dấu chấm]
    setProducts([...products])
  }

  // id chính là product._id , public_id là id của ảnh, được nhận từ dối số ở product._id, product.images.public_id của BtnRender
  const deleteProduct = async (id, public_id) => {
    console.log({id, public_id})
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        {public_id},
        {
          headers: { Authorization: tokenUser },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: tokenUser },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const checkAll = () => {
    products.forEach(product => {
      // product.checked = !product.checked // để như này thì chưa đồng bộ , nếu tick các phần khác thì bấm tick all sẽ bị đảo ngược
      //thay vào đó ta viết như này =>
      product.checked = !isCheck
    })
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const deleteAll = () => {
    products.forEach(product => {
      if(product.checked) deleteProduct(product._id, product.images.public_id)
    })
  }

if(loading) return <div ><Loading /></div>;

  return (
    <>
      <ToastContainer />
      <Filters/>
      {
        isAdmin && 
        <div className="delete-all">
          <span>Select All</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll}/>
          <button onClick={deleteAll}>Delete All</button>
        </div>
      }
      {products.length === 0 && <Loading />}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore/>
    </>
  );
}

export default Products;
