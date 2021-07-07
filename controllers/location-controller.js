const router = require('express').Router();
const Location = require('../db').import('../models/location-model');

let validateSession = require('../middleware/validate-session');
var sequelize = require('../db');
// var Location = sequelize.import('../models/location-controller');


router.post('/', validateSession, (req, res) => {
  const createLocation = {
    street: req.body.location.street,
    city: req.body.location.city,
    state: req.body.location.state,
    zipcode: req.body.location.zipcode
  } 
  Location.create(createLocation)
  .then(location => res.status(200).json(location))
  .catch(err => res.status(500).json({error: err}))
  
});

router.get("/", validateSession, (req, res) => {
  Location.findAll()
  .then(locations => res.status(200).json(locations))
  .catch(err => res.status(500).json({error: err}))
});

router.get("/:id", validateSession, (req, res) => {
  let id = req.params.id
  Location.findAll({
    where: {id: id}
})
  .then(locations => res.status(200).json(locations))
  .catch(err => res.status(500).json({error: err}))
});

router.put('/:id', validateSession, function(req, res) {
  const updateLocations = {
    street: req.body.log.street,
    city: req.body.log.city,
    state: req.body.log.state,
    zipcode: req.body.log.zipcode
  };
  const query = { where: {id: req.params.id}};

  Location.update(updateLocations, query)
  .then((locations) => res.status(200).json(locations))
  .catch((err) => res.status(500).json({error: err}));
})


router.delete('/:id', validateSession, function(req, res) {
const query = { where: { id: req.params.id, owner_id: req.user.id}};
Location.destroy(query)
.then((response) =>
res.status(200).json({
  message: "Location has been removed",
})
)
.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;