import moment from 'moment';
export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000"; 
const DECIMAL = (10**18)

export const ether = (wei) =>{
    if(wei){
        return (wei/DECIMAL);
    }
}
export const token = ether

export const filterOrder = (orders) =>{
   orders = orders.sort((a,b)=> a.returnValues.timestamp-b.returnValues.timestamp);
   orders = beautifyOrders(orders)
   return orders
}

export const beautifyOrders = (orders) =>{
    let previousOrder = orders[0];
   return orders.map(order=>{
        order = beautifyFilledData(order);
        order = markColourTag(order,previousOrder)
        previousOrder = order;
        return order;
    })
    
}

export const beautifyFilledData = (order) =>{

    var etherAmount;
    var tokenAmount;
    if(order.returnValues.tokenGive === ETHER_ADDRESS){
        etherAmount = order.returnValues.amountGive;
        tokenAmount = order.returnValues.amountGet;
    }else{
         tokenAmount= order.returnValues.amountGive;
         etherAmount= order.returnValues.amountGet;
    }

    var tokenPrice = (etherAmount/tokenAmount)
    //round off number by 4 decimal places
    const roundOff = 1000;
    tokenPrice = Math.round(tokenPrice*roundOff) /roundOff

    return {
        ...order,
        etherAmount:ether(etherAmount),
        tokenAmount:token(tokenAmount),
        tokenPrice: tokenPrice,
        formattedTimestamp:  moment.unix(order.returnValues.timestamp).format("hh:mm a M/D")
    }
}

export const markColourTag = (order,prevOrder) =>{
if(order.returnValues.id === prevOrder.returnValues.id){
    return {
        ...order,
        tokenPriceClass:"success"
    }
}

if(prevOrder.tokenPrice <= order.tokenPrice){
    return {
        ...order,
        tokenPriceClass:"success"
    }
}else{
    return {
        ...order,
        tokenPriceClass:"danger"
    }
}
}