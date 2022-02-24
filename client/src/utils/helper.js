export const beatifyFilledData = (order) =>{

    var etherAmount;
    var tokenAmount;
    if(order.returnValues.tokenGive === "0x0000000000000000000000000000000000000000"){
        etherAmount = order.returnValues.amountGive;
        tokenAmount = order.returnValues.amountGet
    }else{
         tokenAmount= order.returnValues.amountGive;
         etherAmount= order.returnValues.amountGet
    }

    return {
        ...order,
        etherAmount,
        tokenAmount
    }
}