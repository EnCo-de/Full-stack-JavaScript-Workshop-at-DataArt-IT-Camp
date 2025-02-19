import { useState } from "react";
import { API_BASE_URL, JOKE_ENDPOINT } from '../constants/apiEndpoints';

export default function Emoji(vote) {
  const [value, setValue] = useState(vote.count)
  const [voted, setVoted] = useState(false)
  const upvote = async function () {
    setVoted(true)
    try {
      const url = `${API_BASE_URL}${JOKE_ENDPOINT}/${vote.jokeId}`
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ label: "example" }),
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
      console.log('Vote submitted successfully.')
    } catch (error) {
      // error handling logic here, such as displaying an error message
      setVoted(false)  
      console.error('Error submitting form data:', error)
    }
  }

  return <button onClick={upvote} disabled={voted} className="card">
        <span id="emoji">{vote.emoji}</span>&nbsp;
        <span id="count">{value}</span>
      </button>
}