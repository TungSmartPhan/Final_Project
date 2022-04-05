import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// import { AuthContext } from "../../body/context/AuthContext";

function UserAPI(tokenUser) {
  // const auth = useContext(AuthContext);
  // console.log(auth)
  // const { isLoggedIn } = auth;
  // Chúng ta ko thể dùng AuthContext trong trường hợp này, vì UserAPI là thành phần bên trong của kho AuthContext, và nó là dữ liệu riêng của APIState (trong AuthContext)
  //Nên chúng ta phải tải lại dữ liệu đó để nó bỏ vào kho, và tất nhiên làm theo phương pháp này ta sẽ ko cần dùng đến AuthReducer.
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  //tại sao chúng ta lại tạo callback false với useState, vì khi logout, xongn đăng nhập vào lại, phần history nó ko tự refresh để ta thấy lịch sử
  // buộc người dùng phải tự reload lại trang, điều này khá là bất cập
  // để giải quyết ta sẽ mặc định lúc đầu là false ở khúc, khi useEffect gọi history về => set dependence là false
  //sau đó ở phần Cart tranSuccess set thêm setCallback(là true), thì logic nó sẽ đi như sau
  // lúc đầu dependence là false, lúc này frontend chưa hiện và cần phải reload => nhưng khi setCallback(true) ở Cart.js, nghĩa là dependence đã bị thay đổi nhờ vào cái true, buộc useEffect phải reload 
  // => chính vì vậy mà nó sẽ tự load chính nó nhờ vào dependence thay đổi, từ đó history list được hiện ra

  //giải thích cho hiện tượng này, là vì chúng ta sử dụng react-router-dom , BrowserRouter... nó sẽ render trên 1 page nên thành ra nhiều cái nó ko tự reload mà nó chỉ reload đúng 1 lần, nên đôi khi sẽ có vài cái cần người dùng ấn tay
const [callback, setCallback] = useState(false)

  useEffect(() => {
    if (tokenUser) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/user_infor", {
            headers: { Authorization: tokenUser },
          });
          console.log(res.user.role);
          setIsLogged(true);
          res.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.user.cart); //lấy dữ liệu cart[] dc lưu , sau khi mọi người pick cart(chức năng bên dưới có dữ liệu sẽ được lưu vào database) từ API về và bỏ vào useState , xong sau đó bỏ vào kho Context
          //để dễ hiểu thì mỗi tài khoản đều có cart[] trong database, sau khi chức năng bên dưới hoạt động thì database đã được thay đổi số lượng là 1
          //cho dù mọi người có out ra thì món hàng mà mọi người đã chọn trước đó sẽ không bị mất
        } catch (error) {
          alert(error.message);
        }
      };
      getUser();
    }
  }, [tokenUser]);

  useEffect(() => {
    if (tokenUser) {
      const getHistory = async () => {
        const res = await axios.get("/user/history", {
          headers: { Authorization: tokenUser },
        });
        console.log(res);
        setHistory(res);
      };
      getHistory();
    }
  }, [tokenUser, callback]);

  // if user want to add a new cart which is new product they want to buy but thet didnt login yet
  const addCart = async (product) => {
    if (!isLogged)
      return toast("Please login to continue buying", {
        //ở đây ta không có chổ để đễ ToastContainer, muốn nó hiện dc thông báo này thì component product.js sẽ là nơi để hiện, vì nó là component cha
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    // nếu item mình chưa pick (item !== product) , thì nếu pick nó sẽ set quality là 1, là if(check)=>true, nếu đã pick rồi sẽ nhã else(false)
    //hay nói cách khác else(false) nghĩa là return (item._id == product._id) => chính vì == nên nó nghĩa là đã chọn
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    console.log(check);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      // dòng trên trong kho dữ liệu mới cập nhật quantity là 1, tuy nhiên nó chưa được gửi đến database mongoose
      await axios.put(
        "user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: tokenUser },
        }
      );
    } else {
      // alert("This product has been added to cart.");
      return toast("This product has been added to cart.", {
        className: "toast-failded",
        bodyClassName: "toast-failed",
      });
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback:[callback, setCallback]
  };
}

export default UserAPI;
