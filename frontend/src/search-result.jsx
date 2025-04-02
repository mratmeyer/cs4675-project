import React from "react";

function SearchResults({ data }) {
  if (!data) {
    return <p>No results found.</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      
      {/* Display the summary */}
      {data.summary && <p><strong>{data.summary}</strong></p>}

      {/* Display each event in results */}
      {data.results && data.results.length > 0 ? (
        <ul>
          {data.results.map((event, index) => (
            <li key={index} className="event-card">
              <h3>{event.description}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Department:</strong> {event.department}</p>
              <a href={event.calendar_link} target="_blank" rel="noopener noreferrer">
                View Event Details
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
