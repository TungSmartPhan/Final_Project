import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import PaypalButton from "./PaypalButton";

function Cart() {
  const auth = useContext(AuthContext);
  // console.log(auth); see what browser return
  const [tokenUser] = auth.APIState.tokenAPI;
  // console.log(tokenUser);
  const [cart, setCart] = auth.APIState.userAPI.cart;
  const [callback, setCallback] = auth.APIState.userAPI.callback;
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
  const addCart = async (cart) => {
    await axios.put(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: tokenUser },
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
    addCart(cart);
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
    addCart(cart);
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
      addCart(cart);
    }
  };

  //tạo hàm thanh toán thành công, lấy props payment từ bên component  kia
  const tranSuccess = async (payment) => {
    //if payment is successful , watch the console , and get what we want
    console.log(payment);

    const { paymentID, address } = payment;
    //controller create payment đã có name và email, nên ta chỉ cần bỏ những cái chưa có vào thôi
    await axios.post('api/payment', {cart, paymentID, address},{
      headers: { Authorization: tokenUser}
    })
    //sau khi payment xong, setCart lại thành emty array
    //với state cart ban đầu là từ UserApi, nhưng với state thứ 2 mình tự chọn là mảng rổng, thì khi này cái màn màn hình được thấy là state thứ 2 với mảng rỗng ([])
    //hay nói cách khác là, khi mà setCart([]) thì state cart (ban đầu) lúc bấy h đã thành ([])
    // => Front end bấy h đã thành refresh làm trống hết dữ liệu sau khi payment thành công. Còn database thì vẫn còn nguyên dữ liệu không vấn đề gì
    //Hàm ý của chức năng này: khi payment thành công, trang chọn sản phẩm trước khi mua sẽ được reset lại cho sạch.

    //lý do tại sao lại chuyển về mảng rỗng, vì khi mà payment thành công, nếu ko chuyển về mảng rỗng, thì cart bên trong setCart vẫn còn dữ liệu 
    //và khi còn dữ liệu , thì addCart nhận vào (cart) và .put tức là update nó với giá trị vẫn còn đó, thì front end vẫn còn hiện ra những món hàng đã lựa chọn, cho dù đã payment thành công những món hàng đó rồi
    //hay nói cách khác là chúng ta làm mới lại toạn bộ sự lựa chọn của người dùng ngay sau khi payment thành công. 
    setCart([])
    addCart([])
    setCallback(!callback)
    toast("You have successfully placed  an order.", {
      className: "toast-success",
      bodyClassName: "toast-success",
    });
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
        {/* <Link to="#!">Payment</Link> */}
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}

export default Cart;