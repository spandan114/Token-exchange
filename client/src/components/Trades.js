import React from "react";

const Trades = () => {
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
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
