const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    
    host:"localhost",
    dialect: "postgres", 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to PlantR postgres database');
    },
    function(err){
        console.log(err);
    }
);

const User = sequelize.import('./models/user-model');
const Locations = sequelize.import('./models/location-model');
const Garden = sequelize.import('./models/garden-model');
const Plant = sequelize.import('./models/plant-model');
const Biodata = sequelize.import('./models/biodata-model');
const Log = sequelize.import('./models/log-model');

User.hasMany(Locations);
User.hasMany(Garden);
User.hasMany(Plant);
User.hasMany(Biodata);
User.hasMany(Log);

Locations.belongsTo(User);
Locations.hasMany(Garden);

Garden.belongsTo(User);
Garden.belongsTo(Locations);
Garden.hasMany(Plant);
Garden.hasMany(Log);

Plant.belongsTo(User);
Plant.belongsTo(Garden);
Plant.hasOne(Biodata);
Plant.hasMany(Log);

Biodata.belongsTo(User);
Biodata.belongsTo(Plant);

Log.belongsTo(User);
Log.belongsTo(Garden);
Log.belongsTo(Plant);

   module.exports = sequelize;