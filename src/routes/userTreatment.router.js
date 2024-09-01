const express = require('express');
const { getAll, create, getByDate, getByUser, remove } = require('../controllers/userTreatment.controllers');


const userTreatmentRouter = express.Router();

userTreatmentRouter.route('/')
.get(getAll)
.post(create)

userTreatmentRouter.route('/date/:date')
.get(getByDate)

userTreatmentRouter.route('/remove/:id')
 .delete(remove)

userTreatmentRouter.route('/:idUser')
.get(getByUser)
    

module.exports = userTreatmentRouter;