const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database_connection.js');

class User extends Model {    
    getFullJsonData() {
      return {id: this.id, voornaam: this.voornaam, achternaam: this.achternaam}
    }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  
  voornaam: {
    type: DataTypes.STRING(20)
  },
  achternaam: {
    type: DataTypes.STRING(20)
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  timestamps: false, // otherwise creates more data we potentially don't need
  tableName: 'user' // actual table name
});


module.exports = User