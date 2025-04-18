import React from "react";

function SearchResults({ data }) {
  if (!data) {
    return <p>No results found.</p>;
  }

  return (
    <div className="search-results">
      
      {data.summary && <p><strong>{data.summary}</strong></p>}

        <ul className="response-list">
          {data.results.map((event, index) => (
            <li key={index} className="response-list-item">
            <div className="block no-underline text-inherit">
              <h3>{event.description}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Department:</strong> {event.department}</p>
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                View Event Details
              </a>
            </div>
          </li>
          ))}
        </ul>
    </div>
  );
}

export default SearchResults;
