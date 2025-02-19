import express from 'express'
import cors from 'cors'
import jokes from '../jokes.js'

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
  const sample = (items) => items[Math.floor(Math.random() * items.length)];
  const joke = sample(jokes)
  joke.votes = [
    { value: 10, label: "😂" },
    { value: 5, label: "👍" },
    { value: 3, label: "❤️" },
    { value: 5, label: "⭐" },
  ]
  joke.availableVotes = ["😂", "👍", "❤️", "⭐"]
  res.json(joke)
})

app.post("/api/joke/:id", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log("body = ", req.body);
  const jokeID = req.params.id
  console.log("joke id = ", jokeID);
  console.log("body = ", req.body);
  const label = req.body?.label
  console.log("emoji = ", label);
  res.json({value: 204})
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

