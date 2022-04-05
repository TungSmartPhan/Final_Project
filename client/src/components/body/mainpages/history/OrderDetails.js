import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function OrderDetails() {
  const state = useContext(AuthContext);
  const [history] = state.APIState.userAPI.history;
  // console.log(history)
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id)
          // nếu .id từ params theo đường dẫn sau khi click chọn vào thông tin nào đó, === với thống tin trong database  ._id
          //thì nghĩa là đúng, thì ta set mỗi cái item (mỗi item này từ trong history) vào trong setOrderDetails
          //click chọn vào đúng phần tử params nào thì nó sẽ ra đúng product đó
          setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  console.log(orderDetails); //xem console trả ra những gì sau khi aans View
  if (orderDetails.length === 0) return null;
  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipent_name}</td>
            <td>{orderDetails.address.line1 + "-" + orderDetails.address.city}</td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            orderDetails.cart.map(item=>(
              <tr key={item._id}>
              <td><img src={item.images.url} alt=' '/></td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price*item.quantity}</td>
            </tr>
            ))
          }
        
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
