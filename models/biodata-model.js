module.exports = (sequelize, DataTypes) => {

    const Biodata = sequelize.define('biodata', {
        water: {
            type: DataTypes.STRING,
            allowNull: false
        },
        soil: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sun: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        apb: {
            type: DataTypes.STRING,
        }
    })
    return Biodata;
};

