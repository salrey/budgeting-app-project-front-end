import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const NewForm = () => {
    const newID = uuidv4();
    const URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [ checkbox, setCheckbox ] = useState({
        text: "Income",
        classList: "col list-group-item form-check-label border border-primary bg-primary text-white fs-2 rounded",
        min: 0,
        max: "",
    })
    const [ transaction, setTransaction ] = useState({
        id: newID,
        date: "",
        title: "",
        amount: 0,
        from: "",
        category: "",
        type: "Income"
    });

    const handleTextChange = (event) => {
        if (event.target.id === "amount") {
            if (transaction.type === "Income") {
                if (event.target.value < 0) {
                    event.target.value *= -1
                }
            }
            if (transaction.type === "Expense") {
                if (event.target.value > 0) { 
                    event.target.value *= -1 
                }
            } 
            setTransaction({ ...transaction, [event.target.id]: Number(event.target.value)}); 
        } else {
            setTransaction({ ...transaction, [event.target.id]: event.target.value});
        }
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked === false) {
            setCheckbox({
                text: "Income",
                classList: "col list-group-item form-check-label border border-primary bg-primary text-white fs-2 rounded",
                min: 0
            })
            if (transaction.amount < 0) {
                transaction.amount *= -1
                setTransaction({...transaction, amount: transaction.amount 
                })
            }
            setTransaction({...transaction, type: "Income"})
        } else {
            setCheckbox({
                text: "Expense",
                classList: "col list-group-item form-check-label border border-danger bg-danger text-white fs-2 rounded",
                min: "",
                max: 0,
            })
            if (transaction.amount > 0) {
                transaction.amount *= -1
                setTransaction({...transaction, amount: transaction.amount
                })
            }
            setTransaction({...transaction, type: "Expense"})
        }
    };

    const addTransaction = (newTransaction) => {
        axios.post(`${URL}/transactions`, newTransaction)
        .then(() => navigate("/transactions"))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(transaction)
        addTransaction(transaction)
    };


    return (
        <div className="New container p-5 my-5 bg-warning text-dark rounded">
            <h2 className="text-white mb-5">New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2 mt-2">
                    <input
                    className="form-control"
                    id="title"
                    value={transaction.title}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Transaction Title"
                    required
                    />
                    <label htmlFor="title">Transaction Title</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                    <input 
                    type="date" 
                    className="form-control" 
                    id="date" 
                    name="date" 
                    value={transaction.date} 
                    onChange={handleTextChange}
                    placeholder="Date"
                    required
                    />
                    <label htmlFor="date">Date:</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                    <input
                    className="form-control"
                    id="from"
                    value={transaction.from}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="From"
                    required
                    />
                    <label htmlFor="from">From:</label>
                </div>
                <div className="list-group list-group-horizontal form-check form-switch rounded justify-content-center">
                    <label className={checkbox.classList} id={checkbox.text}>{checkbox.text}
                        <input
                        className="col-md-auto list-group-item form-check-input border-white m-2"
                        id="type"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
                <div className="form-floating mb-3 mt-3">
                    <input
                    className="form-control"
                    id="amount"
                    type="number"
                    name="amount"
                    min={checkbox.min}
                    max={checkbox.max}
                    value={transaction.amount}
                    placeholder="Amount"
                    onChange={handleTextChange}
                    required
                    />
                    <label htmlFor="amount">Amount:</label>
                </div>
                <div className="justify-content ">
                    <label className="col-md-auto mb-3" htmlFor="category">
                        <select onChange={handleTextChange} className="form-control-sm bg-warning text-muted m-2" name="category" id="category" required>
                            <option className="dropdown-item" value="">---choose a category---</option>
                            <option className="dropdown-item" value="Income">Income</option>
                            <option className="dropdown-item" value="Expenses">Expenses</option>
                            <option className="dropdown-item" value="Taxes">Taxes</option>
                            <option className="dropdown-item" value="Retirement">Retirement</option>
                            <option className="dropdown-item" value="Savings">Savings</option>
                            <option className="dropdown-item" value="Credit Cards">Credit Cards</option>
                            <option className="dropdown-item" value="Transfer">Transfer</option>
                            <option className="dropdown-item" value="Restaurants/Dining">Restaurants/Dining</option>
                            <option className="dropdown-item" value="Bills/Utilities">Bills/Utilities</option>
                            <option className="dropdown-item" value="Groceries">Groceries</option>
                            <option className="dropdown-item" value="Pets">Pets</option>
                            <option className="dropdown-item" value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
            <Link to={`/transactions`}>
                <button className="btn btn-danger mt-3">Delete</button>
            </Link>
        </div>
    );
}

export default NewForm;
