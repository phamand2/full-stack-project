'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsToMany(models.Team,{through:'TeamPlayers'})
      Player.belongsTo(models.User)
    }
  };
  Player.init({
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    playerNotes: {
      type: DataTypes.TEXT
    },
    ownerNotes: {
      type: DataTypes.TEXT
    }
  },{ 
    sequelize,
    modelName: 'Player',
  });
  return Player;
};