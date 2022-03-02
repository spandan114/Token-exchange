import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { buyToken, loadBalances, sellToken } from "../redux/interactions";

const NewOrder = () => {

  const dispatch = useDispatch()

  const [buyEtherAmount, setBuyEtherAmount] = useState(0)
  const [buyTokenAmount, setBuyTokenAmount] = useState(0)
  const [sellEtherAmount, setSellEtherAmount] = useState(0)
  const [sellTokenAmount, setSellTokenAmount] = useState(0)

  const web3 = useSelector((state) => state.web3Reducer.connection);
  const account = useSelector((state) => state.web3Reducer.account);
  const tokenContract = useSelector((state) => state.tokenReducer.tokenContract);
  const exchangeContract = useSelector((state) => state.exchangeReducer.exchangeContract);
  

  const createPurchaseOrder = (e)=>{
    e.preventDefault();
    const onSuccess = () =>{
      toast.success(`Purchase order created successfully 🎊 !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); 
        //Reset state data
        setBuyEtherAmount(0)
        setBuyTokenAmount(0)
        //Reload balance
        setTimeout(() => {
          loadBalances(web3,dispatch,tokenContract,exchangeContract,account)
        }, 1000);
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
    buyToken(web3,dispatch,buyTokenAmount,buyEtherAmount,tokenContract,exchangeContract,account,onSuccess,onError)
  }

  const createSellOrder = (e)=>{
    e.preventDefault();
    const onSuccess = () =>{
      toast.success(`Purchase order created successfully 🎊 !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); 

        //Reset state data
        setSellEtherAmount(0)
        setSellTokenAmount(0)
        //Reload balance
        setTimeout(() => {
          loadBalances(web3,dispatch,tokenContract,exchangeContract,account)
        }, 1000);
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
    sellToken(web3,dispatch,sellTokenAmount,sellEtherAmount,tokenContract,exchangeContract,account,onSuccess,onError)
  }


  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="#buy" className="nav-link active" data-bs-toggle="tab">
            Buy
          </a>
        </li>
        <li className="nav-item">
          <a href="#sell" className="nav-link" data-bs-toggle="tab">
            Sell
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane table-container fade show active"
          id="buy"
        >
          <form onSubmit={(e)=>createPurchaseOrder(e)}>
            <div className="form-group mt-2">
              <label htmlFor="buy-amount">Buy Amount (Brownie) </label>
              <input
                type="number"
                className="form-control"
                id="buy-amount"
                placeholder="Buy amount"
                value={buyTokenAmount}
                onChange={(e)=>setBuyTokenAmount(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="buy-price">Buy Price</label>
              <input
                type="number"
                className="form-control"
                id="buy-price"
                placeholder="Buy price"
                value={buyEtherAmount}
                onChange={(e)=>setBuyEtherAmount(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success btn-block mt-2">
              Buy order
            </button>
            {
              buyEtherAmount*buyTokenAmount > 0?
              <p>Total: {buyEtherAmount*buyTokenAmount}</p>
              :null
            }
            
          </form>
        </div>
        <div className="tab-pane table-container fade" id="sell">
        <form onSubmit={(e)=>createSellOrder(e)}>
            <div className="form-group mt-2">
              <label htmlFor="buy-amount">Buy Amount (Brownie) </label>
              <input
                type="number"
                className="form-control"
                id="buy-amount"
                placeholder="Buy amount"
                value={sellTokenAmount}
                onChange={(e)=>setSellTokenAmount(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="buy-price">Buy Price</label>
              <input
                type="number"
                className="form-control"
                id="buy-price"
                placeholder="Buy price"
                value={sellEtherAmount}
                onChange={(e)=>setSellEtherAmount(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success btn-block mt-2">
              Sell order
            </button>
            {
              sellEtherAmount*sellTokenAmount > 0?
              <p>Total: {sellEtherAmount*sellTokenAmount}</p>
              :null
            }
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
