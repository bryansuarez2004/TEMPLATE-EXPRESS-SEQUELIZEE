const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const Session = sequelize.define('session', {
    date: {
        type: DataTypes.DATEONLY,
      allowNull: false,
      unique:false
    },
    hour:{
        type: DataTypes.TIME, // Tipo de dato TIME para almacenar solo la hora
        allowNull: false,
        unique:false
    },
    complete:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique:false
    }
    
    //fk -> userTreatmentID
  },
  {
    timestamps:false
  }
);
  
  
  module.exports = Session;