import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 0,
    category: "Investments",
    type: "Income",
    date: "2022-10-19",
    id: "a24648c1-d97b-4675-b182-0f77877060ea",
  },
];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState) 
    const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  const addTransaction = (transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
  const balance = transactions.reduce((acc,currVal)=>currVal.type==='Income'? acc + currVal.amount : acc - currVal.amount,0)   
    
    return (
        <ExpenseTrackerContext.Provider value={{ deleteTransaction,addTransaction,transactions,balance }} >
            {children}
        </ExpenseTrackerContext.Provider>
    )
}     