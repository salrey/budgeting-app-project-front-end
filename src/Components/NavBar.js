import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = ({update}) => {
  const [balance, setBalance] = useState();  
  const URL = process.env.REACT_APP_API_URL;
  const sum = (transactions) => {
    return transactions.reduce((acc, transaction) => acc+=transaction.amount,0)
  }
  
  useEffect(() => {
    axios.get(`${URL}/transactions`)
    .then((response) => {
      return setBalance(sum(response.data))
    })
    .catch((e) => console.error("catch", e));
  }, [URL])

  const display = (amount) => {
    const positiveResult = Number(amount) > 1000 ? <span className="p-2 bg-success text-white rounded">{Number(amount).toLocaleString('en-US', {     
      style: 'currency',     
      currency: 'USD',     
      currencyDisplay: 'symbol'})}</span> : <span className="p-2 bg-light text-dark rounded">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
    return Number(amount) > 0 ? positiveResult : <span className="p-2 bg-danger text-white rounded">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
  }

  const total = update === undefined ? balance : update
   

  return (
    <nav className="container-fluid p-3 bg-primary text-white" style={{overflowX: "scroll"}}>
      <div className="container-fluid justify-content-between p-3 bg-primary text-white btn-group gap-3">
        <h1 className="">
          <Link className="btn btn-outline-warning text-white" to="/transactions">Transaction History</Link>
        </h1>
        <h1 className="btn btn-outline-warning text-white d-inline-flex justify-content-center align-items-center rounded disabled">Balance: {display(total)}</h1>
        <h1 className="">
          <Link className="btn btn-warning text-primary rounded text-decoration-none" to="/transactions/new">New Transaction</Link>
        </h1>
      </div>
    </nav>
  );
}

export default NavBar