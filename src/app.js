const express = require('express')
const router = require('./routes/index.js')
const errorHandler = require('./utils/errorHandler.js')
 const sequelize = require('./utils/connection.js')
 require('./models/index.js')
 require('dotenv').config();
 const helmet = require('helmet');
const cors = require('cors');

//variable de puerto
const PORT = process.env.PORT || 8080;

//instanciando aplicacion
const app = express()


//middlewares para parsear a json las peticiones, helmet proteccion de cabeceras, y cors
app.use(express.json())
app.use(helmet({
     crossOriginResourcePolicy: false,
 }));
app.use(cors());


//middlewares de rutas
app.use(router)
app.get('/',(req,res,next)=>{
     res.send('Bienvenido a express')
})


//middleware de error
app.use(errorHandler)


//funcion principal que sincroniza los modelos y levanta el servidor con listen
const main = async () => {
     try {
        sequelize.sync();
        console.log("DB connected");
        app.listen(PORT);
        console.log(`👉 Server running on port ${PORT}`);
        console.log(`👉 Link http://localhost:${PORT}`);
     } catch (error) {
         console.log(error)
     }
 }
 
 main();