import React, { useEffect } from 'react'
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { loadAccount, loadExchangeContract, loadTokenContract, loadWeb3 } from './redux/interactions';

function App() {

  const dispatch = useDispatch()

  const loadBlockChain = async()=>{
     const web3 = await loadWeb3(dispatch)
     const accounts = await loadAccount(web3,dispatch)
     loadExchangeContract(web3,dispatch)
     loadTokenContract(web3,dispatch)
    // const feeAccount = await _tokenExchange.methods.feeAccount().call()
    // console.log(feeAccount)

  }

  useEffect(() => {
    loadBlockChain()
  }, [])
  

  return (
   <>
    <NavBar/>
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
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
