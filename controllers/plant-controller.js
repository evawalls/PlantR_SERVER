const router = require('express').Router();
const Plant= require('../db').import('../models/plant-model');

let validateSession = require('../middleware/validate-session');
var sequelize = require('../db');
// var Plant = sequelize.import('../models/plant-controller');


router.post('/add', validateSession, (req, res) => {
  const createPlant = {
    name: req.body.plant.species,
    quantity: req.body.plant.time,
    caretaker: req.body.plant.date,
    imageURL: req.body.plant.imageURL
  } 
  Plant.create(createPlant)
  .then(plant => res.status(200).json(plant))
  .catch(err => res.status(500).json({error: err}))
  
});

router.get("/plant/list", validateSession, (req, res) => {
  Plant.findAll()
  .then(plants => res.status(200).json(plants))
  .catch(err => res.status(500).json({error: err}))
});

router.get("/:id", validateSession, (req, res) => {
  let id = req.params.id
  plant.findAll({
    where: {id: id}
})
  .then(plants => res.status(200).json(plants))
  .catch(err => res.status(500).json({error: err}))
});

router.put('/:id', validateSession, function(req, res) {
  const updateLogs = {
    name: req.body.plant.species,
    quantity: req.body.plant.time,
    caretaker: req.body.plant.date,
    imageURL: req.body.plant.imageURL,
    // NEED IMAGE ID*****
  };
  const query = { where: {id: req.params.id}};

  Plant.update(updatePlants, query)
  .then((plants) => res.status(200).json(plants))
  .catch((err) => res.status(500).json({error: err}));
})


router.delete('/:id', validateSession, function(req, res) {
const query = { where: { id: req.params.id, owner_id: req.user.id}};
Plant.destroy(query)
.then((response) =>
res.status(200).json({
  message: "Plant Has Been Deleted",
})
)
.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;