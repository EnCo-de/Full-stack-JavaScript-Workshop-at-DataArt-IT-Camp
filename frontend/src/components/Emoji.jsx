import { useState } from "react";
import { API_BASE_URL, JOKE_ENDPOINT } from '../constants/apiEndpoints';

export default function Emoji(vote) {
  const [value, setValue] = useState(vote.count)
  const [voted, setVoted] = useState(false)
  const upvote = function (formData) {
    console.log({...formData})
    
    try {
      const url = `${API_BASE_URL}${JOKE_ENDPOINT}/${vote.jokeId}`
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      })
      setValue(prevCount => ++prevCount)
      setVoted(true)  
      // console.log(await response.json())
      console.log('Form data submitted successfully:',
        response.ok, response.status, response.statusText)
    } catch (error) {
      // error handling logic here, such as displaying an error message
      console.error('Error submitting form data:', error)
    }
  }

  return <form action={upvote} method="post">
      <input type="hidden" name="label" value={vote.emoji} />
      <button disabled={voted} className="card">
        <span id="emoji">{vote.emoji}</span>&nbsp;
        <span id="count">{value}</span>
      </button>
    </form>
}