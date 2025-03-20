import {useNavigate} from 'react-router-dom'
import './search-bar.css'

function SearchBar({results}) {
  const navigate = useNavigate()

  const handleSearchClick = (event) => {
    event.preventDefault();
    navigate('/results')
  }

    return (
        <div className={`search-bar-response${results ? '-results': ''}`}>
        <form onSubmit={handleSearchClick}>
          <input type="text" placeholder="Ask Buzz anything..." name="search" />
          <button>
            Search
          </button>
        </form>
      </div>
    )
}

export default SearchBar