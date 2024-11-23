const catchError = require('../utils/catchError');
const User = require('../models/User');
const Treatment = require('../models/Treatment');
const UserTreatment = require('../models/UserTreatment');
const Session = require('../models/Session');



const getAll = catchError(async(req, res) => {
    const results = await UserTreatment.findAll({include:Session});
    return res.json(results);
});


const getOne = catchError(async(req,res) => {
  const { id } = req.params;
  const result = await UserTreatment.findByPk(id,{include:Session});
  if(!result) return res.sendStatus(404);
  return res.json(result);

})

const getByDate = catchError(async(req, res) =>{
    const { date } = req.params; // Recibir la fecha en el formato 'YYYY-MM-DD'
  console.log(date);
  
  const userTreatments = await UserTreatment.findAll({
    where: {
      date: date
    }
  });
   
  if(userTreatments.length === 0) return res.status(404).json({message:`No se encontraron registros de servicios para esta fecha: ${date}.`})

  return res.status(201).json(userTreatments);
})

const getByUser = catchError(async(req,res) =>{
    const { idUser } = req.params; 

    const userTreatments = await UserTreatment.findAll({
        where: {
          idUser: idUser
        },
        include:[{
          model:Session
        }]
      });
    
      if (userTreatments.length === 0) {
        // Si no se encuentran registros para el idUser especificado
        return res.status(404).json({ message: `No se encontraron registros para el usuario con ID ${idUser}.` });
      }

      return res.status(201).json(userTreatments);
})

const create = catchError(async(req,res) =>{
     const { userId, treatmentId, price } = req.body;

     const [user, treatment] = await Promise.all([
         User.findByPk(userId),
         Treatment.findByPk(treatmentId)
       ]);
 
       if (!user || !treatment) {
         return res.status(404).json({ mensaje: 'not found treatment or user' });
       }

       const nuevoRegistro = await UserTreatment.create({
         nameUser:user.fullName,
         idUser:user.id,
         nameTreatment:treatment.name,
         idTreatment:treatment.id,
         price: price || treatment.initPrice,
         
         // Usar el precio personalizado o el precio por defecto del servicio
       });

       const enrichedRegister = {...nuevoRegistro.toJSON(),sessions:[]}

       res.status(201).json(enrichedRegister);

})

const remove = catchError(async(req,res) =>{
    const { id } = req.params;
    const result = await UserTreatment.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);

})


module.exports = {
    getAll,
    create,
    getOne,
    getByDate,
    getByUser,
    remove
}