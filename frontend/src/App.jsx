import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function TestApp() {
  // Make typeable search bar
  return (
    <>
      <h1>Ask Buzz</h1>
      <div className="search-bar">
        <form action="">
          <input type="text" placeholder="Ask Buzz anything..." name="search" />

          <button>
            Search
          </button>
        </form>
      </div>
    </>
  );
}
// Post request to /search POST


function SearchQuery(queryParams) {
  // Gets called when search params

  // Make Logo and Search bar at top, 

  // Summary section

  // Dates

  // Links section
  var data = {
    "summary": "This is the summary",
    "events": ["March 1st", "March 2nd"],
    "links": ["www.google.com", "www.amazon.com"]
  }

  return (
    <>
      <h2>Search Query Response Page</h2>
      <div className="search-bar-response-page">
        <form action="">
          <input type="text" placeholder="Ask Buzz anything..." name="search" />
          <button>
            Search
          </button>
        </form>
      </div>

      <div className="summary-response">
        <h3>Summary</h3>
        <p class="summary-text">{data["summary"]}</p>

      </div>

      <div className="block-responses">
        <h3>Events</h3>
        <div className="items-container">
          {data["events"].map((event, index) => (
            <div key={index} className='block-item' >{event}</div>
          ))}
        </div>

      </div>

      <div className="block-responses">
        <h3>Links</h3>
        <div className="items-container">
          {data["links"].map((link, index) => (
            <div key={index} className='block-item'>{link}</div>
          ))}
        </div>

      </div>
    </>
  );



}


export default SearchQuery
