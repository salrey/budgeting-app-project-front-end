import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [transactions, setTransactions] = useState([]);
  
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${URL}/transactions`)
    .then((response) => setTransactions(response.data), [URL]);
  })

  const total = transactions.reduce((acc, {amount}) => acc += Number(amount), 0)

  const display = (amount) => {
    const positiveResult = Number(amount) > 1000 ? <span className="p-2 bg-primary text-white rounded">{Number(amount).toLocaleString('en-US', {     
      style: 'currency',     
      currency: 'USD',     
      currencyDisplay: 'symbol'})}</span> : <span className="p-2 bg-success text-white rounded">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
    return Number(amount) > 0 ? positiveResult : <span className="p-2 bg-danger text-white rounded">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
  }

  return (
    <nav className="container-fluid justify-content-between p-3 bg-primary text-white btn-group gap-3">
      <h1 className="">
        <Link className="btn btn-outline-warning text-white" to="/transactions">Transaction History</Link>
      </h1>
      <h1 className="">Balance: {display(total)}</h1>
      <h1 className="">
        <Link className="btn btn-warning text-primary rounded text-decoration-none" to="/transactions/new">New Transaction</Link>
      </h1>
    </nav>
  );
}

export default NavBar