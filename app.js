    let express = require('express');
    let app = express();
    let sequelize = require('./db');

    let garden = require('./controllers/garden-controller');
    let user = require('./controllers/user-controller');
    let location = require('./controllers/location-controller');
    let plant = require('./controllers/plant-controller');
    let biodata = require('./controllers/biodata-controller');
    let log = require('./controllers/log-controller');

    require("dotenv").config;

    sequelize.sync();
    
    app.use(require('./middleware/headers'));

    app.use(express.json());

    app.use('/user', user);
    app.use('/garden', garden);
    app.use('/location', location);
    app.use('/plant', plant);
    app.use('/biodata', biodata);
    app.use('/log', log);

    app.listen(3000, function(){
        console.log('App is listening on port 3000');
    })