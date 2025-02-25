import { useState, useEffect, useRef } from 'react'
import { API_BASE_URL, JOKE_ENDPOINT } from './constants/apiEndpoints'
import Joke from "./components/Joke"
import './App.css'

function App() {
  const [joke, setJoke] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [ballot, setBallot] = useState({})
  const nextButtonRef = useRef(null)

  const fetchJoke = async () => {
    try {
      const url = `${API_BASE_URL}${JOKE_ENDPOINT}`
      const response = await fetch(url)
      const json = await response.json()
      setJoke(json)
      setError(null)
      console.log(json)
    } catch (error) {
      setJoke(null)
      setError(error)
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    };
  }

  useEffect(() => {
    console.log("fetch a Joke effect")
    fetchJoke()
  }, []);  // The empty array means  effect runs once, when the component mounts.

  useEffect(() => {
    if (!loading) {
      nextButtonRef.current.focus()   // Directly focus the next button element      
      console.log('State updated:', loading); // Will run when state changes to false
    }
  }, [loading]); // Runs the effect whenever 'loading' changes
  // If you specify the dependencies, this Effect runs after the initial render and after re-renders with changed dependencies.

  const nextJoke = () => {
    setLoading(true)
    setError(null)
    console.log("clicked to fetch next Joke")
    fetchJoke()
  }

  return <>
      <h1>Jokes Voting</h1>
      <Joke joke={joke} error={error} ballot={ballot} setBallot={setBallot} />
      <button onClick={nextJoke} disabled={loading} ref={nextButtonRef} id="next" className="next">
        {loading ? "Loading" : "Next Joke"}
      </button>
      <footer>
        <p className="read-the-docs">DataArt Winter IT Camp 2025 JavaScript Workshop</p>
        <p className="read-the-docs">Modern JS App Development: React, Node.js</p>
        <a href="https://github.com/EnCo-de/Full-stack-JavaScript-Workshop-at-DataArt-IT-Camp" target="_blank">GitHub code</a>
      </footer>
  </>
}

export default App
