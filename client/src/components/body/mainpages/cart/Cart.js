import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import  axios  from "axios";

function Cart() {
  const auth = useContext(AuthContext);
  // console.log(auth); see what browser return
  const [tokenUser] = auth.APIState.tokenAPI;
  // console.log(tokenUser);
  const [cart, setCart] = auth.APIState.userAPI.cart;
  const [total, setTotal] = useState(0);

  //sử dụng useEffect tạo chức năng tính tổng để bỏ vào useState total, với các giá trị API đã gọi về có trong product
  //cart là dependence tại vì nó là giá trị thay đổi, khi nó thay đổi thì useEffect sẽ load lại
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  //Với những hàm tăng , giảm xóa bên dưới ta sẽ làm nó hiện hữu trên front end , nhưng chưa được lưu trong database (user.cart)
  //Vì vậy ta chỉ cần update nó, update nó ngay sau khi setCart thay đổi , để useEffect load lại là nó hiện ra những gì có trong database là dc
  const addCart = async () => {
    await axios.put(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: tokenUser},
      }
    );
  };

  //tạo hàm tăng số lượng
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addCart();
  };

  //tạo hàm giamr số lượng
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        // item.quantity -= 1; // nếu để như vậy số lượng sản phẩm có thể bị xuống số âm
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1); //Nếu nó đang là 1 , thì nó sẽ dữ nguyên là 1, nếu ko phải , người dùng có thể giảm số lượng
      }
    });
    setCart([...cart]);
    addCart();
  };

  //tạo hàm xóa lựa chọn product
  const removeProduct = (id) => {
    if (window.confirm("Do you want to remove this product")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
     addCart();
    }
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  return (
    <div>
      {
        //tại sao ta có product ở đây, vì ta có :  setCart([...cart, {...product, quantity: 1}]) ở trong kho Context, sau khi hàm addCart sử dụng
        cart.map((product) => (
          <div className="detail cart" key={product._id}>
            <img src={product.images.url} alt="" className="img_container" />
            <div className="box-detail">
              <h2>{product.title}</h2>
              <h3>${product.price * product.quantity}</h3>
              <p>{product.description}</p>
              <p>{product.content}</p>

              <div className="amount">
                <button onClick={() => decrement(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}>+</button>
              </div>

              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                X
              </div>
            </div>
          </div>
        ))
      }

      <div className="total">
        <h3>Total: $ {total}</h3>
        <Link to="#!">Payment</Link>
      </div>
    </div>
  );
}

export default Cart;
