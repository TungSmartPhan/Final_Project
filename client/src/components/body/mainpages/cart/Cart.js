import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Cart() {
  const auth = useContext(AuthContext);
  const [cart] = auth.APIState.userAPI.cart;
  const [total, setTotal] = useState(0)

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  return (
    <div>
      {
        //tại sao ta có product ở đây, vì ta có :  setCart([...cart, {...product, quantity: 1}]) ở trong kho Context, sau khi hàm addCart sử dụng
        cart.map((product) => (
          <div className="detail cart">
            <img src={product.images.url} alt="" className="img_container" />
            <div className="box-detail">
              <h2>{product.title}</h2>
              <h3>${product.price * product.quantity}</h3>
              <p>{product.description}</p>
              <p>{product.content}</p>
             
             <div className="amount">
                 <button>-</button>
                 <span>{product.quantity}</span>
                 <button>+</button>
             </div>

              <div className="delete">X</div>
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
