const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");


const UserService = sequelize.define(
  "user_service",
  
  {
    nameUser :{
        type: DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    idUser:{
        type: DataTypes.INTEGER,
      allowNull: false,
      unique:false
    },
    nameService :{
        type: DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    idService : {
        type: DataTypes.INTEGER,
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


module.exports = UserService;
