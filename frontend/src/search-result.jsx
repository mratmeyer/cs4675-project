import './search-results.css'
import Summary from "./summary"
import Events from "./events"
import Links from './links'

function SearchResults({data}) {
    return (
        <>
            <Summary data={data}/>

            <Events data={data}/>
    
            <Links data={data}/>
    </>
    )
}

export default SearchResults