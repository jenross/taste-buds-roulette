module.exports = function(sequelize, DataTypes) {
    const Bud = sequelize.define("Bud", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 40]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
    });
    return Bud;
   };