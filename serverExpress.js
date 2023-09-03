const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const expressAsyncErrors = require("express-async-errors");

dotenv.config(); // Carica le variabili d'ambiente da un file .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware per il logging delle richieste
app.use(morgan("dev"));

// Middleware per accettare JSON dal client
app.use(express.json());

//  "database" dei pianeti
let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
  {
    id: 3,
    name: "Saturn",
  },
  {
    id: 4,
    name: "Moon",
  },
];

// Endpoint per ottenere la lista dei pianeti
app.get("/planets", (req, res) => {
  res.json(planets);
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
