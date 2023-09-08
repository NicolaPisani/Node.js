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

// Funzione per ottenere tutti i pianeti
function getAll(req, res) {
  res.status(200).json(planets);
}

// Funzione per ottenere un pianeta per ID
function getOneById(req, res) {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });
  res.status(200).json(planet);
}

// Funzione per creare un pianeta
function create(req, res) {
  const { error } = validatePlanet(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const planet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  planets.push(planet);
  res.status(201).json({ msg: "Planet created successfully" });
}

// Funzione per aggiornare un pianeta per ID
function updateById(req, res) {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });

  const { error } = validatePlanet(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: "Planet updated successfully" });
}

// Funzione per eliminare un pianeta per ID
function deleteById(req, res) {
  const planetIndex = planets.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (planetIndex === -1)
    return res.status(404).json({ msg: "Planet not found" });

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet deleted successfully" });
}

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
