import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function BtnRender({ product, deleteProduct }) {
  const auth = useContext(AuthContext);
  const { isAdmin } = auth;
  const addCart = auth.APIState.userAPI.addCart; //watch browser is returned

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          {/* truyền hai đối số này vào hàm deleteProduct để nơi tạo hàm (Product.js) nhận dc hai giá trị này */}
          {/* Tương tự ở đây nếu viết deleteProduct(product._id, product.images.public_id : thì nó sẽ toàn bộ bốc hết dữ liệu 
          Để ko bị xóa hết một lúc thì phải trỏ đến những vị trí cần xóa và viết theo cách dưới ()=> */}
          <Link id="btn_buy" to="#" onClick={() => deleteProduct(product._id, product.images.public_id)}> 
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#" onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
