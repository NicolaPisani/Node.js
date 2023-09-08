const express = require("express");
const Joi = require("joi");

const router = express.Router();

// Dummy database dei pianeti
let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Funzione di validazione Joi per i pianeti
const validatePlanet = (planet) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(planet);
};

// Rotta per ottenere tutti i pianeti
router.get("/", (req, res) => {
  res.status(200).json(planets);
});

// Rotta per ottenere un pianeta per ID
router.get("/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });
  res.status(200).json(planet);
});

// Rotta per creare un pianeta
router.post("/", (req, res) => {
  const { error } = validatePlanet(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const planet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  planets.push(planet);
  res.status(201).json({ msg: "Planet created successfully" });
});

// Rotta per aggiornare un pianeta per ID
router.put("/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });

  const { error } = validatePlanet(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: "Planet updated successfully" });
});

// Rotta per eliminare un pianeta per ID
router.delete("/:id", (req, res) => {
  const planetIndex = planets.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (planetIndex === -1)
    return res.status(404).json({ msg: "Planet not found" });

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet deleted successfully" });
});

module.exports = router;
