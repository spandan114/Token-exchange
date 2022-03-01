import {
  accountLoaded,
  allOrderLoaded,
  canceledOrderLoaded,
  exchangeContractLoaded,
  filledOrderLoaded,
  orderCanceled,
  orderFilled,
  tokenContractLoaded,
  web3Loaded,
  walletTokenBalanceLoaded,
  walletEtherBalanceLoaded,
  exchangeEtherBalanceLoaded,
  exchangeTokenBalanceLoaded,
  depositeEtherExchange,
  depositeTokenExchange
} from "./actions";
import Web3 from "web3";
import ExchangeContract from "../artifacts/contracts/Exchange.sol/Exchange.json";
import TokenContract from "../artifacts/contracts/Token.sol/Token.json";
import { ETHER_ADDRESS, formatBalance } from "../utils/helper";

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
    return tokenContract;
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

export const loadBalances = async(web3,dispatch,tokenContact,exchangeContract,account) =>{
   // Wallet ether balance
   const walletEtherBalance = await web3.eth.getBalance(account)
   // Wallet token balance
   const walletTokenBalance = await tokenContact.methods.balanceOf(account).call()
   // Exchange ether balance
   const exchangeEtherBalance = await exchangeContract.methods.balanceOf(account,ETHER_ADDRESS).call()
   // Exchange token balance
   const exchangeTokenBalance = await exchangeContract.methods.balanceOf(account,tokenContact.options.address).call()

    dispatch(walletEtherBalanceLoaded(formatBalance(walletEtherBalance)))
    dispatch(exchangeEtherBalanceLoaded(formatBalance(exchangeEtherBalance)))
    dispatch(walletTokenBalanceLoaded(formatBalance(walletTokenBalance)))
    dispatch(exchangeTokenBalanceLoaded(formatBalance(exchangeTokenBalance)))

}


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

export const subscribeEvents = (exchangeContract,dispatch) =>{
  exchangeContract.events.CancelOrder({},(err,event)=>{
    dispatch(orderCanceled(event));
  })

  exchangeContract.events.FillOrder({},(err,event)=>{
    dispatch(orderFilled(event));
  })

  exchangeContract.events.Deposite({},(err,event)=>{
    if(event.returnValues.token === ETHER_ADDRESS){
      dispatch(depositeEtherExchange(formatBalance(event.returnValues.balance)))
      //TODO: Deduct ether amount from wallet
    }else{
      dispatch(depositeTokenExchange(formatBalance(event.returnValues.balance)))
      //TODO: Deduct token amount from wallet
    }
    
  })

}

export const cancelOrder = async (exchangeContract, order,account,onSuccess,onError) => {
  await exchangeContract.methods.cancelOrder(String(order.returnValues.id)).send({from:account})
   .on('receipt', function(receipt){ 
      onSuccess()
    })
    .on('error', function(error){ 
      onError(error.message)
    })
}

export const fillOrder = async (exchangeContract, order,account,onSuccess,onError) => {
  await exchangeContract.methods.fillOrder(String(order.returnValues.id)).send({from:account})
   .on('transactionHash', function(receipt){ 
      onSuccess()
    })
    .on('error', function(error){ 
      onError(error.message)
    })
}

export const depositeEther = async(web3,etherAmount,exchangeContract,account,onSuccess,onError) =>{
  await exchangeContract.methods.depositeEther().send({from:account,value:web3.utils.toWei(etherAmount)})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

export const depositeToken = async(web3,tokenAddress,tokenAmount,exchangeContract,account,onSuccess,onError) =>{
  tokenAmount = web3.utils.toWei(tokenAmount)
  await exchangeContract.methods.depositeToken(tokenAddress,tokenAmount).send({from:account})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}