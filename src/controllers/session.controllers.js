const catchError = require('../utils/catchError');
const Session = require('../models/Session');
const UserTreatment = require('../models/UserTreatment');


const getAll = catchError(async(req, res) => {
    const results = await Session.findAll({include:UserTreatment});
    return res.json(results);
});


const create = catchError(async(req,res) =>{
    const { userTreatmentId, sessions } = req.body;

  // Verificar que UserTreatment existe
  const userTreatment = await UserTreatment.findByPk(userTreatmentId);
  if (!userTreatment) {
    return res.status(404).json({ mensaje: 'registro de tratamiento no encontrado' });
  }

  // Crear sesiones en la base de datos
  const createdSessions = await Session.bulkCreate(
    sessions.map(session => ({
      date: session.date,
      hour: session.hour,
      complete: session.complete,
      userTreatmentId
    })),
    { validate: true }
  );

  // Enriquecer las sesiones con datos de UserTreatment
  const enrichedSessions = createdSessions.map(session => ({
    ...session.toJSON(),
    userName: userTreatment.nameUser,
    treatmentName: userTreatment.nameTreatment
  }));

  res.status(201).json(enrichedSessions);
})


const update = catchError(async(req, res) => {
      // Obtener el ID de la sesión del parámetro y los datos de la actualización del cuerpo de la solicitud
    const { sessionId } = req.params;
    const updateData = req.body; // Datos para actualizar

    // Buscar la sesión por su ID
    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ mensaje: 'Sesión no encontrada' });
    }

    // Actualizar la sesión con los datos del cuerpo de la solicitud
    await session.update(updateData);

  

    // Responder con la sesión actualizada
    res.status(200).json(session);
});

const remove = catchError(async(req,res) =>{
    const { sessionId } = req.params;
    const result = await Session.destroy({ where: {id:sessionId} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);

})

const getByUser = catchError(async(req,res) =>{

    const { idUser } = req.params;

    const sessions = await Session.findAll({
        include: {
          model: UserTreatment,
          where: { idUser } // Filtrar por el campo nameUser en UserService
        }
      });
  
      if (sessions.length === 0) {
        return res.status(404).json({ message: 'este usuario no tiene sesiones programadas' });
      }
  
      res.json(sessions);

})
  

module.exports = {
    getAll,
    create,
    update,
    remove,
    getByUser
}
    