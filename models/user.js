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
      buds: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    })
  
    return User;
  };