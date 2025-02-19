import { useState, useEffect } from 'react';
import { API_BASE_URL, JOKE_ENDPOINT } from '../constants/apiEndpoints';
import Emoji from "./Emoji"

export default function Joke(props) {
  const [joke, setJoke] = useState()
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoke = async (url) => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setJoke(data)
        console.log(joke)
      } catch (error) {
        setError(error)
        console.error("Error fetching data:", error);
      } finally {
        props.setLoading(false)
      }
    }

    fetchJoke(`${API_BASE_URL}${JOKE_ENDPOINT}`)
  }, [props.loading]);
  // If you specify the dependencies, this Effect runs after the initial render and after re-renders with changed dependencies.
  // The empty array means  effect runs once, when the component mounts.

  if (error) return <p className="read-the-docs">Error: {error.message}</p>
  const emojis = joke?.votes?.map(
    vote => <Emoji key={vote.label} emoji={vote.label} count={vote.value} />
  )
  return <>
    {joke ? <main>
        <div className="votes card">{emojis}</div>
        <h2 id="question">{joke?.question}</h2>
        <h2 id="answer">{joke?.answer}</h2>
      </main> : props.loading && <h2 id="loading">Loading a joke ...</h2>
    }
  </>
}