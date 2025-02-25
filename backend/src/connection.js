import { env } from 'node:process';
import mongoose from 'mongoose'
import Joke from './models.js'
import jokes from './jokes.js'

/* Connecting to database with object options

Once connected, the open event is fired on the Connection instance.
The the Connection is mongoose.connection.

Note that hard-coding database credentials in source code is not recommended if you're working with real data.
One way to do this is to have the server get the database URL from an environment variable or .env file.
 */
const uri = env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/collections'
mongoose.connect(uri)
.then(() => {
    /** ready to use. The `mongoose.connect()`
     * promise resolves to mongoose instance.
     */
    console.log('Connected to MongoDB!')
})
.catch((error) => console.log("Error!", error))

const db = mongoose.connection
export default db

/* db.once('open', async function() {
    console.log('Database connected once successfully')
    try {
        const documents = await Joke.find({});
        let n = 0
        if (documents.length === 0) {
            console.log(n, "jokes created")
        }
      } catch (error) {
        console.error("Error! Saving one or more documents to the database as an array. ", error);
      }
})
 */
