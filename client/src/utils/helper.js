import moment from "moment";
import Web3 from 'web3';
var _ = require('lodash');
export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000";
const DECIMAL = 10 ** 18;

export const ether = (wei) => {
  if (wei) {
    return wei / DECIMAL;
  }
};
export const token = (n) => ether(n);

export const formatBalance = (n) =>{
  const precision = 100; //2 decimal places
  var balance = ether(n)
  var balance = Math.round(balance * precision)/precision;
  return balance
}

export const filterFilledOrder = (orders) => {
  orders = orders.sort(
    (a, b) => a.returnValues.timestamp - b.returnValues.timestamp
  );
  orders = beautifyOrders(orders);
  return orders;
};

export const beautifyOrders = (orders) => {
  let previousOrder = orders[0];
  return orders.map((order) => {
    order = beautifyFilledData(order);
    order = markColourTag(order, previousOrder);
    previousOrder = order;
    return order;
  });
};

export const beautifyFilledData = (order) => {
  var etherAmount;
  var tokenAmount;
  if (order.returnValues.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.returnValues.amountGive;
    tokenAmount = order.returnValues.amountGet;
  } else {
    tokenAmount = order.returnValues.amountGive;
    etherAmount = order.returnValues.amountGet;
  }

  var tokenPrice = etherAmount / tokenAmount;
  //round off number by 4 decimal places
  const roundOff = 10000;
  tokenPrice = Math.round(tokenPrice * roundOff) / roundOff;

  return {
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: token(tokenAmount),
    tokenPrice: tokenPrice,
    formattedTimestamp: moment
      .unix(order.returnValues.timestamp)
      .format("hh:mm a M/D"),
  };
};

export const markColourTag = (order, prevOrder) => {
  if (order.returnValues.id === prevOrder.returnValues.id) {
    return {
      ...order,
      tokenPriceClass: "success",
    };
  }
  if (prevOrder.tokenPrice <= order.tokenPrice) {
    return {
      ...order,
      tokenPriceClass: "success",
    };
  } else {
    return {
      ...order,
      tokenPriceClass: "danger",
    };
  }
};


export const filterAllOrders = (orders) =>{
    //Remove all canceled & filled Orders
    var all = orders.orders;
    var filled = orders.filledOrders;
    var canceled = orders.canceledOrders;
    
    var openOrders = _.reject(all,(order)=>{
        var filledOrders = filled.some(O => O.returnValues.id === order.returnValues.id)
        var canceledOrder = canceled.some(O => O.returnValues.id === order.returnValues.id)
        return(filledOrders || canceledOrder)
    })
    openOrders = decorateOrderBookOrder(openOrders)
    openOrders = _.groupBy( openOrders, "orderType" )

    const buyOrders = _.get(openOrders, "buy", [])
    openOrders = {
        ...openOrders,
        buyOrders:buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice)
    }
    const sellOrders = _.get(openOrders, "sell", [])

    openOrders = {
        ...openOrders,
        sellOrders:sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice)
    }
    return openOrders    
}

const decorateOrderBookOrder = (orders) =>{
    return orders.map((order) => {
        order = beautifyFilledData(order);
        order = markPunchesTag(order);
        return order;
      });
}

export const markPunchesTag = (order) => {
    const orderType = order.returnValues.tokenGive === ETHER_ADDRESS?"buy":"sell"
      return {
        ...order,
        orderType,
        orderTypeClass: orderType === "buy"?"success":"danger",
        orderFillClass:orderType === "buy"?"sell":"buy"
      };
  };


  export const filterTradeOrders = (orders,account) =>{
    //Remove all canceled & filled Orders
    var all = orders.orders;
    var filled = orders.filledOrders;
    var canceled = orders.canceledOrders;

    all = all.filter(o=> o.returnValues.user === account )
    filled = filled.filter(o=> o.returnValues.user === account )
    canceled = canceled.filter(o=> o.returnValues.user === account )

    var openOrders = _.reject(all,(order)=>{
        var filledOrders = filled.some(O => O.returnValues.id === order.returnValues.id)
        var canceledOrder = canceled.some(O => O.returnValues.id === order.returnValues.id)
        return(filledOrders || canceledOrder)
    })
    
    openOrders = decorateOpenOrder(openOrders)
    var filledOrders = decorateFilledOrder(filled)
    var myTrades = {
        openOrders:openOrders.sort((a, b) => a.returnValues.timestamp - b.returnValues.timestamp),
        filledOrders:filledOrders.sort((a, b) => a.returnValues.timestamp - b.returnValues.timestamp)
    }
    return myTrades    
}

  const decorateFilledOrder = (orders,account) =>{
    return orders.map((order) => {
        order = beautifyFilledData(order);
        order = markFilledOrderStatusTag(order,account);
        return order;
      });
}


const decorateOpenOrder = (orders) =>{
  return orders.map((order) => {
      order = beautifyFilledData(order);
      order = markPunchesTag(order);
      return order;
    });
}


export const markFilledOrderStatusTag = (order,account) => {

  const myOrder = order.returnValues.user === account
  var orderType;
  if(myOrder){
    orderType = order.returnValues.tokenGive === ETHER_ADDRESS?"buy":"sell"
  }else{
    orderType = order.returnValues.tokenGive === ETHER_ADDRESS?"sell":"buy"
  }
   
    return {
      ...order,
      orderType,
      orderTypeClass: orderType === "buy"?"success":"danger",
      orderSign:orderType === "buy"?"+":"-"
    };
};

export const formatCandleChartData = (orders) =>{

  orders = orders.sort((a, b) => a.returnValues.timestamp - b.returnValues.timestamp)
  orders = orders.map((order) => beautifyFilledData(order))
  var [secondLastOrder,lastOrder] = orders.slice(orders.length -2 ,orders.length)
  var lastPrice = _.get(lastOrder,'tokenPrice',0)
  var secondLastPrice = _.get(secondLastOrder,'tokenPrice',0)

return {
  lastPrice,
  lastPriceChange: lastPrice >= secondLastPrice ? "+" : "-",
  series:[{
  data: createChartData(orders)
  }]
}
}

const createChartData = (orders) =>{

  orders = _.groupBy( orders, (o)=>(moment.unix(o.returnValues.timestamp).startOf("minute").format()) )
  var hours = Object.keys(orders)
  var chartData = hours.map(hour=>{
    //calculate open,high,low,close price
    var orderData = orders[hour]
    var open = orderData[0]
    var high = _.maxBy(orderData,"tokenPrice")
    var low = _.minBy(orderData,"tokenPrice")
    var close = orderData[orderData.length - 1]

    return({
      x:new Date(hour),
      y:[open.tokenPrice,high.tokenPrice,low.tokenPrice,close.tokenPrice]
    })
  })
  return chartData
}

export const connectWithWallet = async () => {
  //connect web3 with http provider
  if (window.ethereum) {
   window.ethereum.request({method:"eth_requestAccounts"})
   .then(res=>{
    window.location.reload();
   }).catch(error=>{
     alert(error.message)
   })
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

const chainOrAccountChangedHandler = () => {
  // reload the page to avoid any errors with chain or account change.
  window.location.reload();
}
	// listen for account changes
	window.ethereum.on('accountsChanged', chainOrAccountChangedHandler);
 // Listen for chain change
	window.ethereum.on('chainChanged', chainOrAccountChangedHandler);