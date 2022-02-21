import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar/>
    <div className="exchange-container container-fluid mt-3">
      <div className="d-flex flex-row">
        <div className="card-sm">
          <div className="card ">
            <h5 className="card-header">Balance</h5>
            <div className="card-body"></div>
          </div>
          <div className="card ">
            <h5 className="card-header">New Order</h5>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="card-sm">
          <div className="card ">
            <h5 className="card-header">Orders</h5>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="card-lg">
          <div className="card p-2">
            <div className="card-body"></div>
          </div>
          <div className="card">
            <h5 className="card-header">My Transactions</h5>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="card-sm">
          <div className="card ">
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
