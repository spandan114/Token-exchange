import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, subscribeEvents } from '../redux/interactions'
import Balances from './Balances'
import MyTransactions from './MyTransactions'
import NewOrder from './NewOrder'
import Orders from './Orders'
import PriceChart from './PriceChart'
import Trades from './Trades'

const Content = () => {
    const dispatch = useDispatch()
    const exchange = useSelector((state) => state.exchangeReducer.exchangeContract);
    const account = useSelector((state) => state.web3Reducer.account);

    useEffect(() => {
        if(exchange){
          loadOrders(exchange,dispatch)
          subscribeEvents(exchange,dispatch)
        }
    }, [exchange])
    
  return (
    <div className="exchange-container container-fluid mt-3">
    <div className="d-flex flex-row">
      <div className="card-sm">
        <div className="card  balances">
          <h5 className="card-header">Balance</h5>
          <div className="card-body">
            {
              account?
               <Balances/>
              :<p>Wallet not connected</p>
            }
            
          </div>
        </div>
        <div className="card new-order">
          <h5 className="card-header">New Order</h5>
          <div className="card-body">
         {
            account?
             <NewOrder/>
            :<p>Wallet not connected</p>
            }
          </div>
        </div>
      </div>
      <div className="card-sm">
        <div className="card height-full">
          <h5 className="card-header">Orders</h5>
          <div className="card-body">
            <Orders/>
          </div>
        </div>
      </div>
      <div className="card-lg">
        <div className="card height-half">
          <div className="card-body p-1">
            <PriceChart/>
          </div>
        </div>
        <div className="card height-half">
          <h5 className="card-header">My Transactions</h5>
          <div className="card-body">
            <MyTransactions/>
          </div>
        </div>
      </div>
      <div className="card-sm">
        <div className="card height-full">
          <h5 className="card-header">Trades</h5>
          <div className="card-body">
              <Trades/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Content