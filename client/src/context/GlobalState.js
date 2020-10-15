import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from "axios";

//Inital State
const initialState = {
  transactions: [],
  error : null,
  loading : true
};

export const GlobalContext = createContext(initialState);

//Provider Components
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTransactions = async() => {
    try {
      const res = await axios.get("/api/v1/transactions");

      dispatch({
        type : 'GET_TRANSACTIONS',
        payload : res.data.data
      });
 
    } catch (error) {
      dispatch({
        type : 'TRANSACTION_ERROR',
        payload : error.response.data.error
      })
    }
  }

  const deleteTransaction = async(id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type : "DELETE_TRANSACTION",
        payload : id
      });
    } catch (error) {
      dispatch({
        type : "TRANSACTION_ERROR",
        payload : error.response.data.error
      })
    }
  }

  const addTransaction = async(transaction) => {

    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/transactions' , transaction , config);

      dispatch({
        type : "ADD_TRANSACTION",
        payload : res.data.data
      })

    } catch (error) {
      
      dispatch({
        type : "TRANSACTION_ERROR",
        payload : error.response.data.error
      })
      
    }

  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        deleteTransaction,
        addTransaction,
        error : state.error,
        loading : state.loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
