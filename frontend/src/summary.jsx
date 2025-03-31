import './summary.css'

function Summary({data}) {
    return(
        <div className="summary-response">
        <h3>Summary</h3>
        <p className="summary-text">{data["summary"]}</p>
        </div>
    )
}

export default Summary