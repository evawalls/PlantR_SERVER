module.exports = (sequelize, DataTypes) => {

    const Garden = sequelize.define('garden', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caretaker: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Garden;
};

