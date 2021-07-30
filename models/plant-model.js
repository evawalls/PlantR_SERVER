module.exports = (sequelize, DataTypes) => {

    const Plant = sequelize.define('plant', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 1
        },
        caretaker: {
            type: DataTypes.STRING
        },
          imageURL: {
            type: DataTypes.STRING
        }
    })
    return Plant;
};

