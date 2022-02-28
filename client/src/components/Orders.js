import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fillOrder } from '../redux/interactions';
import { filterAllOrders } from '../utils/helper';
import Spinner from './Spinner';

const Orders = () => {
    const dispatch = useDispatch()
    const AllOrders = useSelector((state) => state.exchangeReducer);
    const exchangeContract = useSelector((state) => state.exchangeReducer.exchangeContract);
    const account = useSelector((state) => state.web3Reducer.account);
    var validator = (AllOrders.hasOwnProperty("filledOrders") && AllOrders.hasOwnProperty("orders") && AllOrders.hasOwnProperty("canceledOrders"))
    

    const fill = (order) =>{
      const onSuccess = () =>{
        toast.success(`Congratulation ! Order successfully ${order.orderFillClass} `, {
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
      fillOrder(exchangeContract,order,account,onSuccess,onError)
    }

  return (
    <div className="table-container order">
    <table className="table table-borderless ">
    {validator?
    <>
          <thead>
        <tr>
        <th scope="col">Amount</th>
          <th scope="col">Brownie/ETH</th>
          <th scope="col">ETH</th>
        </tr>
      </thead>
      <tbody>
        {
          filterAllOrders(AllOrders).sellOrders.map((data,i)=>(
            
            <tr 
            key={i} 
            data-toggle="tooltip" 
            data-placement="top" 
            title={`Click here to ${data.orderFillClass}`}
            onClick={()=>fill(data)}
            > 
            <td >{data.tokenAmount}</td>
            <td className={`text-${data.orderTypeClass}`}>{data.tokenPrice}</td>
            <td >{data.etherAmount}</td>
          </tr>
        
          ))
        }
      </tbody>
      <thead>
        <tr>
          <th scope="col">Amount</th>
          <th scope="col">Brownie/ETH</th>
          <th scope="col">ETH</th>
        </tr>
      </thead>
      <tbody>
        {
          filterAllOrders(AllOrders).buyOrders.map((data,i)=>(
            <tr 
            key={i} 
            data-toggle="tooltip" 
            data-placement="top" 
            title={`Click here to ${data.orderFillClass}`}
            onClick={()=>fill(data)}
            > 
            <td >{data.tokenAmount}</td>
            <td className={`text-${data.orderTypeClass}`}>{data.tokenPrice}</td>
            <td >{data.etherAmount}</td>
          </tr>
          ))
        }
      </tbody>

      </>
      
      :<Spinner/>}
    </table>
  </div>
  )
}

export default Orders