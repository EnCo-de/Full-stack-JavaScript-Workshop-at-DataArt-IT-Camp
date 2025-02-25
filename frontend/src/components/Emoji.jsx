import { useState, useEffect } from "react"
import { API_BASE_URL, JOKE_ENDPOINT } from '../constants/apiEndpoints';

export default function Emoji(vote) {
  const [value, setValue] = useState(vote.count)
  const isSelected = (vote.jokeId in vote.ballot) && vote.ballot[vote.jokeId].has(vote.emoji)
  const [voted, setVoted] = useState(isSelected)
  const upvote = async function () {
    if (isSelected || voted) return;
    setVoted(true)
    // setValue(prevCount => ++prevCount)
    try {
      const url = `${API_BASE_URL}${JOKE_ENDPOINT}/${vote.jokeId}`
      const body = JSON.stringify({ label: vote.emoji, voteID: vote.voteID.toString() })
      console.log(body)

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
      console.log(vote.emoji, 'Vote submitted successfully.')
      vote.setBallot(prevBallot => {
        if (vote.jokeId in prevBallot) {
          prevBallot[vote.jokeId].add(vote.emoji)
        } else {
          prevBallot[vote.jokeId] = new Set([vote.emoji])         
        }
        return prevBallot
      })
    } catch (error) {
      // error handling logic here, such as displaying an error message
      setVoted(isSelected)  
      console.error('Error submitting form data:', error)
    }
  }

  useEffect(() => {
    console.log("fresh emoji effect", vote.emoji)
    if (voted) setVoted(isSelected)
    if (vote.count != value) setValue(vote.count)
  }, [vote.jokeId]);  // If you specify the dependencies, this Effect runs after the initial render and after re-renders with changed dependencies.


  return <button onClick={upvote} disabled={voted} className="card">
        <span id="emoji">{vote.emoji}</span>&nbsp;
        <span id="count">{value}</span>
      </button>
}