import { useState } from "react";

export default function Emoji(vote) {
  const [value, setValue] = useState(vote.count)
  const [voted, setVoted] = useState(false)
  const upvote = function (formData) {
      console.log({...formData})
      setValue(prevCount => ++prevCount)
      setVoted(true)
      const button = event.currentTarget
        button.style.color = "#f9f9f9"
        button.style.backgroundColor = "#646cff"
        button.style.fontWeight = "bold"  
  }

  return <form action={upvote} method="post">
        <input type="hidden" name="label" value={vote.emoji} />
        <button disabled={voted} className="card">
            <span id="emoji">{vote.emoji}</span>&nbsp;
            <span id="count">{value}</span>
        </button>
    </form>
}