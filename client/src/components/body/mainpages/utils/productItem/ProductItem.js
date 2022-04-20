import React, { useState } from "react";
import BtnRender from "./BtnRender";


function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <div className="product_card">
      {/* đã gọi là check box thì ta phải nhớ có phần thay đổi nếu không sẽ không check được và sẽ đẫn đến lỗi này 
      Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`. */}
      {isAdmin && <input type="checkbox" checked={product.checked} onChange={() =>handleCheck(product._id)} />} 
      {/* => truyền tham số vào đối số product._id để nơi tạo hàm handleCHeck (Product.js) nhận dc với tên gọi là id */}
      {/*=>>> Ở đây nếu chúng ta để im onChange={handleCheck(product._id)} có nghĩa là chúng ta đang bốc hết tất cả product.id bỏ vào để handleCheck xử Lý
      Kết quả là sẽ hiện ra 625e7978394a362d6e00f0dc
                                                17 625e780c394a362d6e00f0d1
                                                625a4c6f3686ba1205f935ce */}
                                                {/* Vì vậy để checkbox xác định theo đúng vị trí con trỏ chuột ta phải thêm như sau: onChange={() => handleCheck(product._id)}  */}
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
