import express from 'express'
import cors from 'cors'
import jokes from '../jokes.js'

const app = express()
const port = 3000 // http://localhost:3000/

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.get("/api/joke", async (req, res) => {
  const sample = (items) => items[Math.floor(Math.random() * items.length)];
  const joke = sample(jokes)
  joke.votes = [
    { value: 10, label: "😂" },
    { value: 5, label: "👍" },
    { value: 3, label: "❤️" },
    { value: 5, label: "⭐" },
  ]
  joke.availableVotes = ["😂", "👍", "❤️", "⭐"],
  // to check loading functionality
  async function sleep(seconds) {
    await new Promise((resolve) => setTimeout(resolve,
      Math.floor(Math.random() * 1000 * seconds)));
    res.json(joke)
  }
  sleep(3)
})

app.post("/api/joke/:id", async (req, res) => {
  if(!request.body) return res.sendStatus(400);
  const jokeID = req.params.id
  console.log(`joke id = ${req.params.id}`);
  const label = req.body
  console.log("body = ", label);
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

