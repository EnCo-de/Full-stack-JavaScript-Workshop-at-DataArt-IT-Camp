import { useState, useEffect } from "react"
import { API_BASE_URL, JOKE_ENDPOINT } from '../constants/apiEndpoints';

export default function Emoji(vote) {
  const [value, setValue] = useState(vote.count)
  const [voted, setVoted] = useState(false)
  const upvote = async function () {
    setVoted(true)
    try {
      const url = `${API_BASE_URL}${JOKE_ENDPOINT}/${vote.jokeId}`
      const body = JSON.stringify({ label: vote.emoji })
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      // Otherwise, we can read the body as JSON
      const data = await response.json()
      console.log(data)
      setValue(data.value)
      // setValue(prevCount => ++prevCount)
      console.log(vote.emoji, 'Vote submitted successfully.')
    } catch (error) {
      // error handling logic here, such as displaying an error message
      setVoted(false)  
      console.error('Error submitting form data:', error)
    }
  }

  useEffect(() => {
    console.log("fresh emoji effect", vote.emoji)
    if (voted) setVoted(false)
    if (vote.count != value) setValue(vote.count)
  }, [vote.jokeId]);  // If you specify the dependencies, this Effect runs after the initial render and after re-renders with changed dependencies.


  return <button onClick={upvote} disabled={voted} className="card">
        <span id="emoji">{vote.emoji}</span>&nbsp;
        <span id="count">{value}</span>
      </button>
}