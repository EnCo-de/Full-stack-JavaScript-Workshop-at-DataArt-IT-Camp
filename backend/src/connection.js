import { env } from 'node:process';
import mongoose from 'mongoose'
import Joke from './models.js'
import jokes from './jokes.js'

/* Connecting to database with object options

Once connected, the open event is fired on the Connection instance.
The the Connection is mongoose.connection.

Note that hard-coding database credentials in source code is not recommended if you're working with real data.
One way to do this is to have the server get the database URL from an environment variable, another .env file.
 */
const uri = env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/collections'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options);
.then(() => {
    /** ready to use. The `mongoose.connect()`
     * promise resolves to mongoose instance.
     */
    console.log('Connected to MongoDB!')
})
.catch((error) => console.log("Error!", error))

const db = mongoose.connection
db.once('open', async function() {
    console.log('Database connected once successfully')
    try {
        const documents = await Joke.find({});
        if (documents.length === 0) {
            Joke.create(jokes).then((created) => console.log(created))
        }
      } catch (error) {
        console.error("Error! Saving one or more documents to the database as an array. ", error);
      }
})

export default db