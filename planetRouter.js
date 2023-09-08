const express = require("express");
const Joi = require("joi");

const router = express.Router();

module.exports = (db) => {
  // Funzione di validazione Joi per i pianeti
  const validatePlanet = (planet) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    return schema.validate(planet);
  };

  // Rotta per ottenere tutti i pianeti
  router.get("/", async (req, res) => {
    try {
      const planets = await db.any("SELECT * FROM planets");
      res.status(200).json(planets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Rotta per ottenere un pianeta per ID
  router.get("/:id", async (req, res) => {
    const planetId = parseInt(req.params.id);

    try {
      const planet = await db.one(
        "SELECT * FROM planets WHERE id = $1",
        planetId
      );
      res.status(200).json(planet);
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: "Planet not found" });
    }
  });

  // Rotta per creare un pianeta
  router.post("/", async (req, res) => {
    const { error } = validatePlanet(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    try {
      await db.none("INSERT INTO planets (name) VALUES ($1)", req.body.name);
      res.status(201).json({ msg: "Planet created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Rotta per aggiornare un pianeta per ID
  router.put("/:id", async (req, res) => {
    const planetId = parseInt(req.params.id);
    const { error } = validatePlanet(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    try {
      await db.none("UPDATE planets SET name = $1 WHERE id = $2", [
        req.body.name,
        planetId,
      ]);
      res.status(200).json({ msg: "Planet updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: "Planet not found" });
    }
  });

  // Rotta per eliminare un pianeta per ID
  router.delete("/:id", async (req, res) => {
    const planetId = parseInt(req.params.id);

    try {
      await db.none("DELETE FROM planets WHERE id = $1", planetId);
      res.status(200).json({ msg: "Planet deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: "Planet not found" });
    }
  });

  return router;
};
