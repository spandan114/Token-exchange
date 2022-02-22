import { accountLoaded, exchangeContractLoaded, tokenContractLoaded, web3Loaded } from "./actions";
import Web3 from 'web3';
import ExchangeContract from "../artifacts/contracts/Exchange.sol/Exchange.json"
import TokenContract from "../artifacts/contracts/Token.sol/Token.json"

export const loadWeb3 = async (dispatch) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    dispatch(web3Loaded(web3))
    return web3
}

export const loadAccount = async (web3,dispatch) => {
    const account = await web3.eth.getAccounts()
    dispatch(accountLoaded(account))
    return account
}

export const loadTokenContract = async (web3,dispatch) => {
    const tokenContract = new web3.eth.Contract(
        TokenContract.abi,
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
    dispatch(tokenContractLoaded(tokenContract))
    return null
}

export const loadExchangeContract = async (web3,dispatch) => {
    const tokenContract = new web3.eth.Contract(
        ExchangeContract.abi,
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      );
    dispatch(exchangeContractLoaded(tokenContract))
    return null
}