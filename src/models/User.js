const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const User = sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    },
    birthday:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        unique:false
    }
    
  },
  {
    timestamps:false
  }
);
  
  
  module.exports = User;