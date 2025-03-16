import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const availableVotes = ['😂', '👍', '❤️', '⭐', '🔥']  // Allowed vote labels

// Define the Vote schema for individual vote entries
const voteSchema = new Schema({
  value: {
    type: Number,
    required: true,
    min: 0,  // Assuming the value range for votes is a minimum of 1
    default: 0, 
  },
  label: {
    type: String,
    required: true,
    // unique: true, // Specifying `index: true` is optional if you specify Unique index.
    minLength: 1, // Checks if the value length is not less than the given number
    maxLength: 4, // Creates a validator that checks if the emoji length value is not greater than the given number
    enum: availableVotes,  // Creates a validator that checks if the value is in the given array.
  }
});

// Define the main Joke schema
const jokeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,  // Ensuring the 'id' is unique
    minlength: 5,  // Adding some basic validation on length
  },
  question: {
    type: String,
    required: true,
    minlength: 5,  // Adding some basic validation on length
  },
  answer: {
    type: String,
    required: true,
  },
  votes: {
    type: [voteSchema],  // Array of votes
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;  // Ensures the votes array isn't empty
      },
      message: 'Votes array must not be empty.'
    }
  },
  availableVotes: {
    type: [String],
    required: true,
    enum: availableVotes,  // Allowed available vote labels
    validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;  // Ensures the availableVotes array isn't empty
        },
        message: 'availableVotes array must not be empty.'
      }
  }
});

// Create the Mongoose model from schema
const Joke = mongoose.model('Joke', jokeSchema);

export default Joke;
export { availableVotes };
