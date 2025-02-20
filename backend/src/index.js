import express from 'express'
import cors from 'cors'
import db from './connections.js'
import Joke, { availableVotes } from './models.js'

import jokes from './jokes.js'

const app = express()
const port = 3000 // http://localhost:3000/

app.use(cors())
app.use(express.json({ limit: '10kb' }))
/* The express.json middleware is important for parsing
 * incoming JSON payloads and making that data available
 * in the req.body or further processing within the routes.
 */

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.get("/api/joke", (req, res) => {
  const joke = await Joke.aggregate(
    [ { $sample: { size: 1 } } ]
  )
  res.json(joke)
})

app.post("/api/joke/:id", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const jokeID = req.params.id
  const { label } = req.body
  console.log("joke id = ", jokeID);
  console.log("body = ", req.body);
  console.log("emoji = ", label);
  res.json({value: 204, jokeID, label})
})

app.get("/api/jokes", (req, res) => {
  const jokes = await Joke.find({})
  res.json({ jokes })
}

app.post("/api/jokes", (req, res) => {
  const newJoke = new Joke(req.body)
  const sample = function(items, n) => {
    const array = []
    for (let index = 0; index < n; index++) {
        array.push(items[Math.floor(Math.random() * items.length)])
    }
    return array
  }
  const emojis = sample(availableVotes, 3)
  newJoke.availableVotes = emojis
  newJoke.votes = emojis.map(label => ({ label }))
  console.log(newJoke.votes)
  joke = await Joke.create(newJoke)
  console.log("new joke created ", joke)
  res.json(joke)
}

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

