import { Link } from "react-router-dom";

const Format = ({ transaction }) => {
  const display = (amount) => {
    const positiveResult = Number(amount) > 1000 ? <span className="col-2 float-end badge bg-primary text-truncate mt-1">{Number(amount).toLocaleString('en-US', {     
      style: 'currency',     
      currency: 'USD',     
      currencyDisplay: 'symbol'})}</span> : <span className="col-2 float-end badge bg-success text-truncate mt-1">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
    return Number(amount) > 0 ? positiveResult : <span className="col-2 float-end badge bg-danger text-truncate mt-1">{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
  }

  const formatDate = (date) => {
    const utcDate = new Date(date)
    const [ month, day, year ] = [ utcDate.getMonth()+1, utcDate.getDate(), utcDate.getFullYear()]
    return `${month} / ${day} / ${year}`
  } 
  return (
      <tr className="Transaction rounded mb-3">
          <td className="row">
            <Link className="list-group-item list-group-item-action" to={`/transactions/${transaction.id}`}><span className="col-2 float-start badge bg-secondary text-truncate text-white mt-1">{formatDate(transaction.date)}</span><span className="col-7 badge bg-outline-secondary text-dark text-truncate ms-2 me-2 pt-2">{transaction.title}</span> {display(transaction.amount)}</Link>
          </td>
      </tr>
  );
}

export default Format;
