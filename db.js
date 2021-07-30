const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: "postgres", 
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to PlantR postgres database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/user-model');
Locations = sequelize.import('./models/location-model');
Garden = sequelize.import('./models/garden-model');
Plant = sequelize.import('./models/plant-model');
Biodata = sequelize.import('./models/biodata-model');
Log = sequelize.import('./models/log-model');

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