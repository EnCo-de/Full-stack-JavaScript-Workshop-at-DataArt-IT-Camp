import express from 'express'

const app = express()
const port = 3000 // http://localhost:3000/

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.get("/api/joke", async (req, res) => {
    const joke = {
      id: "unique_joke_id",
      question: "A couple of relational database admins walked into a NoSQL bar. A little while later they walked out.",
      answer: "Because they couldn't find a table!",
  
      votes: [
        { value: 10, label: "😂" },
        { value: 5, label: "👍" },
        { value: 3, label: "❤️" },
        { value: 5, label: "⭐" },
      ],
  
      availableVotes: ["😂", "👍", "❤️", "⭐"],
    }
    res.send(joke)
  })
  

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

