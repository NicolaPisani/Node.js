const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const expressAsyncErrors = require("express-async-errors");
const planetRouter = require("./planetRouter");
const pgp = require("pg-promise")();

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware per il logging delle richieste
app.use(morgan("dev"));

// Middleware per accettare JSON dal client
app.use(express.json());

// Configura la connessione al database PostgreSQL
const db = pgp({
  connectionString: process.env.DB_CONNECTION_STRING, // Aggiungi la tua stringa di connessione PostgreSQL qui
});

// Usa il router dei pianeti
app.use("/api/planets", planetRouter(db));

// Endpoint per ottenere la lista dei pianeti
app.get("/planets", async (req, res) => {
  try {
    const planets = await db.any("SELECT * FROM planets");
    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
