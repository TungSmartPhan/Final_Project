import {useContext} from 'react'
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";


function OrderHistory() {
    const state = useContext(AuthContext)
    const [history] = state.APIState.userAPI.history;
  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>You have {history.length} ordered</h4>

      <div >
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchase</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              history.map(items => (
                <tr key={items._id}>
                  <td>{items.paymentID}</td>
                  {/* <td>{items.createdAt}</td>  => viết kiểu này ngày tháng năm sẽ không được định dạng theo cách dễ nhìn*/}
                  <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                  <td><Link to={`/history/${items._id}`}>View</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory

