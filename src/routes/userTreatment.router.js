const express = require('express');
const { getAll, create, getByDate, getByUser, remove, getOne } = require('../controllers/userTreatment.controllers');


const userTreatmentRouter = express.Router();

userTreatmentRouter.route('/')
.get(getAll)
.post(create)



userTreatmentRouter.route('/date/:date')
.get(getByDate)

userTreatmentRouter.route('/remove/:id')
 .delete(remove)

userTreatmentRouter.route('/one/:id')
  .get(getOne)

userTreatmentRouter.route('/:idUser')
.get(getByUser)
    

module.exports = userTreatmentRouter;