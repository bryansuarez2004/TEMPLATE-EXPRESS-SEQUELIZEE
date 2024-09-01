require('./User')
 require('./Service')
require('./Treatment')
require('./UserService')
const UserTreatment = require('./UserTreatment')
const Session = require('./Session')


UserTreatment.hasMany(Session, {
    onDelete: 'CASCADE'
  });
Session.belongsTo(UserTreatment);

//se importan los modelos hecho para que posteriormente se importe en app.js al igual que las relaciones