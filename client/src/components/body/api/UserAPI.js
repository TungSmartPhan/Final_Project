import React, {useState,useContext,useEffect} from 'react'
import axios from "axios";
// import { AuthContext } from "../../body/context/AuthContext";

function UserAPI(tokenUser) {
    // const auth = useContext(AuthContext);
    // console.log(auth)
    // const { isLoggedIn } = auth;
    // Chúng ta ko thể dùng AuthContext trong trường hợp này, vì UserAPI là thành phần bên trong của kho AuthContext, và nó là dữ liệu riêng của APIState (trong AuthContext) 
    //Nên chúng ta phải tải lại dữ liệu đó để nó bỏ vào kho, và tất nhiên làm theo phương pháp này ta sẽ ko cần dùng đến AuthReducer.
    const [isLogged, setIsLogged]=useState(false)
    const [isAdmin, setIsAdmin]=useState(false)
    const [cart, setCart] = useState([])
    useEffect(() =>{
        if(tokenUser){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/user_infor', {
                        headers: { Authorization: tokenUser }
                    })
                    console.log(res.user.role)
                    setIsLogged(true)
                    res.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (error) {
                    alert(error.message)
                }
            }
            getUser();
        }
    },[tokenUser])

    // if user want to add a new cart which is new product they want to buy but thet didnt login yet
    const addCart = async (product) => {
        if(!isLogged) return alert('Please login to continue buying')
        // nếu item mình chưa pick (item !== product) , thì nếu pick nó sẽ set quality là 1, là if(check)=>true, nếu đã pick rồi sẽ nhã else(false)
        //hay nói cách khác else(false) nghĩa là return (item._id == product._id) => chính vì == nên nó nghĩa là đã chọn
        const check = cart.every(item => {
            return item._id !== product._id 
        })
        console.log(check)
        if(check) {
            setCart([...cart, {...product, quantity: 1}])
        }else{
            alert('This product has been added to cart.')
        }
        
    }
 return { 
     isLogged:[isLogged, setIsLogged],
     isAdmin:[isAdmin, setIsAdmin],
     cart: [cart, setCart],
     addCart: addCart
 }
}

export default UserAPI