import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './search-bar.css'

function SearchBar({results, onSearch}) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  
  const handleSearchClick = (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      navigate(`/results?search=${encodeURIComponent(query)}`);
    }
  }

    return (
        <div className={`search-bar-response${results ? '-results': ''}`}>
        <form onSubmit={handleSearchClick}>
          <input type="text" 
            placeholder="Ask Buzz anything..." 
            name="search" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
          <button>
            Search
          </button>
        </form>
      </div>
    )
}

export default SearchBar