const { Sequelize } = require('sequelize');
require('dotenv').config();


//haciendo la coneccion a la bd
const sequelize = new Sequelize(process.env.DATABASE_URL,{logging:false})

module.exports = sequelize;

