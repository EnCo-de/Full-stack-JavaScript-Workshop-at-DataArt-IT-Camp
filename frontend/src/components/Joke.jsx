import Emoji from "./Emoji"

export default function Joke({joke, error}) {

  if (error) return <p className="read-the-docs">Error: {error.message}</p>
  const emojis = joke?.votes?.map(
    vote => <Emoji key={vote.label} emoji={vote.label} count={vote.value} jokeId={joke.id} />
  )
  return <>
    {joke ? <main>
        <div className="votes">{emojis}</div>
        <h2 id="question">{joke?.question}</h2>
        <h2 id="answer">{joke?.answer}</h2>
      </main> : <h2 id="loading">Loading a joke ...</h2>
    }
  </>
}