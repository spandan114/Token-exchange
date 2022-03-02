import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { depositeEther, depositeToken, loadBalances, withdrawEther, withdrawToken } from "../redux/interactions";
import Spinner from "./Spinner";

const Balances = () => {

  const dispatch = useDispatch()

  const [depositeEtherAmount, setDepositeEtherAmount] = useState(0)
  const [depositeTokenAmount, setDepositeTokenAmount] = useState(0)
  const [withdrawEtherAmount, setWithdrawEtherAmount] = useState(0)
  const [withdrawTokenAmount, setWithdrawTokenAmount] = useState(0)

  const web3 = useSelector((state) => state.web3Reducer.connection);
  const account = useSelector((state) => state.web3Reducer.account);
  const tokenContract = useSelector((state) => state.tokenReducer.tokenContract);
  const exchangeContract = useSelector((state) => state.exchangeReducer.exchangeContract);
  const isBalancesLoading = useSelector((state) => state.exchangeReducer.balancesLoading);

  useEffect(() => {
    if(web3 && tokenContract && exchangeContract && account){
    loadBalances(web3,dispatch,tokenContract,exchangeContract,account)
    }
  }, [web3 && tokenContract && exchangeContract && account])

  
  const exchangeEtherBalance = useSelector((state) => state.exchangeReducer.etherBalance);
  const exchangeTokenBalance = useSelector((state) => state.exchangeReducer.tokenBalance);
  const walletEtherBalance = useSelector((state) => state.web3Reducer.walletEtherBalance);
  const walletTokenBalance = useSelector((state) => state.tokenReducer.walletTokenBalance);


  var deposite = (type) =>{

    const onSuccess = () =>{
      toast.success(`${type} deposited successfully 🎊 !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); 
        if(type === "Ether"){
         setDepositeEtherAmount(0)
        }else{
          setDepositeTokenAmount(0)
        }
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

    if(type === "Ether"){
      depositeEther(web3,depositeEtherAmount,exchangeContract,account,onSuccess,onError)
    }else{
      depositeToken(web3,tokenContract,depositeTokenAmount,exchangeContract,account,onSuccess,onError)
    }    
  }

  var withdraw = (type) =>{

    const onSuccess = () =>{
      toast.success(`${type} withdraw successfully 🎊 !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); 
        if(type === "Ether"){
         setDepositeEtherAmount(0)
        }else{
          setDepositeTokenAmount(0)
        }
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

    if(type === "Ether"){
      withdrawEther(web3,withdrawEtherAmount,exchangeContract,account,onSuccess,onError)
    }else{
      withdrawToken(web3,tokenContract,withdrawTokenAmount,exchangeContract,account,onSuccess,onError)
    }    
  }

  return (
    <div>   
      {
      !isBalancesLoading ?  
        <> 
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a href="#deposite" className="nav-link active" data-bs-toggle="tab">
              Deposite
            </a>
          </li>
          <li className="nav-item">
            <a href="#withdraw" className="nav-link" data-bs-toggle="tab">
              Withdraw
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane table-container fade show active"
            id="deposite"
          >
              <div>
              <table className="table table-borderless ">
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Wallet</th>
                  <th scope="col">Exchange</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Eth</td>
                  <td>{walletEtherBalance?walletEtherBalance:0}</td>
                  <td>{exchangeEtherBalance?exchangeEtherBalance:0}</td>
                </tr>
                </tbody>
            </table>

            <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Token amount"
                    aria-describedby="deposite-brownie"
                    value={depositeEtherAmount}
                    onChange={(e)=>setDepositeEtherAmount(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-success"
                      type="button"
                      id="deposite-brownie"
                      onClick={()=>deposite("Ether")}
                    >
                      Deposite
                    </button>
                  </div>
            </div>

            <table className="table table-borderless ">
              <tbody>
                <tr>
                  <td>Brownie</td>
                  <td>{walletTokenBalance?walletTokenBalance:0}</td>
                  <td>{exchangeTokenBalance?exchangeTokenBalance:0}</td>
                </tr>
              </tbody>
            </table>

            <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ether amount"
                    aria-describedby="deposite-ether"
                    value={depositeTokenAmount}
                    onChange={(e)=>setDepositeTokenAmount(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-success"
                      type="button"
                      id="deposite-ether"
                      onClick={()=>deposite("Token")}
                    >
                      Deposite
                    </button>
                  </div>
            </div>

              </div>

          </div>
          <div className="tab-pane table-container fade" id="withdraw">
            <div>
                <table className="table table-borderless ">
                <thead>
                  <tr>
                    <th scope="col">Token</th>
                    <th scope="col">Wallet</th>
                    <th scope="col">Exchange</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Eth</td>
                    <td>{walletEtherBalance?walletEtherBalance:0}</td>
                    <td>{exchangeEtherBalance?exchangeEtherBalance:0}</td>
                  </tr>
                  </tbody>
              </table>

              <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Token amount"
                      aria-describedby="deposite-brownie"
                      value={withdrawEtherAmount}
                      onChange={(e)=>setWithdrawEtherAmount(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-success"
                        type="button"
                        id="deposite-brownie"
                        onClick={()=>withdraw("Ether")}
                      >
                        Withdraw
                      </button>
                    </div>
              </div>

              <table className="table table-borderless ">
                <tbody>
                  <tr>
                    <td>Brownie</td>
                    <td>{walletTokenBalance?walletTokenBalance:0}</td>
                    <td>{exchangeTokenBalance?exchangeTokenBalance:0}</td>
                  </tr>
                </tbody>
              </table>

              <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ether amount"
                      aria-describedby="deposite-ether"
                      value={withdrawTokenAmount}
                      onChange={(e)=>setWithdrawTokenAmount(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-success"
                        type="button"
                        id="deposite-ether"
                        onClick={()=>withdraw("Token")}
                      >
                        Withdraw
                      </button>
                    </div>
              </div>

            </div>
          </div>
        </div>
        </>
        :<Spinner/>
      }
    </div>
  );
};

export default Balances;
