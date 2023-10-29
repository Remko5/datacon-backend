const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database_connection.js');

class Data extends Model {
    getFullData() {
        return ["lat: ", this.lat, "long: ", this.long].join(' ');
      }

    getJsonData() {
        return {lat: this.lat, long: this.long}
    }

    getFullJsonData() {
      return {id: this.id, tracker_id: this.tracker_id, lat: this.lat, long: this.long, createdAt: this.createdAt}
    }
}

Data.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  tracker_id: {
    type: DataTypes.INTEGER
  },
  lat: {
    type: DataTypes.FLOAT
    // allowNull defaults to true
  },
  long: {
    type: DataTypes.FLOAT
    //allowNull: false
  },
  createdAt: {
    type: DataTypes.STRING(19)
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Data', // We need to choose the model name
  timestamps: false
});

// the defined model is the class itself
//console.log(Data === sequelize.models.Data); // true

module.exports = Data