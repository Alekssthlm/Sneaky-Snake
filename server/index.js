const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT ?? 8000;

const allowedOrigins = ['https://sneaky-snake-client.vercel.app']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req, res) => {
  const clientUrl = req.get('referer') || 'Unknown';
  
  try {
    let response = await fetch(`${process.env.JOKE_API}`, { 
      headers: {
        Accept: "application/json",
      },
    });
    let data = await response.json();
    if(clientUrl == "https://sneaky-snake-client.vercel.app/"){ 
      res.json(data.joke)
    } else {
      res.json(`Not authorized`)
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
