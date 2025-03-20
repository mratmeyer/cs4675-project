import './search-bar.css'

function SearchBar() {
    return (
        <div className="search-bar-response">
        <form action="">
          <input type="text" placeholder="Ask Buzz anything..." name="search" />
          <button>
            Search
          </button>
        </form>
      </div>
    )
}

export default SearchBar