import React, { useEffect } from 'react'
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { loadAccount, loadExchangeContract, loadTokenContract, loadWeb3 } from './redux/interactions';
import Content from './components/Content';

function App() {

  const dispatch = useDispatch()

  const loadBlockChain = async()=>{
     const web3 = await loadWeb3(dispatch)
     await loadAccount(web3,dispatch)
     await loadExchangeContract(web3,dispatch)
     await loadTokenContract(web3,dispatch)
  }

  useEffect(() => {
    loadBlockChain()
  }, [])
  

  return (
   <>
    <NavBar/>
    <Content/>
    </>
  );
}

export default App;
