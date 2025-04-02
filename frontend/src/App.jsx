import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './App.css'
// import askBuzzLogo from '../ask-buzz-logo.png'
import Title from './title.jsx'
import SearchBar from './search-bar.jsx'
import SearchResults from './search-result.jsx'

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
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/results?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Title results = {false}/>
      <SearchBar results = {false} onSearch={handleSearch}/>
    </>
  )
}


function SearchQuery() {
  const location = useLocation(); //gets current URL
  const queryParams = new URLSearchParams(location.search); //extracts search parameter
  const query = queryParams.get('search') || ''; //get search term
  
  const [data, setData] = useState(null); //data will store API response
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      setLoading(true);
      try {
        const response = await fetch(`https://qaq2w3yefaclutxxbb3s4hfeea0dgnsj.lambda-url.us-east-1.on.aws/?query=${encodeURIComponent(query)}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, location.search]);


  return (
    <>
      <Title results = {true}/>
      <SearchBar results = {true}/>
      {loading ? <p>Loading...</p> : <SearchResults data={data} />}
    </>
  );



}


export default App
