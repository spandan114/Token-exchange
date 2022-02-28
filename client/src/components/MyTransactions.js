import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cancelOrder } from '../redux/interactions';
import { filterTradeOrders} from '../utils/helper'
import Spinner from './Spinner';

const MyTransactions = () => {

  const dispatch = useDispatch()
 

  const allOrders = useSelector((state) => state.exchangeReducer);
  const exchangeContract = useSelector((state) => state.exchangeReducer.exchangeContract);
  const account = useSelector((state) => state.web3Reducer.account);
  var validator = (allOrders.hasOwnProperty("filledOrders") && allOrders.hasOwnProperty("orders") && allOrders.hasOwnProperty("canceledOrders"))

  const cancel = (order) =>{
    const onSuccess = () =>{
      toast.success('Order canceled successfully !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        
    }
    const onError = (msg) =>{
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    cancelOrder(exchangeContract, order,account,onSuccess,onError)
  }

  return (
    <div className='transactions'>
      <ul className="nav nav-tabs">
    <li className="nav-item">
        <a href="#tads" className="nav-link active" data-bs-toggle="tab">Trades</a>
    </li>
    <li className="nav-item">
        <a href="#orders" className="nav-link" data-bs-toggle="tab">Orders</a>
    </li>
</ul>
{
  account?
  <div className="tab-content">
    <div className="tab-pane table-container fade show active" id="tads">
   
      <table className="table table-borderless ">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Brownie</th>
            <th scope="col">Brownie/ETH</th>
          </tr>
        </thead>
        <tbody>
          {
            validator?
            filterTradeOrders(allOrders,account).filledOrders.map((data,i)=>(
              <tr key={i}> 
              <td className="timestamp">{data.formattedTimestamp}</td>
              <td className={`text-${data.orderTypeClass}`}>{data.orderSign}{data.tokenAmount}</td>
              <td className={`text-${data.orderTypeClass}`}>{data.tokenPrice}</td>
            </tr>
            ))
            :<Spinner/>
          }


        </tbody>
      </table>
    
    </div>
    <div className="tab-pane table-container fade" id="orders">
    <table className="table table-borderless ">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Brownie/ETH</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {
            validator?
            filterTradeOrders(allOrders,account).openOrders.map((data,i)=>(
              <tr key={i}> 
              <td className={`text-${data.orderTypeClass}`}>{data.tokenAmount}</td>
              <td className={`text-${data.orderTypeClass}`}>{data.tokenPrice}</td>
              <td className='cancel'
              onClick={()=> cancel(data)}
              >X</td>
            </tr>
            ))
            :<Spinner/>
          }


        </tbody>
      </table>
    </div>

</div>
:""
}

    </div>
  )
}

export default MyTransactions