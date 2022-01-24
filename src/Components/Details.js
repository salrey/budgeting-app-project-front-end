import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"

const Details = () => {
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);
    const { index } = useParams();
    const URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(URL+"/transactions/"+index)
        .then((response) => setTransaction(response.data))
    }, [URL, index])

    const deleteTransaction = () => {
        axios.delete(`${URL}/transactions/${index}`)
        .then(() => navigate("/transactions"));
    };

    const handleDelete = () => {
        deleteTransaction()
    };

    const display = (amount) => {
        const positiveResult = Number(amount) > 1000 ? <span className="col p-2 bg-primary text-white">{Number(amount).toLocaleString('en-US', {     
            style: 'currency',     
            currency: 'USD',     
            currencyDisplay: 'symbol'})}</span> : <span className="col p-2 bg-success text-white">{Number(amount).toLocaleString('en-US', {     
                style: 'currency',     
                currency: 'USD',     
                currencyDisplay: 'symbol'})}</span>
        return Number(amount) > 0 ? positiveResult : <span className="col p-2 bg-danger text-white">{Number(amount).toLocaleString('en-US', {     
                style: 'currency',     
                currency: 'USD',     
                currencyDisplay: 'symbol'})}</span>
    }

    const formatDate = (date) => {
        const utcDate = new Date(date)
        const [ month, day, year ] = [ utcDate.getMonth()+1, utcDate.getDate(), utcDate.getFullYear()]
        return `${month} / ${day} / ${year}`
    } 

    const type = (type) => {
        return type === "Income" ? <span className="col p-2 bg-primary text-white border-start border-end">{type}</span> : <span className="col p-2 bg-danger text-white border-start border-end">{type}</span>
    }
    
    return (
        <article className="container p-5 my-5 bg-warning text-dark rounded">
            <div className="container">
                <h1 className="text-white mb-3">{transaction.title}</h1>
                <h4 className="row"><span className="fw-bold">Date</span><span className="small">{formatDate(transaction.date)}</span></h4>
                <h4 className="row"><span className="fw-bold">From</span><span className="small">{transaction.from}</span></h4>
                <hr></hr>
                <div className="row mb-2"><span className="col fw-bold">Category</span><span className="col fw-bold">Type</span><span className="col fw-bold">Amount</span></div>
                <p className="row mb-4"><span className="col p-2 bg-secondary text-white">{transaction.category}</span>{type(transaction.type)} {display(transaction.amount)} </p>
                <hr className=""></hr>
            </div>
            <div className="showNavigation btn-group mt-2 gap-3">
                <div>
                {" "}
                <Link to={`/transactions`}>
                    <button className="btn btn-success">Back</button>
                </Link>
                </div>
                <div>
                {" "}
                <Link to={`/transactions/${index}/edit`}>
                    <button className="btn btn-primary">Edit</button>
                </Link>
                </div>
                <div>
                {" "}
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </article>
    );
}

export default Details;
