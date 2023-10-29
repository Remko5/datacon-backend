const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database_connection.js');

class UserTracker extends Model {    
    getFullJsonData() {
      return {user_id: this.user_id, tracker_id: this.tracker_id}
    }
}

UserTracker.init({
  // Model attributes are defined here
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  
  tracker_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'UserTracker', // We need to choose the model name
  timestamps: false, // otherwise creates more data we potentially don't need
  tableName: 'user_tracker' // actual table name
});


module.exports = UserTracker