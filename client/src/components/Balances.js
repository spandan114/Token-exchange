import React from "react";
import Spinner from "./Spinner";

const Balances = () => {
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
                <td>0</td>
                <td>0</td>
              </tr>
              </tbody>
          </table>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Token amount"
                  aria-describedby="deposite-brownie"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-success"
                    type="button"
                    id="deposite-brownie"
                  >
                    Deposite
                  </button>
                </div>
              </div>
              <table className="table table-borderless ">
            <tbody>
              <tr>
                <td>Eth</td>
                <td>0</td>
                <td>0</td>
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
        <div className="tab-pane table-container fade" id="withdraw">
          <h1>Withdraw</h1>
        </div>
      </div>
    </div>
  );
};

export default Balances;
