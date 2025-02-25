import express from 'express'
import cors from 'cors'
import db from './connection.js'
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
  res.send('Hello Express! Visit /api/jokes')
})

app.get("/api/joke", async (req, res) => {
  try {
    const joke = await Joke.aggregate(
      [ { $sample: { size: 1 } } ]
    )    
    if (joke) {
      res.json(joke[0])
    } else {
      res.sendStatus(404)    
    }
  } catch (error) {
    console.log('Joke not found');
    res.sendStatus(404)    
  }
})

app.post("/api/joke/:id", async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const jokeId = req.params.id
  const { label, voteId } = req.body
  console.log("joke id = ", jokeId);
  console.log("body = ", req.body);
  console.log("vote id = ", voteId);
  console.log("emoji = ", label);
  
  async function increaseVoteValueBy1(jokeId, voteId) {
    console.log({voteId})
    try {
      // Find the joke and update the specific vote inside the 'votes' array
      const result = await Joke.findOneAndUpdate(
        { id: jokeId, 'votes.label': label },  // Find the joke by its _id and the vote
        {
          $inc: { 'votes.$.value': 1 }  // Increase the 'value' of the matched vote by 1
        },
        { new: true }  // Option to return the updated document
      );
  
      if ((result && Object.keys(result).length > 0)) {
        console.log('Updated joke with increased vote value:', result);
        const updatedVote = await result.votes.find(vote => (
          vote.label === label
        ));
        console.log('Updated Vote:', updatedVote);
        res.json(updatedVote)
      } else {
        console.log('Joke or vote not found', result);
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Error increasing vote value:', error);
      res.sendStatus(400);
    }
  }
  increaseVoteValueBy1(jokeId, voteId);  
})

app.get("/api/jokes", async (req, res) => {  // Fetch all
  let documents = await Joke.find({})
  if (documents.length < 5) {  // Create and save some new Jokes
    jokes.map(async (newJoke) => {
      const sample = function (arr, numItems) {
        // Ensure numItems is not greater than the array length
        if (numItems === arr.length) {
          return arr
        } else if (numItems > arr.length) {
          throw new Error('numItems cannot be greater than the array length');
        }
      
        // We need to keep track of the indices we've already selected so we don’t select the same ones again
        const selected = new Set();
        const result = [];
      
        while (result.length < numItems) {
          const randomIndex = Math.floor(Math.random() * arr.length);          
          // If we haven't picked this index yet, add it to the result
          if (!selected.has(randomIndex)) {
            selected.add(randomIndex);
            result.push(arr[randomIndex]);
          }
        }

        console.log(result);
        return result;
      }

      const emojis = sample(availableVotes, 3)
      newJoke.availableVotes = emojis
      newJoke.votes = emojis.map(label => ({ label }))
      console.log(newJoke.votes)
      const joke = await Joke.create(newJoke)
      console.log("new joke", joke)
    })
    documents = await Joke.find({})
  }
  res.json({ documents })
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

