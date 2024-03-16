const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT ?? 8000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) =>{
  console.log(req.url)
  const fullUrl = `${req.protocol}://${req.hostname}${req.originalUrl}`;
  console.log('Full Request URL:', fullUrl);
  try {
    let response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    let data = await response.json()
    if(fullUrl == "https://sneaky-snake-client.vercel.app"){
      res.json(data.joke)
    } else {
      res.json(`Not authorized ${fullUrl}`)
    }
  } catch (err) {
    console.error(err.message)
  }
})


app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})