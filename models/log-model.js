module.exports = (sequelize, DataTypes) => {

    const Log = sequelize.define('log', {
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: sequelize.NOW
        },
        log: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING
        }
    })
    return Log;
};

