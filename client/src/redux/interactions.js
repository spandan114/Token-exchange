import {
  accountLoaded,
  allOrderLoaded,
  canceledOrderLoaded,
  exchangeContractLoaded,
  filledOrderLoaded,
  orderCanceled,
  tokenContractLoaded,
  web3Loaded,
} from "./actions";
import Web3 from "web3";
import ExchangeContract from "../artifacts/contracts/Exchange.sol/Exchange.json";
import TokenContract from "../artifacts/contracts/Token.sol/Token.json";

export const loadWeb3 = async (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  dispatch(web3Loaded(web3));
  return web3;
};

export const loadAccount = async (web3, dispatch) => {
  const account = await web3.eth.getAccounts();
  dispatch(accountLoaded(account));
  return account;
};

export const loadTokenContract = async (web3, dispatch) => {
  try {
    const tokenContract = new web3.eth.Contract(
      TokenContract.abi,
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    dispatch(tokenContractLoaded(tokenContract));
    return null;
  } catch (error) {
    alert("Something went wrong token contract not loaded !");
  }
};

export const loadExchangeContract = async (web3, dispatch) => {
  try {
    const tokenContract = new web3.eth.Contract(
      ExchangeContract.abi,
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );
    dispatch(exchangeContractLoaded(tokenContract));
    return tokenContract;
  } catch (error) {
    alert("Something went wrong token contract not loaded !");
  }
};


export const loadOrders = async (exchangeContract, dispatch) => {
//Load canceled orders
//Load filled order
//Load all orders from order event

const canceledOrders = await exchangeContract.getPastEvents("CancelOrder",{
  fromBlock: 0,
  toBlock: 'latest'
})

const filledOrders = await exchangeContract.getPastEvents("FillOrder",{
  fromBlock: 0,
  toBlock: 'latest'
})

const allOrders = await exchangeContract.getPastEvents("Order",{
  fromBlock: 0,
  toBlock: 'latest'
})

dispatch(allOrderLoaded(allOrders));
dispatch(filledOrderLoaded(filledOrders));
dispatch(canceledOrderLoaded(canceledOrders));

}

export const cancelOrder = async (exchangeContract, dispatch,order,account,onSuccess,onError) => {
  await exchangeContract.methods.cancelOrder(String(order.returnValues.id)).send({from:account})
   .on('receipt', function(receipt){ 
      dispatch(orderCanceled(receipt.events.CancelOrder));
      onSuccess()
    })
    .on('error', function(error){ 
      onError(error.message)
    })
}

export const fillOrder = async (exchangeContract, dispatch,order,account,onSuccess,onError) => {
  await exchangeContract.methods.fillOrder(String(order.returnValues.id)).send({from:account})
   .on('receipt', function(receipt){ 
      // dispatch(orderCanceled(receipt.events.CancelOrder));
      onSuccess()
    })
    .on('error', function(error){ 
      onError(error.message)
    })
}
