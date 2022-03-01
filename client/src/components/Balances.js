import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { depositeEther, loadBalances } from "../redux/interactions";
import Spinner from "./Spinner";

const Balances = () => {

  const dispatch = useDispatch()

  const [depositeEtherAmount, setDepositeEtherAmount] = useState(0)

  const web3 = useSelector((state) => state.web3Reducer.connection);
  const account = useSelector((state) => state.web3Reducer.account);
  const tokenContract = useSelector((state) => state.tokenReducer.tokenContract);
  const exchangeContract = useSelector((state) => state.exchangeReducer.exchangeContract);

  useEffect(() => {
    if(web3 && tokenContract && exchangeContract && account){
    loadBalances(web3,dispatch,tokenContract,exchangeContract,account)
    }
  }, [web3 && tokenContract && exchangeContract && account])
  
  const exchangeEtherBalance = useSelector((state) => state.exchangeReducer.etherBalance);
  const exchangeTokenBalance = useSelector((state) => state.exchangeReducer.tokenBalance);
  const walletEtherBalance = useSelector((state) => state.web3Reducer.walletEtherBalance);
  const walletTokenBalance = useSelector((state) => state.tokenReducer.walletTokenBalance);

  var isLoaded = (exchangeEtherBalance && exchangeTokenBalance && walletEtherBalance && walletTokenBalance)

  var etherDeposite = () =>{

    const onSuccess = () =>{
      toast.success(`Ether deposited successfully 🎊 !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); 
        setDepositeEtherAmount(0)
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

    depositeEther(web3,depositeEtherAmount,exchangeContract,account,onSuccess,onError)
  }

  return (
    <div>      
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
          {
          isLoaded?
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
                    onClick={()=>etherDeposite()}
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
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-success"
                    type="button"
                    id="deposite-ether"
                  >
                    Deposite
                  </button>
                </div>
          </div>

            </div>
            :<Spinner/>
          }

        </div>
        <div className="tab-pane table-container fade" id="withdraw">
          <h1>Withdraw</h1>
        </div>
      </div>
    </div>
  );
};

export default Balances;
