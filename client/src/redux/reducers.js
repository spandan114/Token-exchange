import { combineReducers } from "redux";

const initialState = {};

export const web3Reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "WEB3_LOADER":
      console.log(action);
      return {
        ...state,
        connection: action.payload,
      };
    case "WEB3_ACCOUNT_LOADER":
      console.log(action);
      return {
        ...state,
        account: action.payload,
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
        default:
          return state;
    }
  };

export default combineReducers({
  web3Reducer,tokenReducer,exchangeReducer
});
