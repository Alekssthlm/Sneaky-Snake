const express = require('express');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express")  //swagger api
const swaggerJsDoc = require("swagger-jsdoc")    //swagger api
const PORT = process.env.PORT ?? 8000;

const options = {          //swagger api
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sneaky Snake private API",
      version: "1.0.0",
      description: "A simple snake API"
    },
    servers: [
      {
        url: "http://localhost:8000"
      }
    ]
  },
  apis: ["./index.js"]
}

const allowedOrigins = ['https://sneaky-snake-client.vercel.app', 'http://localhost:8000/'];   // Allowed urls by CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const app = express();
const specs = swaggerJsDoc(options) //swagger api
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))  //swagger api
app.use(cors(corsOptions));
app.use(express.json());

/**
 * @swagger
 * tags:
 *    name: Joke
 *    description: Joke managing API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get new joke
 *     tags: [Joke]
 *     responses:
 *        200:
 *         description: Successful response
 *         content:
 *             text/plain:
 *               schema:
 *                 type: string
 */


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
