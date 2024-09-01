const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const Treatment = sequelize.define('treatment', {
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
  
  
  module.exports = Treatment;