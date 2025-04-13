import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './search-bar.css'

function SearchBar({results, onSearch}) {
  const navigate = useNavigate()
  const location = useLocation()

  const getQueryParam = () => {
    const params = new URLSearchParams(location.search)
    return params.get('search') || ''
  }

  const [query, setQuery] = useState('')

  useEffect(() => {
    if (results) {
      setQuery(getQueryParam())
    }
  }, [location.search, results])
  
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