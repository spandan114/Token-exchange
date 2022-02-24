import React from "react";
import { useSelector } from "react-redux";
import { beatifyFilledData, filterOrder } from "../utils/helper";

const Trades = () => {

  const filledOrders = useSelector((state) => state.exchangeReducer.filledOrders);

  return (
    <div className="table-container">
      <table className="table table-borderless ">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Brownie</th>
            <th scope="col">ETH</th>
          </tr>
        </thead>
        <tbody>
          {
            filledOrders?
            filterOrder(filledOrders).map((data,i)=>(
              <tr key={i}> 
              <td className="timestamp">{data.formattedTimestamp}</td>
              <td>{data.tokenAmount}</td>
              <td className={data.tokenPriceClass}>{data.tokenPrice}</td>
            </tr>
            ))
            :"Loading..."
          }


        </tbody>
      </table>
    </div>
  );
};

export default Trades;
