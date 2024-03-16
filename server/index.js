const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT ?? 8000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) =>{
  try {
    let response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    let data = await response.json()
    res.json(data.joke)
  } catch (err) {
    console.error(err.message)
  }
})


app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})