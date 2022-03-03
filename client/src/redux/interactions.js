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
  balancesLoaded,
  reloadBalances,
  createOrder
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
  const network = await web3.eth.net.getId();

  if(network !== Number(process.env.REACT_APP_NETWORK_ID)){
    alert("Contract not deployed in this network !")
  }
  console.log(network)
  dispatch(accountLoaded(account));
  return account;
};

export const loadTokenContract = async (web3, dispatch) => {
  try {
    const tokenContract = new web3.eth.Contract(
      TokenContract.abi,
      process.env.REACT_APP_TOKEN_ADDRESS
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
      process.env.REACT_APP_EXCHANGE_ADDRESS
    );
    dispatch(exchangeContractLoaded(tokenContract));
    return tokenContract;
  } catch (error) {
    alert("Something went wrong token contract not loaded !");
  }
};

export const loadBalances = async(web3,dispatch,tokenContact,exchangeContract,account) =>{
  dispatch(reloadBalances())
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
    dispatch(balancesLoaded())

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

  exchangeContract.events.Order({}, (error, event) => {
    dispatch(createOrder(event))
  })

  exchangeContract.events.Deposite({},(err,event)=>{
      dispatch(balancesLoaded())
  })

  exchangeContract.events.Withdraw({},(err,event)=>{
    dispatch(balancesLoaded())
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
  await exchangeContract.methods.depositeEther().send({from:account,value: web3.utils.toWei(etherAmount, 'ether')})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

export const withdrawEther = async(web3,etherAmount,exchangeContract,account,onSuccess,onError) =>{
  await exchangeContract.methods.withdrawEther(web3.utils.toWei(etherAmount, 'ether')).send({from:account})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

export const depositeToken = async(web3,tokenContract,tokenAmount,exchangeContract,account,onSuccess,onError) =>{
  tokenAmount = web3.utils.toWei(tokenAmount, 'ether')

  await tokenContract.methods.approve(exchangeContract.options.address,tokenAmount).send({from:account})
  .on('transactionHash', async function(hash){ 
      await exchangeContract.methods.depositeToken(tokenContract.options.address,tokenAmount).send({from:account})
      .on('transactionHash', function(hash){ 
        onSuccess()
      })
      .on('error', function(error){ 
        onError(error.message)
      })
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

export const withdrawToken = async(web3,tokenContract,tokenAmount,exchangeContract,account,onSuccess,onError) =>{
  tokenAmount = web3.utils.toWei(tokenAmount, 'ether')

  await exchangeContract.methods.withdrawToken(tokenContract.options.address,tokenAmount).send({from:account})
  .on('transactionHash', function(hash){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

export const buyToken = async(web3,dispatch,buyAmount,buyPrice,tokenContract,exchangeContract,account,onSuccess,onError) =>{

  var tokenGet = web3.utils.toWei(buyAmount, 'ether');
  //Ex: i want to buy 10 token each token price is 0.001 then 10 token = 10 * 0.01
  var etherGive = web3.utils.toWei((buyAmount*buyPrice).toString(), 'ether') 

  await exchangeContract.methods.makeOrder(ETHER_ADDRESS,etherGive,tokenContract.options.address,tokenGet).send({from:account})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

export const sellToken = async(web3,dispatch,sellAmount,sellPrice,tokenContract,exchangeContract,account,onSuccess,onError) =>{

  var tokenGive= web3.utils.toWei(sellAmount, 'ether');
  //Ex: i want to sell 10 token each token price is 0.001 then 10 token = 10 * 0.01
  var etherGet = web3.utils.toWei((sellAmount*sellPrice).toString(), 'ether')

  await exchangeContract.methods.makeOrder(tokenContract.options.address,tokenGive,ETHER_ADDRESS,etherGet).send({from:account})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}