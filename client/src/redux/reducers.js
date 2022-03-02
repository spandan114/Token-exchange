import { combineReducers } from "redux";

const initialState = {};

export const web3Reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "WEB3_LOADER":
      return {
        ...state,
        connection: action.payload,
      };
    case "WEB3_ACCOUNT_LOADER":
      return {
        ...state,
        account: action.payload,
      };
    case "LOAD_WALLET_BALANCE":
      return {
        ...state,
        walletEtherBalance: action.payload,
      };
    default:
      return state;
  }
};

export const tokenReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "TOKEN_CONTRACT_LOADER":
      return {
        ...state,
        tokenContract: action.payload,
      };
    case "LOAD_TOKEN_BALANCE":
      return {
        ...state,
        walletTokenBalance: action.payload,
      };
    default:
      return state;
  }
};

export const exchangeReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "EXCHANGE_CONTRACT_LOADER":
      return {
        ...state,
        exchangeContract: action.payload,
      };
    case "ALL_ORDER_LOADER":
      return {
        ...state,
        orders: action.payload,
      };
    case "CANCELED_ORDER_LOADER":
      return {
        ...state,
        canceledOrders: action.payload,
      };
    case "FILLED_ORDER_LOADER":
      return {
        ...state,
        filledOrders: action.payload,
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        canceledOrders: [
          ...state.canceledOrders,
          action.payload
        ],
      };
    case "FILL_ORDER":
      return {
        ...state,
        filledOrders: [
          ...state.filledOrders,
          action.payload
        ],
      };
    case "ORDER_CREATED":
      return {
        ...state,
        orders: [
          ...state.orders,
          action.payload
        ],
      };
    case 'BALANCES_LOADING':
      return { ...state, balancesLoading: true }
    case 'BALANCES_LOADED':
        return { ...state, balancesLoading: false }
    case "LOAD_EXCHANGE_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalance:action.payload
      };
    case "LOAD_EXCHANGE_ETHER_BALANCE":
      return {
        ...state,
        etherBalance:action.payload
      };
    case "DEPOSITE_EXCHANGE_ETHER_BALANCE":
      return {
        ...state,
        etherBalance:action.payload
      };
    case "DEPOSITE_EXCHANGE_TOKEN_BALANCE":
      return {
        ...state,
        tokenBalance:action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  web3Reducer,
  tokenReducer,
  exchangeReducer,
});
