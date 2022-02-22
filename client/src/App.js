import React, { useEffect } from 'react'
import Web3 from 'web3';
import NavBar from "./components/NavBar";
import ExchangeContract from "./artifacts/contracts/Exchange.sol/Exchange.json"


function App() {

  const loadWeb3 = async()=>{
     const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
     const accounts = await web3.eth.getAccounts()

     const _tokenExchange = new web3.eth.Contract(
      ExchangeContract.abi,
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );

    const feeAccount = await _tokenExchange.methods.feeAccount().call()
    console.log(feeAccount)

  }

  useEffect(() => {
    loadWeb3()
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
