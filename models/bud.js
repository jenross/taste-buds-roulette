module.exports = function(sequelize, DataTypes) {
    console.log("here")
      const Bud = sequelize.define("Bud", {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      })
  
      Bud.associate = function(models) {
        Bud.belongsTo(models.User, {
          onDelete: "cascade"
        });
      }
    
      return Bud;
    };