import { env } from 'node:process';
import mongoose from 'mongoose'
import Joke, { availableVotes } from './models.js'
import jokes from './jokes.js'

/* Connecting to database

Once connected, the open event is fired on the Connection instance.
The the Connection is mongoose.connection.

Note that hard-coding database credentials in source code is not recommended if you're working with real data.
One way to do this is to have the server get the database URL from an environment variable or .env file.
 */
const uri = env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/test'
mongoose.connect(uri)
.then(() => {
    /** ready to use. The `mongoose.connect()`
     * promise resolves to mongoose instance.
     */
    console.log('Connected to MongoDB!')
    Joke.estimatedDocumentCount().exec()
    .then((count) => console.log("It has", count, "jokes."))
})
.catch((error) => console.log("Error!", error))

const db = mongoose.connection
db.once('open', async function() {
  console.log('Database once open client must ensure that it has some funny Jokes.')
  try {
    const documents = await Joke.find({})
    console.log(documents.length, "jokes found at start.")
    if (documents.length < 5) {  // Create and save some new Jokes
      let n = 0
      const insertJokes = async function() {
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
          return result;
        }
        for (const newJoke of jokes) {
          const emojis = sample(availableVotes, 3)
          newJoke.availableVotes = emojis
          newJoke.votes = emojis.map(label => ({ label }))
          const joke = await Joke.create(newJoke)
          n++
        }
        return n
      }
      const inserted = await insertJokes()
      console.log("It has inserted", inserted, "jokes.")
    }
  } catch (error) {
    console.error("Error! Saving one or more documents to the database as an array. ", error);
  }
})

export default db
