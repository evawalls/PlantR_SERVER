require ("dotenv").config();
const router = require('express').Router();
const User = require('../db').import('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/trial', function(req, res){
  res.send('Trial success')
})


router.post('/register', function (req, res) {
    User.create({
      username: req.body.user.username,
      password: bcrypt.hashSync(req.body.user.password, 5),
      first_name: req.body.user.first_name,
      last_name: req.body.user.last_name,
      email: req.body.user.email,
      role: req.body.user.role,
    })
      .then(function createSuccess(user) {
        let token = jwt.sign({ id: user.id, first_name: user.first_name }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24, 
        });
        let first_name = req.body.user.first_name;  
  
        res.status(200).json({
          user: user,
          message: "User successfully created!",
          sessionToken: token,
          first_name: first_name,
        });
      })
      .catch((err) => res.status(500).json({ error: err }));
  });

  router.post("/login", function (req, res) {
    User.findOne({
      where: { 
        username: req.body.user.username,
      },
    })
      .then(function logInSuccess(user) {
        if (user) {
          bcrypt.compare(req.body.user.password, user.password, function (
            err,
            matches
          ) {
            if (matches) {
              let token = jwt.sign({ id: user.id, first_name: user.first_name }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              
              });
              let first_name = user.first_name;
  
              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
                first_name: first_name,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          });
        } else {
          res.status(500).json({ error: "User does not exist." });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  });
  module.exports = router;