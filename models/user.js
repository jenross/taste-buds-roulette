module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bud1: {
        type: DataTypes.STRING,
      },
      bud2: {
        type: DataTypes.STRING,
      },
      bud3: {
        type: DataTypes.STRING,
      },
      bud4: {
        type: DataTypes.STRING,
      },
      bud5: {
        type: DataTypes.STRING,
      },
    })
  
    return User;
  };