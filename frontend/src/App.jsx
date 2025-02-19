import { useState } from 'react';
import Joke from "./components/Joke"
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
      
  return <>
      <h1>Jokes Voting</h1>
      <Joke loading={loading} />
      <footer>
        <p className="read-the-docs">DataArt Winter IT Camp 2025 JavaScript Workshop</p>
        <p className="read-the-docs">Modern JS App Development: React, Node.js</p>
        <a href="https://github.com/EnCo-de/Full-stack-JavaScript-Workshop-at-DataArt-IT-Camp" target="_blank">GitHub code</a>
      </footer>
  </>
}

export default App
