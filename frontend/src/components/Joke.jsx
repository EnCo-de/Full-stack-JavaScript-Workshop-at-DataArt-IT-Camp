import Emoji from "./Emoji"

export default function Joke({joke, error, ballot, setBallot}) {
  if (error) return <p className="read-the-docs state">Error: {error.message}</p>
  const emojis = joke?.votes?.map(
    vote => <Emoji key={vote._id} voteID={vote._id} emoji={vote.label} count={vote.value} jokeId={joke.id} ballot={ballot} setBallot={setBallot} />
  )
  return <>
    {joke ? <main>
        <div className="votes">{emojis}</div>
        <h2 id="question">{joke?.question}</h2>
        <h2 id="answer">{joke?.answer}</h2>
      </main> : <h2 id="loading" className="state">Loading a joke ...</h2>
    }
  </>
}