import React from "react";
import { useSelector } from "react-redux";
import { filterFilledOrder } from "../utils/helper";
import Spinner from "./Spinner";

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
            filterFilledOrder(filledOrders).map((data,i)=>(
              <tr key={i}> 
              <td className="timestamp">{data.formattedTimestamp}</td>
              <td>{data.tokenAmount}</td>
              <td className={`text-${data.tokenPriceClass}`} >{data.tokenPrice}</td>
            </tr>
            ))
            :<Spinner/>
          }


        </tbody>
      </table>
    </div>
  );
};

export default Trades;
