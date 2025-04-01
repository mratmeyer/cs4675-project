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


function SearchQuery(queryParams) {
  // Gets called when search params
  // var data = {
  //   "summary": "This is the summary",
  //   "events": ["March 1st", "March 2nd", "March 3rd"],
  //   "links": ["https://www.google.com", "https://www.amazon.com"]
  // }

  const location = useLocation(); //gets current URL
  const queryParams = new URLSearchParams(location.search); //extracts search parameter
  const query = queryParams.get('search') || ''; //get search term
  
  const [data, setData] = useState(null); //data will store API response
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch('https://qaq2w3yefaclutxxbb3s4hfeea0dgnsj.lambda-url.us-east-1.on.aws/');
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
  }, [query]);


  return (
    <>
      <Title results = {true}/>
      <SearchBar results = {true}/>
      {loading ? <p>Loading...</p> : <SearchResults data={data} />}
    </>
  );



}


export default App
