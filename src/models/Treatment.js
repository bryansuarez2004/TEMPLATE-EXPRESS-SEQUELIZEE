const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const Treatment = sequelize.define('treatment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
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