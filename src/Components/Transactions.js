import { useState, useEffect } from "react";
import Format from "./Format.js";
import axios from "axios";

const Transactions = ({parentCallBack}) => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    order: "",
    type: ""
  })
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${URL}/transactions?order=${filter.order}&type=${filter.type}`)
    .then((response) => { return setTransactions(response.data)})
    .catch((e)=> {console.error("catch", e)})
  }, [URL, filter.order, filter.type]);
  
  const handleChange = (event) => {
    filter[event.target.name] !== event.target.value && setFilter({...filter, [event.target.name]: event.target.value})
  };

  const total = transactions.reduce((acc, {amount}) => acc += Number(amount), 0)
  
  //useEffect to update parentCallBack/setUpdate and pass balance up to parent component  
  //only runs when one of its dependencies update
  useEffect(() => {
      parentCallBack(total)
  }, [parentCallBack, total])

  const display = (amount) => {
    const positiveResult = Number(amount) > 1000 ? <span className="p-2 bg-success text-white">{Number(amount).toLocaleString('en-US', {     
      style: 'currency',     
      currency: 'USD',     
      currencyDisplay: 'symbol'})}</span> : <span className="p-2 bg-light text-dark">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
    return Number(amount) > 0 ? positiveResult : <span className="p-2 bg-danger text-white">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
  }
  
  return (
    <div className="Transactions container p-5 my-5 bg-success rounded">
      <h2>Transaction History</h2>
      <button
        className="btn btn-outline-light mb-3 mt-3"
        data-bs-toggle="collapse"
        data-bs-target="#demo">
        Options
      </button>
      <form id="form" className="container mb-4" action="/transactions" method="GET">
        <div
          id="demo"
          className="row collapse justify-content-center form-group text-center small">
            <hr className="mt-2 mb-3"></hr>
            <label className="col" htmlFor="order">Sort by
              <select onChange={handleChange} className="form-control-sm btn-success border-white text-white m-2" name="order">
                <option className="dropdown-item" value="">---</option>
                <option className="dropdown-item" value="asc">{`Date (Asc)`}</option>
                <option className="dropdown-item" value="desc">{`Date (Desc)`}</option>
              </select>
            </label>
            <label className="col" htmlFor="type">Type
              <select onChange={handleChange} className="form-control-sm btn-success border-white text-white m-2" name="type">
                <option className="dropdown-item" value="">---</option>
                <option className="dropdown-item" value="Income">Income</option>
                <option className="dropdown-item" value="Expense">Expense</option>
              </select>
            </label>
            <hr className="mt-3"></hr>
        </div>
      </form>
      <section className="container" style={{overflowX: "scroll"}}>
        <table className="container">
          <thead className="row"><tr className="d-flex justify-content-between text-white pb-2"><td className="col-2">Date</td><td className="col-7">Title</td><td className="col-2">Amount</td></tr></thead>
          <tbody className="row">
            {transactions.map((transaction) => {
              return <Format key={transaction.id} transaction={transaction} />;
            })}
          </tbody>
        </table>
      </section>
      <h2 className="text-end btn btn-outline-warning disabled "><span className="align-middle">Total:</span> {display(total)}</h2>
    </div>
  );
}

export default Transactions;
