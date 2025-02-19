import { useState } from 'react';
import Joke from "./components/Joke"
import './App.css'

function App() {
    const [loading, setLoading] = useState(true);
    const joke = {
        "id": "unique_joke_id",
        "question": "Why did the developer go broke?",
        "answer": "Because he used up all his cache!",
        
        "votes": [
            { "value": 10, "label": "😂" },
            { "value": 5, "label": "👍" },
            { "value": 3, "label": "❤️" },
            { "value": 5, "label": "⭐" },
        ],
        
        "availableVotes": ["😂", "👍", "❤️", "⭐"],
    }
      
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
