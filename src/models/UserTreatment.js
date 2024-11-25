const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");


const UserTreatment = sequelize.define(
  "user_treatment",
  
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nameUser :{
        type: DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    idUser:{
        type:DataTypes.UUID,
      allowNull: false,
      unique:false
    },
    nameTreatment :{
        type: DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    idTreatment : {
        type: DataTypes.UUID,
        allowNull: false,
        unique:false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique:false
    },
    date: {
        type: DataTypes.DATEONLY, // Cambiar a DATEONLY para almacenar solo la fecha
        defaultValue: DataTypes.NOW
      }
    
  },
  {
    timestamps: false
   
  }
);

// Definir relaciones


module.exports = UserTreatment;