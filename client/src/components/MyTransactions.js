import React from 'react'
import { useSelector } from 'react-redux';
import { myFilledOrders } from '../utils/helper'
import Spinner from './Spinner';

const MyTransactions = () => {

  const filledOrders = useSelector((state) => state.exchangeReducer.filledOrders);
  const account = useSelector((state) => state.web3Reducer.account);

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
            filledOrders?
            myFilledOrders(filledOrders,account).map((data,i)=>(
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
          {/* {
            filledOrders?
            filterFilledOrder(filledOrders).map((data,i)=>(
              <tr key={i}> 
              <td className="timestamp">{data.formattedTimestamp}</td>
              <td>{data.tokenAmount}</td>
              <td className={`text-${data.tokenPriceClass}`} >{data.tokenPrice}</td>
            </tr>
            ))
            :<Spinner/>
          } */}


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