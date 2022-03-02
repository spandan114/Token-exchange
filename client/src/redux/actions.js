export const web3Loaded = (connection) => {
    return {
       type:"WEB3_LOADER",
       payload:connection
    }
}

export const tokenContractLoaded = (contract) => {
    return {
       type:"TOKEN_CONTRACT_LOADER",
       payload:contract
    }
}

export const exchangeContractLoaded = (contract) => {
    return {
       type:"EXCHANGE_CONTRACT_LOADER",
       payload:contract
    }
}

export const accountLoaded = (account) => {
    return {
        type:"WEB3_ACCOUNT_LOADER",
        payload:account[0]
     }
}

export const canceledOrderLoaded = (cancelOrders) => {
    return {
        type:"CANCELED_ORDER_LOADER",
        payload:cancelOrders
     }
}

export const filledOrderLoaded = (filledOrders) => {
    return {
        type:"FILLED_ORDER_LOADER",
        payload:filledOrders
     }
}

export const allOrderLoaded = (filledOrders) => {
    return {
        type:"ALL_ORDER_LOADER",
        payload:filledOrders
     }
}

export const orderCanceled = (order) => {
    return {
        type:"CANCEL_ORDER",
        payload:order
     }
}

export const orderFilled = (order) => {
    return {
        type:"FILL_ORDER",
        payload:order
     }
}

export const exchangeTokenBalanceLoaded = (balance) => {
    return {
        type:"LOAD_EXCHANGE_TOKEN_BALANCE",
        payload:balance
     }
}

export const exchangeEtherBalanceLoaded = (balance) => {
    return {
        type:"LOAD_EXCHANGE_ETHER_BALANCE",
        payload:balance
     }
}

export const balancesLoaded = () => {
    return {
        type:"BALANCES_LOADED"
     }
}

export const reloadBalances = () => {
    return {
        type:"BALANCES_LOADING"
     }
}

export const walletEtherBalanceLoaded = (balance) => {
    return {
        type:"LOAD_WALLET_BALANCE",
        payload:balance
     }
}

export const walletTokenBalanceLoaded = (balance) => {
    return {
        type:"LOAD_TOKEN_BALANCE",
        payload:balance
     }
}

export const createOrder = (order) =>{
    return {
        type:"ORDER_CREATED",
        payload:order
     }
}