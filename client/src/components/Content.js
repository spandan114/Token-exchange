import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../redux/interactions'
import Trades from './Trades'

const Content = () => {
    const dispatch = useDispatch()
    const exchange = useSelector((state) => state.exchangeReducer.exchangeContract);

    useEffect(() => {
        if(exchange){
        loadOrders(exchange,dispatch)
        }
    }, [exchange])
    
  return (
    <div className="exchange-container container-fluid mt-3">
    <div className="d-flex flex-row">
      <div className="card-sm">
        <div className="card height-half">
          <h5 className="card-header">Balance</h5>
          <div className="card-body"></div>
        </div>
        <div className="card height-half">
          <h5 className="card-header">New Order</h5>
          <div className="card-body"></div>
        </div>
      </div>
      <div className="card-sm">
        <div className="card height-full">
          <h5 className="card-header">Orders</h5>
          <div className="card-body"></div>
        </div>
      </div>
      <div className="card-lg">
        <div className="card p-2 height-half">
          <div className="card-body"></div>
        </div>
        <div className="card height-half">
          <h5 className="card-header">My Transactions</h5>
          <div className="card-body"></div>
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