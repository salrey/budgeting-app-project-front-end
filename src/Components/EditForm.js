import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"

const EditForm = () => {
    const navigate = useNavigate()
    const { index } = useParams();
    const URL = process.env.REACT_APP_API_URL;
    const [ checkbox, setCheckbox ] = useState({
        text: "",
        classList: "",
        checked: "",
        min: "",
        max: "",
    })

    const [transaction, setTransaction] = useState({
        id: index,
        date: "",
        title: "",
        amount: "",
        from: "",
        category: "",
        type: ""
    });

    //Instead of useEffect use async/await to run two things w/o dependencies
    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL}/transactions/${index}`)
            setTransaction(response.data)
            setCheckbox({
                text: response.data.type === "Income" ? "Income" : "Expense",
                classList: response.data.type === "Income" ? "col list-group-item form-check-label border border-primary bg-primary text-white fs-2 rounded" : "col list-group-item form-check-label border border-danger bg-danger text-white fs-2 rounded",
                checked: response.data.type === "Income" ? false : true,
                min: response.data.type === "Income" ? 0 : "",
                max: response.data.type === "Income" ? "" : 0,
            })
        } catch(err) {
            alert(err) //> TypeError: failed to fetch
        }
    }
    !transaction.type && fetchData()
    
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

    const updateTransaction = (editedTransaction) => {
        axios.put(`${URL}/transactions/${index}`, editedTransaction)
        .then(() => navigate(`/transactions/${index}`))
        .catch((c) => console.warn("catch", c));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateTransaction(transaction)
    };

    return (
        <div className="Edit container p-5 my-5 bg-warning text-dark rounded" style={{overflowX: "scroll"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2 mt-2">
                    <input
                    className="form-control"
                    id="title"
                    type="text"
                    required
                    value={transaction.title}
                    placeholder="Transaction Title"
                    onChange={handleTextChange}
                    />
                    <label htmlFor="title">Transaction Title:</label>
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
                        checked={checkbox.checked}
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
                <label className="col-4 text-muted mb-3" htmlFor="category">
                    <select onChange={handleTextChange} className="form-control-sm bg-warning text-muted m-2" name="category" id="category" value={transaction.category}required>
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
                <br />
                <button className="btn btn-primary mt-3">Edit</button>
            </form>
            <div className="mt-3">
                <Link className="" to={`/transactions/${index}`}>
                    <button className="btn btn-danger">Nevermind!</button>
                </Link>
            </div>
            <div className="mt-3">
                <Link to={`/transactions`}>
                    <button className="btn btn-success">Back to Transactions</button>
                </Link>
            </div>
        </div>
    );
}

export default EditForm;
