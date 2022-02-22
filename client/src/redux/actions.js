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