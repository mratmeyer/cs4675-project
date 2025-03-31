import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import './App.css'
// import askBuzzLogo from '../ask-buzz-logo.png'
import Title from './title.jsx'
import SearchBar from './search-bar.jsx'
import SearchResults from './search-result.jsx'


// function TestApp() {
//   // Make typeable search bar
//   return (
//     <>
//       <h1>Ask Buzz</h1>
//       <div className="search-bar">
//         <form action="">
//           <input type="text" placeholder="Ask Buzz anything..." name="search" />

//           <button>
//             Search
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
// // Post request to /search POST

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchQuery />}/>
      </Routes>
    </Router>
  )
}

function Home() {
  return (
    <>
      <Title results = {false}/>
      <SearchBar results = {false}/>
    </>
  )
}


function SearchQuery(queryParams) {
  // Gets called when search params
  var data = {
    "summary": "This is the summary",
    "events": ["March 1st", "March 2nd", "March 3rd"],
    "links": ["https://www.google.com", "https://www.amazon.com"]
  }

  return (
    <>
      <Title results = {true}/>
      <SearchBar results = {true}/>
      <SearchResults data={data}/>
    </>
  );



}


export default App
