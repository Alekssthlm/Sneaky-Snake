const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT ?? 8000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) =>{
  console.log(req.url)
  const clientUrl = req.get('referer') || 'Unknown';
  
  try {
    let response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    let data = await response.json()
    if(clientUrl == "https://sneaky-snake-client.vercel.app/"){ 
      res.json(data.joke)
    } else {
      res.json(`Not authorized ${clientUrl}`)
    }
  } catch (err) {
    console.error(err.message)
  }
})


app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})