import './search-results.css'
import Summary from "./summary"
import Events from "./events"
import Links from './links'

function SearchResults({data}) {
    return (
        <>
            <p>{data.SearchResults.Events}</p>
        </>
    )
}

export default SearchResults