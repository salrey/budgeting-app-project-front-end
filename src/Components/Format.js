import { Link } from "react-router-dom";

const Format = ({ transaction }) => {
  const display = (amount) => {
    const positiveResult = Number(amount) > 1000 ? <span className="col-2 float-end p-2 bg-success text-nowrap text-white mt-1" style={{overflowX: "scroll"}}>{Number(amount).toLocaleString('en-US', {     
      style: 'currency',     
      currency: 'USD',     
      currencyDisplay: 'symbol'})}</span> : <span className="col-2 float-end p-2 bg-primary text-nowrap text-white mt-1" style={{overflowX: "scroll"}}>{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
    return Number(amount) > 0 ? positiveResult : <span className="col-2 float-end p-2 bg-danger text-no-wrap text-white mt-1" style={{overflowX: "scroll"}}>{Number(amount).toLocaleString('en-US', {     
        style: 'currency',     
        currency: 'USD',     
        currencyDisplay: 'symbol'})}</span>
  }

  const formatDate = (date) => {
    const utcDate = new Date(date)
    const [ month, day, year ] = [ utcDate.getMonth()+1, utcDate.getUTCDate(), utcDate.getFullYear()]
    return `${month} / ${day} / ${year}`
  } 
  return (
      <tr className="Transaction rounded mb-3">
          <td className="row">
            <Link className="list-group-item list-group-item-action" to={`/transactions/${transaction.id}`}><span className="col-2 float-start p-2 bg-secondary text-nowrap text-white mt-1" style={{overflowX: "scroll"}}>{formatDate(transaction.date)}</span><span className="col-7 bg-outline-secondary text-dark text-nowrap d-inline-flex justify-content-center ms-2 me-2" style={{overflowX: "scroll"}}>{transaction.title}</span> {display(transaction.amount)}</Link>
          </td>
      </tr>
  );
}

export default Format;
