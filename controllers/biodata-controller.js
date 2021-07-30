const router = require('express').Router();
// const Biodata = require('../db').import('../models/biodata-model');

let validateSession = require('../middleware/validate-session');
var sequelize = require('../db');
var Biodata = sequelize.import('../models/biodata-model');


router.post('/', validateSession, (req, res) => {
  const createLog = {
    water: req.body.biodata.water,
    soil: req.body.biodata.soil,
    sun: req.body.biodata.sun,
    zone: req.body.biodata.zone,
    apb: req.body.biodata.apb,
 
  } 
  Biodata.create(createLog)
  .then(biodata => res.status(200).json(biodata))
  .catch(err => res.status(500).json({error: err}))
  
});

router.get("/", validateSession, (req, res) => {
  Biodata.findAll()
  .then(logs => res.status(200).json(logs))
  .catch(err => res.status(500).json({error: err}))
});

router.get("/:id", validateSession, (req, res) => {
  let id = req.params.id
  Biodata.findAll({
    where: {id: id}
})
  .then(logs => res.status(200).json(logs))
  .catch(err => res.status(500).json({error: err}))
});

router.put('/:id', validateSession, function(req, res) {
  const updateLogs = {
    water: req.body.biodata.water,
    soil: req.body.biodata.soil,
    sun: req.body.biodata.sun,
    zone: req.body.biodata.zone,
    apb: req.body.biodata.apb,

  };
  const query = { where: {id: req.params.id}};

  Biodata.update(updateLogs, query)
  .then((logs) => res.status(200).json(logs))
  .catch((err) => res.status(500).json({error: err}));
})


router.delete('/:id', validateSession, function(req, res) {
const query = { where: { id: req.params.id, owner_id: req.user.id}};
Biodata.destroy(query)
.then((response) =>
res.status(200).json({
  message: "Biodata Has Been Deleted",
})
)
.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;