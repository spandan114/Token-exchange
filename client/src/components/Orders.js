import React from 'react'
import { useSelector } from 'react-redux';
import { filterAllOrders } from '../utils/helper';
import Spinner from './Spinner';

const Orders = () => {

    const AllOrders = useSelector((state) => state.exchangeReducer);

    var validator = (AllOrders.hasOwnProperty("filledOrders") && AllOrders.hasOwnProperty("orders") && AllOrders.hasOwnProperty("canceledOrders"))
   
  return (
    <div className="table-container">
    <table className="table table-borderless ">
    {validator?
    <>
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Brownie</th>
          <th scope="col">ETH</th>
        </tr>
      </thead>
      <tbody>
        {
          filterAllOrders(AllOrders).buyOrders.map((data,i)=>(
            <tr key={i}> 
            <td>Hii</td>
            {/* <td className="timestamp">{data.formattedTimestamp}</td>
            <td>{data.tokenAmount}</td>
            <td className={data.tokenPriceClass}>{data.tokenPrice}</td> */}
          </tr>
          ))
        }
      </tbody>
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Brownie</th>
          <th scope="col">ETH</th>
        </tr>
      </thead>
      <tbody>
        {
          filterAllOrders(AllOrders).sellOrders.map((data,i)=>(
            <tr key={i}> 
            <td>Hii</td>
            {/* <td className="timestamp">{data.formattedTimestamp}</td>
            <td>{data.tokenAmount}</td>
            <td className={data.tokenPriceClass}>{data.tokenPrice}</td> */}
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