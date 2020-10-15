import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';

const TransactionList = () => {
  const { transactions,getTransactions } = useContext(GlobalContext);

  useEffect(() => {

    getTransactions();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>History</h3>
      {transactions.length > 0 ? <ul className='list'>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul> : "No Transactions" }     
    </div>
  );
};

export default TransactionList;
