const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const Service = sequelize.define('service', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    initPrice:{
        type: DataTypes.FLOAT,
        allowNull: false,
        unique:false
    }
    
  },
  {
    timestamps:false
  }
);
  
  
  module.exports = Service;