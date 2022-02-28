import React from "react";

const NewOrder = () => {
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
          <form>
            <div className="form-group mt-2">
              <label htmlFor="buy-amount">Buy Amount (Brownie) </label>
              <input
                type="number"
                className="form-control"
                id="buy-amount"
                placeholder="Buy amount"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="buy-price">Buy Price</label>
              <input
                type="number"
                className="form-control"
                id="buy-price"
                placeholder="Buy price"
              />
            </div>

            <button type="submit" className="btn btn-success btn-block mt-2">
              Buy order
            </button>
          </form>
        </div>
        <div className="tab-pane table-container fade" id="sell">
          <h1>Sell</h1>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
