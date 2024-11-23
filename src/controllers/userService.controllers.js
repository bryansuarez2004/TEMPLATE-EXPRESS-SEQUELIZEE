const catchError = require('../utils/catchError');
const User = require('../models/User');
const Service = require('../models/Service');
const UserService = require('../models/UserService')


const getAll = catchError(async(req, res) => {
    const results = await UserService.findAll();
    return res.json(results);
});

const getByDate = catchError(async(req, res) =>{
    const { date } = req.params; // Recibir la fecha en el formato 'YYYY-MM-DD'
  console.log(date);
  
  const userServices = await UserService.findAll({
    where: {
      date: date
    }
  });
   
  if(userServices.length === 0) return res.status(404).json({message:`No se encontraron registros de servicios para esta fecha: ${date}.`})

  return res.status(201).json(userServices);
})

const getByUser = catchError(async(req,res) =>{
    const { idUser } = req.params; 

    const userServices = await UserService.findAll({
        where: {
          idUser: idUser
        }
      });
    
      if (userServices.length === 0) {
        // Si no se encuentran registros para el idUser especificado
        return res.status(201).json([]);
      }

      return res.status(201).json(userServices);
})

const create = catchError(async(req,res) =>{
     const { userId, serviceId, price } = req.body;

     const [user, service] = await Promise.all([
         User.findByPk(userId),
         Service.findByPk(serviceId)
       ]);
 
       if (!user || !service) {
         return res.status(404).json({ mensaje: 'not found service or user' });
       }

       const nuevoRegistro = await UserService.create({
         nameUser:user.fullName,
         idUser:user.id,
         nameService:service.name,
         idService:service.id,
         price: price || service.initPrice // Usar el precio personalizado o el precio por defecto del servicio
       });

       res.status(201).json(nuevoRegistro);

})

const remove = catchError(async(req,res) =>{
  const { idUser } = req.params;
  const result = await UserService.destroy({ where: {id:idUser} });
  if(!result) return res.sendStatus(404);
  return res.sendStatus(204);

})

module.exports = {
    getAll,
    create,
    getByDate,
    getByUser,
    remove
}