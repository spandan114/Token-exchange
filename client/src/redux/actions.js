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