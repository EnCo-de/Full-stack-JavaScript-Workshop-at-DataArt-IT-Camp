const mongoose = require('mongoose');
const { Schema } = mongoose;

const availableVotes = ['😂', '👍', '❤️', '⭐']

// Define the Vote schema for individual vote entries
const voteSchema = new Schema({
  value: {
    type: Number,    required: true,
    min: 1,  // Assuming the value range for votes is a minimum of 1
    max: 10  // Assuming the value range for votes is a maximum of 10
  },
  label: {
    type: String,
    required: true,
    enum: availableVotes,  // Allowed vote labels
  }
});

// Define the main Joke schema
const jokeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,  // Ensuring the 'id' is unique
  },
  question: {
    type: String,
    required: true,
    minlength: 5,  // Adding some basic validation on length
  },
  answer: {
    type: String,
    required: true,
    minlength: 5,  // Adding some basic validation on length
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
  }
});

// Create the Mongoose model
const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;
