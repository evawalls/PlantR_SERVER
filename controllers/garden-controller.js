const router = require('express').Router();
const Garden = require('../db').import('../models/garden-model');
// const Image = require('../db').import('../models/gallery-model');

let validateSession = require('../middleware/validate-session');


router.post('/creategarden', validateSession, (req, res) => {
  Garden.create({
      name: req.body.garden.name,
      userId: req.user.id,
      location: req.body.garden.locationId,
      caretaker: req.body.garden.caretaker,
      imageURL: req.body.garden.imageURL
  }) 

  .then(garden => res.status(200).json({message: "Let's get growing!",}))

  .catch(err => res.status(500).json({error: err}))
  
});

router.get("/gallery", validateSession, (req, res) => { 
  const query = {where: {secret: false}}
  Garden.findAll(query)
  .then(gardens => res.status(200).json(gardens))
  .catch(err => res.status(500).json({error: err}))
});

router.get("/getgardens", validateSession, (req, res) => {
  let userId = req.user.id
  Garden.findAll({
    where: {userId: userId}
})
  .then(gardens => res.status(200).json(gardens))
  .catch(err => res.status(500).json({error: err}))
});

router.put('/updateGarden/:id', validateSession, function(req, res) {
  const updateGarden = {
    userId: req.user.id,
      name: req.body.garden.name,
      location: req.body.garden.locationId,
      caretaker: req.body.garden.caretaker,
      imageURL: req.body.garden.imageURL
  };
  const query = { where: {id: req.params.id}};

  Garden.update(updateGarden, query)
  .then((gardens) => res.status(200).json(gardens))
  .catch((err) => res.status(500).json({error: err}));
})


router.delete('/deletegarden/:id', validateSession, function(req, res) {
const query = { where: { id: req.params.id, UserId: req.user.id}};
Garden.destroy(query)
.then((response) =>
res.status(200).json({
  message: "Garden has been plowed under.",
})
)
.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;