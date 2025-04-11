import React from "react";

function SearchResults({ data }) {
  if (!data) {
    return <p>No results found.</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      
      {data.summary && <p><strong>{data.summary}</strong></p>}

      {data.results && data.results.length > 0 ? (
        <ul className="response-list">
          {data.results.map((event, index) => (
            <li key={index} className="response-list-item">
              <a href={event.calendar_link} target="_blank" rel="noopener noreferrer" 
              className="block no-underline text-inherit"> 
              <h3>{event.description}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Department:</strong> {event.department}</p>
              <a href={event.calendar_link} target="_blank" rel="noopener noreferrer">
                View Event Details
              </a>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default SearchResults;
