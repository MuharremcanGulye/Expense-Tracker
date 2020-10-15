import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {numberWithCommas} from "../utils/format";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amonuts = transactions.map((transaction) => transaction.amount);
  const total = amonuts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <Fragment>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </Fragment>
  );
};

export default Balance;
